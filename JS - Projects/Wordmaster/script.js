const wordUrl = "https://words.dev-apis.com/word-of-the-day";
const checkUrl = "https://words.dev-apis.com/validate-word";

const gameState = {
    word: '',
    newWords: '',
    currentGroup: 0,
    inputs: document.querySelectorAll('.inputse'),
    results: ''
};

// Sprawdza, czy podany znak jest literą alfabetu (A-Z lub a-z).
function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

// Dodaje nasłuchiwanie zdarzeń do inputów, ograniczając wprowadzanie do liter
function checkLetter() {
    gameState.inputs.forEach((e) => {
        e.addEventListener('keypress', function (event) {
            if (!isLetter(event.key)) {
                event.preventDefault();
            }
        });
    });
}

//Dodaje automatyczne przenoszenie fokusu do następnego inputu po wypełnieniu bieżącego
function autoFocus(a) {  
    gameState.inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === this.maxLength){ 
                const nextIndex = index + 1;
                if (nextIndex < (gameState.currentGroup + 1) * 5 && nextIndex < gameState.inputs.length) {
                    gameState.inputs[nextIndex].focus();
                }
            }
        });
    });
}

//Przechodzi do następnej linii inputów i ustawia fokus na pierwszym elemencie.
function resetLine() {
    const nextGroupStart = (gameState.currentGroup + 1) * 5;            
    if (nextGroupStart < gameState.inputs.length) {
        gameState.inputs[nextGroupStart].focus();
        autoFocus(); 
    }
    gameState.currentGroup++;
}

//Obsługa klawisza Enter
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        checkInputs(gameState.inputs, gameState.currentGroup);
    }
});

//Obsługa klawisza Delete i Backspace
document.addEventListener('keydown', function (e) {
    if (e.key === 'Delete' || e.key === 'Backspace'){
        deleteLetter();
    }
});

//  Sprawdza wprowadzone słowo i wykonuje odpowiednie akcje.
async function checkInputs() {
    showLoader()
    const INPUTS_PER_GROUP = 5;
    let startIndex = gameState.currentGroup * INPUTS_PER_GROUP;

    gameState.word = Array.from(gameState.inputs)
        .slice(startIndex, startIndex + INPUTS_PER_GROUP)
        .map(input => input.value)
        .join('');

    if (gameState.word.length !== INPUTS_PER_GROUP) {
        alert('Slowo musi miec 5 liter');
        return;
    }
    try {
        const isValidWord = await checkWord(gameState.word);
        if (isValidWord) {
            findCorrectLetter();
            resetLine();
            console.log('poprawne slowo', gameState.word);
        } else {
            anyWord();
            alert('To nie slowo');
        }
    } catch (error) {
        console.error(error);
    } finally {
        hideLoader()
    }
}

//Usuwa ostatnią wprowadzoną literę w bieżącej grupie inputów.
function deleteLetter() {
    const INPUT_PER_GROUP = 5;
    let currentInputIndex = gameState.currentGroup * INPUT_PER_GROUP;
    let startIndex = currentInputIndex;

    for (let i = startIndex + INPUT_PER_GROUP - 1; i >= currentInputIndex; i--) {
        if (gameState.inputs[i].value !== '') {
            currentInputIndex = i;
            break;
        }
    }

    if (gameState.inputs[currentInputIndex]) {
        gameState.inputs[currentInputIndex].value = '';
        gameState.inputs[currentInputIndex].focus();
    }

    gameState.word = Array.from(gameState.inputs)
        .slice(startIndex, startIndex + INPUT_PER_GROUP)
        .map(input => input.value)
        .join('');
}

//Pobiera hasło dnia z api
async function newWord() {
    showLoader();
    const promise = await fetch(wordUrl);
    const res = await promise.json();
    gameState.newWords = res.word;
    console.log(gameState.newWords);
    hideLoader();
    return gameState.newWords;
}

//Sprawdza czy podane słowo przez uzytkownika jest słowem
async function checkWord(word) {
    const promise = await fetch(checkUrl, {
        method: "POST",
        body: JSON.stringify({
            "word": word
        })
    });
    const res = await promise.json();
    const answer = res.validWord;
    return answer;
}

function anyWord() {
    const INPUT_PER_GROUP = 5;
    let startIndex = gameState.currentGroup * INPUT_PER_GROUP;
    let endIndex = startIndex + INPUT_PER_GROUP;

    for (let i = startIndex; i < endIndex; i++){
        const input = gameState.inputs[i];
        input.classList.add('inputs-transition');
        input.style.borderColor = 'red';

        setTimeout(() => {
            input.style.borderColor = '';
        }, 2000);
    }
}

//Ustawia kolor na szary
function greyBox() {
    const INPUT_PER_GROUP = 5;
    let startIndex = gameState.currentGroup * INPUT_PER_GROUP;
    let endIndex = startIndex + INPUT_PER_GROUP;

    for (let i = startIndex; i < endIndex; i++){
        gameState.inputs[i].style.backgroundColor = 'grey';
    }
}

//Ustawia kolor zielony inputow dla prawidlowego hasla
function greenBoxes() {
    const INPUT_PER_GROUP = 5;
    let startIndex = gameState.currentGroup * INPUT_PER_GROUP;
    let endIndex = startIndex + INPUT_PER_GROUP;

    for (let i = startIndex; i < endIndex; i++){
        gameState.inputs[i].style.backgroundColor = 'green';
    }
}

//Koloruje inputy przy odgadnietych literach
function colorizeInputs(correctIndices, commonChars, userWord){
    const INPUT_PER_GROUP = 5;
    let startIndex = gameState.currentGroup * INPUT_PER_GROUP;
    let endIndex = startIndex + INPUT_PER_GROUP;

    // Najpierw oznaczamy zielone (poprawne pozycje)
    correctIndices.forEach(index => {
        let greenIndex = startIndex + index;
        gameState.inputs[greenIndex].style.backgroundColor = 'green';
    });

    // Następnie oznaczamy żółte (poprawne litery na złych pozycjach)
    userWord.forEach((char, index) => {
        let currentIndex = startIndex + index;
        if (commonChars.includes(char) && gameState.inputs[currentIndex].style.backgroundColor !== 'green') {
            gameState.inputs[currentIndex].style.backgroundColor = 'yellow';
        }
    });

    // Na końcu oznaczamy pozostałe jako szare
    for (let i = startIndex; i < endIndex; i++) {
        if (gameState.inputs[i].style.backgroundColor !== 'green' && gameState.inputs[i].style.backgroundColor !== 'yellow'){
            gameState.inputs[i].style.backgroundColor = 'grey';
        }
    }
}

//Znajduje prawidlowe litery 
async function findCorrectLetter() {
    const e = Array.from(gameState.word);
    const a = Array.from(gameState.newWords);
    const letter = e.filter(letter => a.includes(letter));

    if (letter.length == 5) {
        greenBoxes();
        alert('winwin');
        colofrulHeader();
        return;
    }

    const correctIndices = [];
    for (let i = 0; i < e.length; i++) {
        if (e[i] === a[i]) {
            correctIndices.push(i);
        }
    }

    colorizeInputs(correctIndices, letter, e);

    if (letter.length == 0) {
        alert('you lose!');
        greyBox();
    }   

}

function colofrulHeader () {
    document.querySelector('h1').classList.add('rainbow');
}

function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}


newWord();
checkLetter();
autoFocus();

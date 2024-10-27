let buffer = '0';
let runningTotal = 0;
let previousOperator;
const summary = document.querySelector('.summary');

function buttonClick(value) {
    if (isNaN(parseInt(value))){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender()
}

function handleNumber(number) {
    if (buffer === '0'){
    buffer = number;
    } else{
        buffer += number;
    }
}

function handleMath(value){
    if (buffer === '0') {
        //do nothing
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }   else {
        flushOperation(intBuffer);
    }

    previousOperator = value;
    buffer = '0';
}

function flushOperation(intBuffer) {
    switch (previousOperator){
       case '+' : runningTotal += intBuffer; break;
       case '-' : runningTotal -= intBuffer; break;
       case 'x' : runningTotal *= intBuffer; break;
       case '÷':
           if(intBuffer === 0){
               numberArea.textContent = 'Error';
               return;
           }
           runningTotal /= intBuffer;
           break;
}
}

function handleSymbol(symbol){
    switch (symbol){
        case 'C':
            buffer = '0';
            break;
        case '=':
            if(!previousOperator) {
                return;
            }
            flushOperation(parseInt(buffer))
            previousOperator = null;
            buffer = '' + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
        case '+':
        case '-':
        case '÷':
        case 'x':
            handleMath(symbol);
            break;
    }
}

function init() {
    document
        .querySelector('.buttons')
        .addEventListener('click', function(e) {
            buttonClick(e.target.innerText)
        })
}

function rerender() {
    summary.innerText = buffer;
}

init();
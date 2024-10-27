const buttons = document.querySelectorAll('.button');
const numberArea = document.querySelector('.summary');
const clearButton = document.querySelector('.clear');
const additionButton = document.querySelector('.addition');
const equalButton = document.querySelector('.equal');
const operationsButton =document.querySelectorAll('.operations')
const deleteButton = document.querySelector('.delete')

let firstNum = 0;
let sign;

buttons.forEach(button => {
    button.addEventListener("click", function(e) {
        if (numberArea.textContent == 0){
            numberArea.textContent = '';
        }
        numberArea.textContent += e.target.innerText;
    })
})

operationsButton.forEach(button => {
    button.addEventListener('click', function(e) {
        if (numberArea.textContent !== '0') {
            firstNum = parseInt(numberArea.textContent);
            numberArea.textContent = '0';
            sign = e.target.innerText;
        }
    })
})

clearButton.addEventListener("click", function() {
    numberArea.textContent = 0;
    firstNum = 0;
    sign = '';
})

deleteButton.addEventListener('click', function() {
    if (numberArea.textContent.length > 1) {
        numberArea.textContent = numberArea.textContent.slice(0, -1);
    } else {
        numberArea.textContent = '0';
    }
})

equalButton.addEventListener('click', function(){
    // if(sign === '+'){
    //     let equal = 0;
    //     equal = firstNum + parseInt(numberArea.textContent);
    //     numberArea.textContent = equal;
    // }
    // if(sign === '-'){
    //     let equal = 0;
    //     equal = firstNum - parseInt(numberArea.textContent);
    //     numberArea.textContent = equal;
    // }
    // if(sign === '÷'){
    //     let equal = 0;
    //     equal = firstNum / parseInt(numberArea.textContent);
    //     numberArea.textContent = equal;
    // }
    // if(sign === 'x'){
    //     let equal = 0;
    //     equal = firstNum * parseInt(numberArea.textContent);
    //     numberArea.textContent = equal;
    // }
    
    if(sign){
        const secondNum = parseInt(numberArea.textContent);
        let result;
        switch (sign){
            case '+' : result = firstNum + secondNum; break;
            case '-' : result = firstNum - secondNum; break;
            case 'x' : result = firstNum * secondNum; break;
            case '÷':
                if(secondNum === 0){
                    numberArea.textContent = 'Error';
                    return;
                }
                result = firstNum / secondNum;
                break;
        }
        numberArea.textContent = result;
        sign = '';
        firstNum = 0;
    }

   
})
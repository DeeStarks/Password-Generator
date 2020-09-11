const result = document.getElementById('result');
const length = document.getElementById('length');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generate = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFuncs = {
    lower: randomLower,
    upper: randomUpper,
    number: randomNumber,
    symbol: randomSymbol
}

//Coping password to clipboard
clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = result.innerHTML;

    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    document.getElementById('copied').innerHTML = "Password copied to clipboard"

})

generate.addEventListener('click', () => {
    // + symbol is a shortcut to parseInt
    const lengthVal = +length.value;
    const hasLower = lowercase.checked;
    const hasUpper = uppercase.checked;
    const hasSymbol = symbols.checked;
    const hasNumber = numbers.checked;

    result.innerHTML = generatePassword(lengthVal, hasLower, hasUpper, hasNumber, hasSymbol)
    document.getElementById('copied').innerHTML = ""
})

function generatePassword(length, lower, upper, number, symbol){
    let generatedPassword = '';

    // counting the number of checked values
    const typesCount = lower + upper + number + symbol;

    // Array for checked values
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter (
        // to filter out arrays that are false
        item => Object.values(item)[0]
    )
    
    if(typesCount === 0){
        return '';
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFuncs[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// To get browser character sets - http://net-comber.com/charset.html

function randomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function randomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function randomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function randomSymbol(){
    const symbols = "!@#$%^&()_+=}{[]|':;?></'"
    return symbols[Math.floor(Math.random() * symbols.length)]
}

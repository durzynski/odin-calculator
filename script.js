function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {

    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(a, b, operator) {

     a = Number(a)
     b = Number(b)

    switch (operator) {
        case "+":
            return add(a,b)
        case "-":
            return substract(a,b)
        case "*":
            return multiply(a,b)
        case "/":
            if (a == 0 || b == 0) return NaN
            return a / b
        default:
            return null
    }
}

let lastNumber = ""
let currentNumber = ""
let operator = ""

let resultText = document.querySelector(".result-text")
let operandButtons = document.querySelectorAll(".operand")
let operatorButtons = document.querySelectorAll(".operator")
let dotButton = document.querySelector(".dot")
let signButton = document.querySelector(".plus-minus")
let percentButton = document.querySelector(".percent")
let equalsButton = document.querySelector(".equals")
let clearButton = document.querySelector(".clear")

operandButtons.forEach(button => {
    button.addEventListener("click", (e) => {

        operatorButtons.forEach(button => {
            if (button !== e.target) {
                button.style.opacity = "1"
            }
        });

        if (currentNumber[0] == "" || currentNumber[0] == "0" && currentNumber.length == 1) {
            currentNumber = e.target.value
        } else {
            currentNumber += e.target.value
        }

        updateResult(currentNumber)
    })
});

operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.target.style.opacity = "0.5"
        
        operatorButtons.forEach(button => {
            if (button !== e.target) {
                button.style.opacity = "1"
            }
        });

        if (lastNumber != "" && operator != "") {
            console.log(operate(lastNumber, currentNumber, operator))
            lastNumber = operate(lastNumber, currentNumber, operator)
            updateResult(parseFloat(lastNumber.toFixed(4)))
            currentNumber = ""
        } else {
            lastNumber = currentNumber
            currentNumber = ""
        }

        operator = e.target.value
    })
})

equalsButton.addEventListener("click", () => {
    
    if (operator != "") {
        lastNumber = operate(lastNumber, currentNumber, operator)
        currentNumber = lastNumber
        updateResult(parseFloat(lastNumber.toFixed(4)))
        operator = ""
    }

    operatorButtons.forEach(button => {
        button.style.opacity = "1"
    });
})

dotButton.addEventListener("click", () => {
    if (!currentNumber.toString().includes(".") && currentNumber != "") {
        currentNumber += "."
        updateResult(currentNumber)
    }
})

signButton.addEventListener("click", () => {
    currentNumber *= -1
    updateResult(parseFloat(currentNumber.toFixed(4)))
})

percentButton.addEventListener("click", () => {
    currentNumber /= 100
    updateResult(parseFloat(currentNumber.toFixed(4)))
})


clearButton.addEventListener("click", () => {
    
    operator = ""
    lastNumber = ""
    currentNumber = ""

    operatorButtons.forEach(button => {
        button.style.opacity = "1"
    });

    updateResult("0")
})

function updateResult(result) {

    resultText.textContent = result

    let container = document.querySelector(".result-container")

    let fontSize = 48
    resultText.style.fontSize = fontSize + "px"


    while (resultText.scrollWidth > container.clientWidth && fontSize > 12) {
        fontSize--
        resultText.style.fontSize = fontSize + "px"
    }
}



const display = document.getElementById("display");

let firstNumber = null;
let currentOperator = null;
let resetDisplay = false;

function appendNumber(number) {
    if (display.value === "Error") {
        display.value = "0";
    }

    if (resetDisplay) {
        display.value = number === "." ? "0." : number;
        resetDisplay = false;
        return;
    }

    if (number === ".") {
        if (!display.value.includes(".")) {
            display.value += ".";
        }
        return;
    }

    if (display.value === "0") {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    if (display.value === "Error") return;

    firstNumber = parseFloat(display.value);
    currentOperator = operator;
    resetDisplay = true;
}

function calculate() {
    if (firstNumber === null || currentOperator === null) {
        return;
    }

    const secondNumber = parseFloat(display.value);
    let result;

    switch (currentOperator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            result = secondNumber !== 0
                ? firstNumber / secondNumber
                : NaN;
            break;
    }

    if (!Number.isFinite(result)) {
        display.value = "Error";
    } else {
        display.value = String(
            Number(result.toPrecision(12))
        );
    }

    firstNumber = null;
    currentOperator = null;
    resetDisplay = true;
}

function clearDisplay() {
    display.value = "0";
    firstNumber = null;
    currentOperator = null;
    resetDisplay = false;
}

function deleteNumber() {
    if (display.value === "Error" || resetDisplay) {
        display.value = "0";
        resetDisplay = false;
        return;
    }

    display.value = display.value.length > 1
        ? display.value.slice(0, -1)
        : "0";
}

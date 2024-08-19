const buttons = document.querySelectorAll('button');
const result = document.querySelector('#result');

let concatText = "";
let calculated = false; 
let lastOperator = false; 
let dot = false; 
let needsNumber = false;
let operatorAfterCal = false;

function buttonPressed(event) {
    const text = event.target.textContent;

    if (calculated && text === ".") {
        return;
    }

    if (text === "=") {
        try {
            concatText = eval(concatText).toString();
        } catch (e) {
            concatText = "Error";
        }
        calculated = true;
        lastOperator = false;
        dot = false;
        needsNumber = false;
        operatorAfterCal = false;
    } else if (text === "AC") {
        concatText = "";
        calculated = false;
        lastOperator = false; 
        dot = false;
        needsNumber = false;
        operatorAfterCal = false;
    } else {
        if (calculated && text === "00") {
            return;
        } else if (calculated && !isNaN(text)) {
            concatText = text;
            result.textContent = concatText; 
            calculated = false;
            lastOperator = false;
            dot = false;
            needsNumber = false;
            operatorAfterCal = false;
            return; 
        } else if (calculated && isNaN(text)) {
            concatText += text;
            lastOperator = true;
            needsNumber = true; 
            calculated = false;
            operatorAfterCal = true;
        }
          if (concatText === "" && (text === "+" || text === "*" || text === "/")) {
            return;
        }

        if (text === ".") {
            if (dot) {
                return; 
            }
            dot = true; 
        }

        if (isNaN(text) && text !== ".") {
            if (lastOperator) {
                return;  
            } else {
                lastOperator = true; 
            }
        } else {
            lastOperator = false; 
        }

        if (!calculated) { 
            if (concatText === "0" && text !== "." && !needsNumber) {
                if (text === "00") {
                    return;
                } else if (text === "0"){
                    return;
                } else if (text === ".") {
                    concatText = "0" + text;
                } else {
                    concatText = text;
                }
            } else if (text === "00") {
                if (concatText === "0") {
                    return;
                } else if (concatText === "" || concatText === "0" || operatorAfterCal) {
                    return;
                } else if (concatText.slice(-1) === "0") {
                    concatText = concatText.slice(0, -1) + text;
                } else {
                    concatText += text;
                }
            } else if (operatorAfterCal && text === "0") {
                concatText += text;
            } else if (operatorAfterCal && !isNaN(text)) {
                concatText += text;
                operatorAfterCal = false;
            } else {
                concatText += text;
            }
            
        }
    }
    result.textContent = concatText;
}

buttons.forEach(button => button.addEventListener('click', buttonPressed));

let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let resetScreen = false;

const display = document.getElementById('display');
const operationDisplay = document.getElementById('operation');

// Función para agregar contenido al display
function appendToDisplay(value) {
    if (resetScreen) {
        display.value = '';
        resetScreen = false;
    }
    
    // Evitar múltiples ceros al inicio
    if (display.value === '0' && value === '0') return;
    
    // Reemplazar cero inicial si se ingresa otro número
    if (display.value === '0' && value !== '.') {
        display.value = '';
    }
    
    display.value += value;
}

// Función para agregar punto decimal
function appendDecimal() {
    if (resetScreen) {
        display.value = '0.';
        resetScreen = false;
        return;
    }
    
    if (display.value.includes('.')) return;
    
    if (display.value === '') {
        display.value = '0.';
    } else {
        display.value += '.';
    }
}

// Función para establecer operación
function setOperation(operator) {
    if (display.value === '' && firstOperand === null) return;
    
    // Si hay operación pendiente, calcular primero
    if (currentOperation !== null && !resetScreen) {
        calculate();
    }
    
    firstOperand = parseFloat(display.value);
    currentOperation = operator;
    resetScreen = true;
    
    // Mostrar operación actual
    operationDisplay.textContent = `${firstOperand} ${getOperationSymbol(currentOperation)}`;
}

// Función para calcular resultado
function calculate() {
    if (currentOperation === null || resetScreen) return;
    
    if (display.value === '') {
        display.value = '0';
    }
    
    secondOperand = parseFloat(display.value);
    
    // Validar división por cero
    if (currentOperation === '/' && secondOperand === 0) {
        alert("Error: División por cero");
        clearAll();
        return;
    }
    
    let result;
    switch (currentOperation) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    
    // Mostrar resultado
    display.value = roundResult(result);
    operationDisplay.textContent = '';
    
    // Preparar para siguiente operación
    firstOperand = parseFloat(display.value);
    currentOperation = null;
    resetScreen = true;
}

// Función para limpiar todo
function clearAll() {
    display.value = '';
    operationDisplay.textContent = '';
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    resetScreen = false;
}

// Función auxiliar para redondear resultados
function roundResult(num) {
    return Math.round(num * 100000) / 100000; // Redondear a 5 decimales
}

// Función auxiliar para obtener símbolo de operación
function getOperationSymbol(op) {
    const symbols = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷'
    };
    return symbols[op] || '';
}

// Evento para teclado físico
document.addEventListener('keydown', (e) => {
    if (/[0-9]/.test(e.key)) {
        appendToDisplay(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        setOperation(e.key);
    } else if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'Escape') {
        clearAll();
    } else if (e.key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    }
});
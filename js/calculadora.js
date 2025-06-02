// Variables para almacenar los valores y operaciones
let firstNumber = null;
let secondNumber = null;
let currentOperation = null;
let shouldResetDisplay = false;

// Elementos del DOM
const display = document.getElementById('display');
const operationDisplay = document.getElementById('operation-display');

// Función para agregar un número al display
function appendNumber(number) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    // Evitar múltiples ceros al inicio
    if (display.value === '0' && number === 0) {
        return;
    }
    
    // Reemplazar el cero inicial si se presiona otro número
    if (display.value === '0' && number !== 0) {
        display.value = '';
    }
    
    display.value += number;
}

// Función para agregar un punto decimal
function appendDecimal() {
    if (shouldResetDisplay) {
        display.value = '0.';
        shouldResetDisplay = false;
        return;
    }
    
    if (display.value.includes('.')) {
        return; // No permitir múltiples puntos decimales
    }
    
    if (display.value === '') {
        display.value = '0.'; // Si está vacío, agregar 0. primero
    } else {
        display.value += '.';
    }
}

// Función para establecer la operación
function setOperation(operation) {
    if (display.value === '' && firstNumber === null) {
        return; // No hacer nada si no hay número ingresado
    }
    
    // Si ya hay una operación pendiente, calcular primero
    if (currentOperation !== null && !shouldResetDisplay) {
        calculate();
    }
    
    firstNumber = parseFloat(display.value);
    currentOperation = operation;
    shouldResetDisplay = true;
    
    // Mostrar la operación seleccionada
    operationDisplay.textContent = `${firstNumber} ${getOperationSymbol(currentOperation)}`;
}

// Función para realizar el cálculo
function calculate() {
    if (currentOperation === null || shouldResetDisplay) {
        return; // No hay operación pendiente o no se ha ingresado el segundo número
    }
    
    if (display.value === '') {
        display.value = '0'; // Asumir 0 si no se ingresa segundo número
    }
    
    secondNumber = parseFloat(display.value);
    
    // Validar división por cero
    if (currentOperation === '/' && secondNumber === 0) {
        alert("No se puede dividir por cero");
        clearDisplay();
        return;
    }
    
    let result;
    switch (currentOperation) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            result = firstNumber / secondNumber;
            break;
        default:
            return;
    }
    
    // Mostrar el resultado
    display.value = result.toString();
    operationDisplay.textContent = '';
    
    // Resetear variables para próximas operaciones
    firstNumber = result;
    currentOperation = null;
    shouldResetDisplay = true;
}

// Función para limpiar la calculadora
function clearDisplay() {
    display.value = '';
    operationDisplay.textContent = '';
    firstNumber = null;
    secondNumber = null;
    currentOperation = null;
    shouldResetDisplay = false;
}

// Función auxiliar para obtener el símbolo de la operación
function getOperationSymbol(operation) {
    switch (operation) {
        case '+': return '+';
        case '-': return '-';
        case '*': return '×';
        case '/': return '÷';
        default: return '';
    }
}
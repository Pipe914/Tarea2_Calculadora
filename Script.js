const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let previousKeyType = '';
let firstNumber = '';
let secondNumber = '';
let operator = '';

function calcular(n1, operador, n2) {
  let resultado = '';

  if (operador === '+') {
    resultado = parseFloat(n1) + parseFloat(n2);
  } else if (operador === '-') {
    resultado = parseFloat(n1) - parseFloat(n2);
  } else if (operador === '*') {
    resultado = parseFloat(n1) * parseFloat(n2);
  } else if (operador === '/') {
    resultado = parseFloat(n1) / parseFloat(n2);
  }
  console.log(n1, operador, n2, resultado);
  return resultado;
}

function addNumber(number) {
  if (display.value === '0' || previousKeyType === 'operator' || previousKeyType === 'clear' || previousKeyType === 'calculate') {
    display.value= number;
  } else {
    display.value += number;
  }
  previousKeyType = 'number';
}

function addDecimal() {
  if (!display.value.includes('.')) {
    display.textContent += '.';
    previousKeyType = 'decimal';
  }
}

function addOperator(operador) {
  if (previousKeyType === 'operator') {
    operator = operador;
  }

  if (previousKeyType === 'number' || previousKeyType === 'calculate') {
    firstNumber = display.value;
    operator = operador;
    display.value = '';
  }
  previousKeyType = 'operator';
}

function calculate() {
  if (previousKeyType === 'number') {
    secondNumber = display.value;
    firstNumber = calcular(firstNumber, operator, secondNumber);
    display.value = firstNumber;
    previousKeyType = 'calculate';
  }
}

function clear() {
  if (previousKeyType === 'clear') {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    previousKeyType = '';
  }else{
    display.value = '0';
    previousKeyType = 'clear';
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const key = e.target.value;

    if (key === 'c') {
      clear();
      console.log('clear');
    } else if (key === '=') {
      calculate();
      console.log('calculate');
    } else if (key === '.') {
      addDecimal();
      console.log('decimal');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      addOperator(key);
      console.log('operator' + key);
    } else if (key !== 'c' && key !== '=') {
      addNumber(key);
      console.log('number' + key);
    }
  });
});




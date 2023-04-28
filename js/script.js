const buttons = document.querySelectorAll('.tip-button');
const selectedButton = document.getElementsByClassName('.selected');
const reset = document.querySelector('.card-right-button');
const inputs = document.querySelectorAll('.input');
const custom = document.querySelector('.tip-button-custom');
const isZero = document.querySelector('.if-zero-number');
const bill = document.querySelector('#bill .input');
const numPeople = document.querySelector('#people-box .input');
const selectTip = document.querySelector('#tip-list .tip-button-custom');
const totalNum = document.querySelector('.total-num');
const tipNum = document.querySelector('.tip-num');

/* Event Listeners */


custom.addEventListener('click', customTipCalculation);

buttons.forEach((button) => {
  button.addEventListener('click', calculateTip);
});

reset.addEventListener('click', resetAllValues);

reset.addEventListener('mouseenter', ()=>{
  reset.style.backgroundColor = 'var(--lightGrayishCyan )';
});

reset.addEventListener('mouseleave', ()=>{
  reset.style.backgroundColor = '';
});

/* On Input */

bill.oninput = function() {
  turnResetButtonOn();

  if (custom.value !== '' || selectedButton.length !== 0 && (numPeople.value !== '' || numPeople.value > 0)){
    calculate();
  }
}

custom.oninput = function() {
  turnResetButtonOn();
  if (bill.value !== '' && (numPeople.value !== '' || numPeople.value > 0)){
    
    calculate();
  }
}

numPeople.oninput = function() {
  turnResetButtonOn();
  if (numPeople.value === '' || numPeople.value <= 0)
  {
    isZero.innerText = "Can't be zero";
    isZero.style.color = "red";
    totalNum.innerText = "----";
    tipNum.innerText = "----";
    
  }

  else {  
    isZero.innerText = '';
  }

  if (bill.value !== '' && selectedButton.length !== 0 || custom.value !== '' )
  {
    calculate();
  }
  
}

/* Functions */

function calculate() {
  let tipPercent;
  let totalTipPerPerson;
  let tipPerPerson;
 
  if (custom.classList.contains('selected')) {
      tipPercent = customTip.value;
  }

  else {
    tipPercent = selectedButton[0].value;
  }

  tipPerPerson = (tipPercent * bill.value * 0.01) / numPeople.value;
  totalTipPerPerson = (bill.value / numPeople.value) + tipPerPerson;

  tipPerPerson = tipPerPerson.toFixed(2);
  totalTipPerPerson = totalTipPerPerson.toFixed(2);
  
  totalNum.innerText = totalTipPerPerson;
  tipNum.innerText = tipPerPerson;
}

function customTipCalculation() {
  buttons.forEach((button) => {
    button.classList.remove('.selected');
  });

  this.classList.add('.selected');

  if ((bill.value !== '' || bill.value < 0) && (numPeople.value !== '' || numPeople.value > 0))
  {
    calculate();
  }
}

function calculateTip() {
  buttons.forEach((button) => {
    button.classList.remove('.selected');
  });

  custom.classList.remove('.selected');
  this.classList.add('.selected');

  calculate();
}
function turnResetButtonOn() {
  if (bill.value !== '' && (numPeople.value !== '' || numPeople.value > 0)){
    reset.disabled = false;
  }
  else 
  {
    reset.disabled = true;
  }
}
function resetAllValues() {
  buttons.forEach((button) => {
    button.classList.remove('.selected');
  });
  totalNum.innerText = '0.00';
  tipNum.innerText = '0.00';
  bill.value = '';
  numPeople.value = '';
  custom.value = '';
  reset.disabled = true;
  error.innerText = '';
  reset.style.backgroundColor = '';
}
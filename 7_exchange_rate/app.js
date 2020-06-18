const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');

const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');

const rate = document.getElementById('rate');

function calculate() {
  currencyOneValue = currencyOne.value;
  currencyTwoValue = currencyTwo.value;
  // console.log(currencyOneValue, currencyTwoValue);

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      const rateToday = data.rates[currencyTwoValue];

      rate.innerText = `1 ${currencyOneValue} = ${rateToday} ${currencyTwoValue}`;

      amountTwo.value = amountOne.value * rateToday;
    });
}

function calculateTwo() {
  currencyOneValue = currencyOne.value;
  currencyTwoValue = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyTwoValue}`)
    .then(res => res.json())
    .then(data => {

      const rateToday = data.rates[currencyOneValue];

      rate.innerText = `1 ${currencyTwoValue} = ${rateToday} ${currencyOneValue}`;

      amountOne.value = amountTwo.value * rateToday;
    }); 
}

// Swap Function 
const swap = document.getElementById('swap');

swap.addEventListener('click', () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

calculate();

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);

amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculateTwo);
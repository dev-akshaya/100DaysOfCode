const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRamdomUser();
getRamdomUser();
getRamdomUser();
getRamdomUser();

// Generate a Random Peeson ------------------------------
async function getRamdomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100)
  }

  addUser(newUser)
}

// Persons Array ------------------------------
function addUser(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Formant Money ------------------------------
function formatMoney(number){
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Add A New User ------------------------------
addUserBtn.addEventListener('click', getRamdomUser);

// Double the money ------------------------------
doubleBtn.addEventListener('click', doubleMoney);
function doubleMoney() {
  data = data.map( user => {
    return { money: user.money * 2}
  })
  updateDOM();
}

// Sort by Richest ------------------------------
sortBtn.addEventListener('click', sortByRichest);
function sortByRichest() {
  data.sort( (a, b) => {
    return b.money - a.money;
  })
  updateDOM();
}

// Show Only Richest ------------------------------
showMillionairesBtn.addEventListener('click', showRichest);
function showRichest() {

  data = data.filter(user => {
    return user.money > 50;
  });
  updateDOM();
}

calculateWealthBtn.addEventListener('click', calculateWealth);
function calculateWealth(){
  const wealth = data.reduce((acc, user) => 
    (acc = acc + user.money), 0
  );

  console.log(wealth);
  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth: <strong> ${wealth} </strong></h3>`;
  main.appendChild(wealthElement);
}
// console.log(data);
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');

const resultHeading = document.getElementById('result-heading');
const mealsElement = document.getElementById('meals');
const singleMealElement = document.getElementById('single-meal');

// -----------------------------------------------------------
// Search Meal -----------------------------------------------
// -----------------------------------------------------------
submit.addEventListener('submit', searchMeal);

function searchMeal(e) {
  e.preventDefault();

  const searchTerm = search.value;
  
  if(searchTerm.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then(result => result.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search Result for "${searchTerm}"</h2>`;

        // No Search Result Found ------------
        if(data.meals === null) {
          resultHeading.innerHTML = `<h2>No Search Result Found</h2>`;
        } else {
          mealsElement.innerHTML = data.meals.map(meal => {
            return (
              `<div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
                </div>
              </div>`
            )
          }).join('');
        }
      });
      // Emply Search Value After Search
      search.value = '';
  } else {
    alert("Please enter a search term");
  }
}

// -----------------------------------------------------------
// Show Single Meal On Click ---------------------------------
// -----------------------------------------------------------
mealsElement.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  // console.log(mealInfo);
  if(mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
    // console.log(mealID);
  }
});

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMealElement.innerHTML = `
    <div class="single-meal">
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" />
      <div class="single-meal-info">
        <h4>Category: ${meal.strCategory}</h4>
        <h4>Area: ${meal.strArea}</h4>
      </div>
      <div class="main">
        <p>Instructions: ${meal.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul>
          ${ingredients.map( ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}
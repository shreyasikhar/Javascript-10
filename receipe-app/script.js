const meals = document.getElementById('meals');
const favContainer = document.getElementById('fav-meals');

const searchBtn = document.getElementById('search');
const searchTerm = document.getElementById('search-term');

const mealPopup = document.getElementById('meal-popup');
const mealInfoEl = document.getElementById('meal-info');
const popupCloseBtn = document.getElementById('close-popup');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    
    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const respData = await resp.json();
    const meal = respData.meals[0];
    return meal;
}

async function getMealBySearch(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
    const respData = await resp.json();
    const meals = respData.meals;
    return meals;
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random">Random Receipe</span>` : ''}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn"><i class="fas fa-heart"></i></button>
        </div>
    `;
    
    meals.appendChild(meal);

    const btn = meal.querySelector('.meal-body .fav-btn');
    btn.addEventListener('click', (e) => {
        if(btn.classList.contains('active')) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove('active');
        }
        else {
            addMealLS(mealData.idMeal);
            btn.classList.add('active');
        }
        
        fetchFavMeals();
    });
    
    meal.childNodes[1].addEventListener('click', () => {
        showMealInfo(mealData);
    });
    meal.childNodes[3].childNodes[1].addEventListener('click', () => {
        showMealInfo(mealData);
    });
}

function addMealLS(mealId) {
    const mealIds = getMealsLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    // meals.innerHTML = "";
    const mealIds = getMealsLS();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));
}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    // cleaning the container
    favContainer.innerHTML = '';

    const mealIds = getMealsLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);
        addMealFav(meal);
    }
}

function addMealFav(mealData) {
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click', () => {
        removeMealLS(mealData.idMeal);

        fetchFavMeals();
        getRandomMeal();
    });

    favMeal.childNodes[1].addEventListener('click', () => {
        showMealInfo(mealData);
    });
    favMeal.childNodes[3].addEventListener('click', () => {
        showMealInfo(mealData);
    });
    
    favContainer.appendChild(favMeal);

}

searchBtn.addEventListener('click', async () => {
    meals.innerHTML = "";
    const search = searchTerm.value;
    const searchResults = await getMealBySearch(search);
    if(searchResults && search) {
        searchResults.forEach((searchResult) => { 
            addMeal(searchResult);
        });
    }
    if(!search) {
        meals.innerHTML = `
        <p class="msg">no results found</p>`;
    }
    if(!searchResults) {
        meals.innerHTML = `
        <p class="msg">no results found</p>`;
    }
});

// to search by clicking enter
searchTerm.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
   searchBtn.click();
  }
});

popupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
});

function showMealInfo(mealData) {
    // cleaning it up
    mealInfoEl.innerHTML = "";

    const mealEl = document.createElement('div');

    const ingredients = [];
    // get ingredients and measures
    for(let i=1; i<=20; i++) {
        if(mealData['strIngredient'+i]) {
            ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`);
        }
        else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">

        <p>${mealData.strInstructions}</p>
        <h3>Ingredients: </h3>
        <ul>
            ${ingredients.map(ing => `
                <li>${ing}</li>
            `).join('')}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);
    
    // show popup
    mealPopup.classList.remove('hidden');
    
}
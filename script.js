/*
Mapping from MealDB Categories to TheCocktailDB drink ingredient
You can customize or expand this object to suit your needs.
*/
const mealCategoryToCocktailIngredient = {
  Beef: "whiskey",
  Chicken: "gin",
  Dessert: "amaretto",
  Lamb: "vodka",
  Miscellaneous: "vodka",
  Pasta: "tequila",
  Pork: "tequila",
  Seafood: "rum",
  Side: "brandy",
  Starter: "rum",
  Vegetarian: "gin",
  Breakfast: "vodka",
  Goat: "whiskey",
  Vegan: "rum",
  // Add more if needed; otherwise default to something like 'cola'
};

/*
    2) Main Initialization Function
       Called on page load to start all the requests:
       - Fetch random meal
       - Display meal
       - Map meal category to spirit
       - Fetch matching (or random) cocktail
       - Display cocktail
*/
function init() {
  fetchRandomMeal()
    .then((meal) => {
      displayMealData(meal);
      const spirit = mapMealCategoryToDrinkIngredient(meal.strCategory);
      return fetchCocktailByDrinkIngredient(spirit);
    })
    .then((cocktail) => {
      displayCocktailData(cocktail);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/*
 Fetch a Random Meal from TheMealDB
 Returns a Promise that resolves with the meal object
 
3. Implement fetching the Random Meal  
- Inside your code (in the provided skeleton file structure), write a function that sends a request to:
     https://www.themealdb.com/api/json/v1/1/random.php
- Explore the structure of JSON using console.log()
- Parse the JSON response and retrieve relevant data about the meal (e.g., `strMeal`, `strMealThumb`, `strInstructions`, `strCategory`, `strIngredients`, `strMeasure` values).
- Display this information on the webpage:
 - Image (e.g., `strMealThumb`)  
 - Name of the meal
 - Category  
 - A table or list of ingredients with their measures  
 - Instructions for cooking  

 */

//
function fetchRandomMeal() {
  return fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }
      return response.json();
    })

    .then((data) => {
      return data.meals[0];
    })
    .catch((error) => console.error(error));
}

/*
Display Meal Data in the DOM
Receives a meal object with fields like:
  strMeal, strMealThumb, strCategory, strInstructions,
  strIngredientX, strMeasureX, etc.
*/
function displayMealData(meal) {
  const strMealThumb = meal.strMealThumb;
  const imageElement = document.getElementById("mealImg");
  imageElement.src = strMealThumb;
}

/*
Convert MealDB Category to a TheCocktailDB Spirit
Looks up category in our map, or defaults to 'cola'
*/
function mapMealCategoryToDrinkIngredient(category) {
  if (!category) return "cola";
  return mealCategoryToCocktailIngredient[category] || "cola";
}

/*
Fetch a Cocktail Using a Spirit from TheCocktailDB
Returns Promise that resolves to cocktail object
We call https://www.thecocktaildb.com/api/json/v1/1/search.php?s=DRINK_INGREDIENT to get a list of cocktails
Don't forget encodeURIComponent()
If no cocktails found, fetch random
*/
function fetchCocktailByDrinkIngredient(drinkIngredient) {
  // Fill in
}

/*
Fetch a Random Cocktail (backup in case nothing is found by the search)
Returns a Promise that resolves to cocktail object
*/
function fetchRandomCocktail() {
  // Fill in
}

/*
Display Cocktail Data in the DOM
*/
function displayCocktailData(cocktail) {
  // Fill in
}

/*
Call init() when the page loads
*/
window.onload = init;

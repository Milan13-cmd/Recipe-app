const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailContent = document.querySelector(".recipe-details-content");
const recipeClose = document.querySelector(".recipe-close");
//Function to get Recipe
const fetchRecipe = async(query) =>{
    recipeContainer.innerHTML="<h2>Fetching Recipes.........</h2>";

    try{

    
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();
   
  recipeContainer.innerHTML="";
  response.meals.forEach(meal =>{
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
                 <img src="${meal.strMealThumb}">
                 <h3>${meal.strMeal}</h3>
                 <p><span>${meal.strArea}</span> Dish</p>
                 <p>Belongs to <span>${meal.strCategory}<span></p>`

    const button = document.createElement('button');
    button.textContent = 'View Recipe';
    recipeDiv.appendChild(button);        
    
    // Adding EventLsitener to recipe Button
    button.addEventListener("click", ()=> {
        openRecipePopup(meal);
    });
    recipeContainer.appendChild(recipeDiv);             
  });
}
catch(error){
    recipeContainer.innerHTML=`<img style="width:300px; height:300px;" src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg?t=st=1709701799~exp=1709705399~hmac=57ce390e0e88b37d0cf9da8c8645fb9445450848b05b9813bc2cb5bfde4654fd&w=740">`;
}
}  
// Function to fetch ingredients and measurements
const fetchIngredients = (meal) =>{
  let ingredientsList = "";
  for(let i = 1; i <= 20; i++){
    const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
        else{
            break;
        } 
  }
  return ingredientsList;

}
 const openRecipePopup = (meal) =>{
    recipeDetailContent.innerHTML =`
       <h2 class="recipeName">${meal.strMeal}</h2>
       <h3>Ingredients: </h3>
       <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div>
        <h3>Instruction:</h3>
        <p class="recipeinstruction">${meal.strInstructions}</p>
    </div>    
    `
    recipeDetailContent.parentElement.style.display = "block";

 }

 recipeClose.addEventListener("click", ()=>{
    recipeDetailContent.parentElement.style.display = "none";
 })
searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput) {
      recipeContainer.innerHTML=`<h2>Please type a meal in search box</h2>`;
      return;
    }
    fetchRecipe(searchInput);
    // console.log("heollo");
});
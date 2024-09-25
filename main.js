const buttonsDivs = document.querySelector('.button-listen').addEventListener('click', getByName )
const drinkName = document.querySelector('.drinkName')
const drinkCategory = document.querySelector('#drinkCategory')
const drinkGlassWare = document.querySelector('#drinkGlassware')
const drinkType = document.querySelector('#drinkType')
const drinkInstructions = document.querySelector('#drinkInstructions')

async function getByName(e){
    try{
        const val = document.querySelector('#drinkSearch').value.trim();
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${val}`)
        const data = await res.json()
        console.log(data.drinks[0])
        const firstDrink = data.drinks[0]

        drinkName.innerHTML = firstDrink.strDrink
        drinkCategory.innerHTML = firstDrink.strCategory
        drinkType.innerHTML = firstDrink.strAlcoholic
        drinkGlassWare.innerHTML = firstDrink.strGlass
        drinkInstructions.innerHTML = firstDrink.strInstructions
    }
   catch(err){
    console.log(`Error: ${err}`)
   }
}const input = document.querySelector('input[name="drinkSearch"]');

const buttonsDivs = document.querySelector('.button-listen').addEventListener('click', getByName )
const randomBtn = document.querySelector('.btn-random').addEventListener('click', getRandom)
const drinkName = document.querySelector('.drinkName')
const drinkCategory = document.querySelector('#drinkCategory')
const drinkGlassWare = document.querySelector('#drinkGlassware')
const drinkType = document.querySelector('#drinkType')
const drinkInstructions = document.querySelector('#drinkInstructions')
const drinkIngredients = document.querySelector('#drinkIngredients')


async function getByName(e){
    try{
        const val = document.querySelector('#drinkSearch').value.trim();
        if(!val){
            alert('Please enter a value') 
            return;
        }
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${val}`)
        const data = await res.json()
        console.log(data.drinks[0])
        console.log(data.drinks)
        const firstDrink = data.drinks[0]

        drinkName.innerHTML = firstDrink.strDrink
        drinkCategory.innerHTML = firstDrink.strCategory
        drinkType.innerHTML = firstDrink.strAlcoholic
        drinkGlassWare.innerHTML = firstDrink.strGlass
        drinkInstructions.innerHTML = firstDrink.strInstructions
        drinkIngredients.innerHTML = ''

        let num = 1
        while(firstDrink[`strIngredient${num}`] !== null){
            console.log(firstDrink[`strIngredient${num}`])
            const ingredient = document.createElement('li')
            drinkIngredients.append(firstDrink[`strIngredient${num}`], ingredient)
            num++
        }
    }
   catch(err){
    console.log(`Error: ${err}`)
   }
}

// const input = document.querySelector('input[name="drinkSearch"]');

async function getRandom(){
    try{
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        const data = await res.json()
        console.log(data.drinks[0])
        const firstDrink = data.drinks[0]

        drinkName.innerHTML = firstDrink.strDrink
        drinkCategory.innerHTML = firstDrink.strCategory
        drinkType.innerHTML = firstDrink.strAlcoholic
        drinkGlassWare.innerHTML = firstDrink.strGlass
        drinkInstructions.innerHTML = firstDrink.strInstructions
        drinkIngredients.innerHTML = ''

        let num = 1
        while(firstDrink[`strIngredient${num}`] !== null){
            console.log(firstDrink[`strIngredient${num}`])
            const ingredient = document.createElement('li')
            drinkIngredients.append(firstDrink[`strIngredient${num}`], ingredient)
            num++
        }
    }catch(err){
        console.log(err)
    }
}

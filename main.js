const buttonsDivs = document.querySelector('.button-listen').addEventListener('click', getByName )
const randomBtn = document.querySelector('.btn-random').addEventListener('click', getRandom)
const leftBtn = document.querySelector('.left-btn').addEventListener('click', function() { rotate('left'); })
const rightBtn = document.querySelector('.right-btn').addEventListener('click', function() { rotate('right'); } )
const drinkName = document.querySelector('.drinkName')
const drinkCategory = document.querySelector('#drinkCategory')
const drinkGlassWare = document.querySelector('#drinkGlassware')
const drinkType = document.querySelector('#drinkType')
const drinkInstructions = document.querySelector('#drinkInstructions')
const drinkIngredients = document.querySelector('#drinkIngredients')
const drinkImg = document.querySelector('#img img')
let currentDrink = ''
let rotatingList = {}
let listIndex = null

async function getByName(e){
    try{
        const val = document.querySelector('#drinkSearch').value.trim();
        if(!val){
            alert('Please enter a value') 
            return;
        }
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${val}`)
        const data = await res.json()
        populateScreen(data,0)
        getStoreList(data,0)
        let num = 1
    }
   catch(err){
    console.log(`Error: ${err}`)
   }
}


async function getRandom(){
    try{
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        const data = await res.json()

        populateScreen(data,0)
        getStoreList(data, 0)

    }catch(err){
        console.log(err)
    }
}

async function rotate(direction){
    try{
        let data = null
        if(!currentDrink){
            const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`)
            data = await res.json()
            getStoreList(data,0)
            populateScreen(rotatingList, currentIndex)
            return
        }else if(rotatingList.drinks.length === 1){
            const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${currentDrink[0]}`)
            data = await res.json()
            getStoreList(data,0)
            populateScreen(rotatingList, currentIndex)
            return
        }
        if(direction === 'left'){
            if(currentIndex == 0){
                 currentIndex = rotatingList.drinks.length - 1
             }else{
                 currentIndex--
             }
        }else if(direction ==='right'){
            if(currentIndex >= rotatingList.drinks.length - 1){
                 currentIndex = 0
             }else{
                 currentIndex++
             }
        }
        populateScreen(rotatingList, currentIndex)        
    }catch(err){
        console.log(err)
    }
}

function populateScreen(data,index){
    const firstDrink = data.drinks[index]
    currentDrink = firstDrink.strDrink
    
    drinkName.innerHTML = firstDrink.strDrink
    drinkCategory.innerHTML = firstDrink.strCategory
    drinkType.innerHTML = firstDrink.strAlcoholic
    drinkGlassWare.innerHTML = firstDrink.strGlass
    drinkInstructions.innerHTML = firstDrink.strInstructions
    drinkIngredients.innerHTML = ''
    drinkImg.src = firstDrink.strDrinkThumb

    let num = 1

    while(firstDrink[`strIngredient${num}`] !== null){
        const ingredient = document.createElement('li')
        drinkIngredients.append(firstDrink[`strIngredient${num}`], ingredient)
        num++
    }
    
}

function getStoreList(data, index){
    const firstDrink = data.drinks[index]
    currentDrink = firstDrink.strDrink
    rotatingList = data
    listIndex = index
    currentIndex = index
}
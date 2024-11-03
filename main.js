const buttonsDivs = document.querySelector('.button-listen').addEventListener('click', getByName )
const randomBtn = document.querySelector('.btn-random').addEventListener('click', getRandom)
const leftBtn = document.querySelector('.left-btn').addEventListener('click', getList)
const rightBtn = document.querySelector('.right-btn').addEventListener('click', goRight)
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

// const input = document.querySelector('input[name="drinkSearch"]');

async function getRandom(){
    try{
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        const data = await res.json()
        // console.log(data.drinks[0])

        populateScreen(data,0)
        getStoreList(data, 0)

    }catch(err){
        console.log(err)
    }
}

async function getList(){
    //change to goLeft
    try{
        // if already a selected drink(ex. we clicked random and the drink in front is martini, start searching from the m drink list)
        //if no drink selected, start from A
        // and once a is done, got to b? or just recycle the list of A
        
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${currentDrink[0]}`)
        const data = await res.json()
        console.log(data.drinks[0])
        console.log(data)

    }catch(err){
        console.log(err)
    }
}

//go left or right, pass in left or pass in right?
async function goRight(){
    //change to goLeft
    try{
        // if already a selected drink(ex. we clicked random and the drink in front is martini, start searching from the m drink list)
        //if no drink selected, start from A
        // and once a is done, got to b? or just recycle the list of A
        let data = null
        if(!currentDrink){
            const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`)
            data = await res.json()
            getStoreList(data,0)
        }else if(rotatingList.length === 1){
            const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${currentDrink[0]}`)
            data = await res.json()
            getStoreList(data,0)
        }else{
            currentIndex++
        }
        console.log('LENGTH!', rotatingList, rotatingList.length )
        // const firstDrink = data.drinks[0]
        // currentDrink = firstDrink.strDrink
        // rotatingList = data
        // listIndex = 0

        populateScreen(rotatingList, currentIndex)
        // console.log(data.drinks[0].strDrink[0])
        // const newList = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${data.drinks[0].strDrink[0]}`)
        // console.log(data.drinks[0])
        // console.log(data)
        /**
         * if list is only one item, do goRandom() request (or alert first who cares)
         * 
         * if at the end of the list, go to list[0]
         * 
         * else go to the next i + 1
         * (so do i store the index its at?)
         * 
         * if 
         *
         * 
         */


    }catch(err){
        console.log(err)
    }
}


function populateScreen(data,index){
    console.log(data)
    const firstDrink = data.drinks[index]
    currentDrink = firstDrink.strDrink
    console.log('CURRENT DRINK',currentDrink, currentDrink[0])

    
    drinkName.innerHTML = firstDrink.strDrink
    drinkCategory.innerHTML = firstDrink.strCategory
    drinkType.innerHTML = firstDrink.strAlcoholic
    drinkGlassWare.innerHTML = firstDrink.strGlass
    drinkInstructions.innerHTML = firstDrink.strInstructions
    drinkIngredients.innerHTML = ''
    drinkImg.src = firstDrink.strDrinkThumb

    let num = 1
    while(firstDrink[`strIngredient${num}`] !== null){
        console.log(firstDrink[`strIngredient${num}`])
        const ingredient = document.createElement('li')
        drinkIngredients.append(firstDrink[`strIngredient${num}`], ingredient)
        num++
    }
    
}

function getStoreList(data, index){
    const firstDrink = data.drinks[0]
    currentDrink = firstDrink.strDrink
    rotatingList = data
    listIndex = index
    currentIndex = index
    console.log('stored!')
    console.log('curr:',currentDrink , 'rotatingList:', rotatingList, 'listIndex', listIndex)
}
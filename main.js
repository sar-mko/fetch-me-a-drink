const buttonsDivs = document.querySelector('.button-listen').addEventListener('click', getByName )
async function getByName(e){
    try{
        const val = document.querySelector('#drinkSearch').value.trim();
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${val}`)
        const data = await res.json()
        console.log(data)
    }
   catch(err){
    console.log(`Error: ${err}`)
   }
}const input = document.querySelector('input[name="drinkSearch"]');

const buttonsDivs = document.querySelector('.button-listen').addEventListener('click', getByName )
async function getByName(e){
    try{
        let val = e.target.value;
        console.log('check', val)
        // console.log(e.target.closest('input'))
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${val}`)
        const data = await res.json()
        console.log(data)
        console.log(data.drinks)
        console.log(data.drinks[0])
        // console.log(data.res)
    }
   catch(err){
    console.log(`Error: ${err}`)
   }
}
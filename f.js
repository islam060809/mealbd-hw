const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b'
const url2 = 'https://www.themealdb.com/api/json/v1/1/search.php?f='
const urlId = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
const urlSearch = 'https:///www.themealdb.com/api/json/v1/1/search.php?s='
const random = 'https://www.themealdb.com/api/json/v1/1/random.php'
const root = document.querySelector("#root")
const randomBtn = document.querySelector("#random")
const letters = document.querySelectorAll("a")
const h3 = document.querySelectorAll("h3")
const inp = document.querySelector("input")
let fit = true
if (fit == true) {
    function getMeals() {
        fetch(url)
            .then((request) => request.json())
            .then(data => {
                console.log(data.meals)
                showMeal(data.meals)
            })
    }
}
getMeals()
function getMealById(id) {
    fetch(urlId + id)
        .then((rest) => rest.json())
        .then((data) => {
            console.log(data.meals[0]);
            const meals = data.meals[0]
            let Ingrs = []
            for (let i = 0; i < 21; i++) {
                if (data.meals[0][`strIngredient${i}`]) {
                    Ingrs.push(meals[`strIngredient${i}`])
                }
            }
            console.log(Ingrs)
            showDetailMeal(data.meals[0], Ingrs)
        })
}


function showMeal(da = []) {
    root.innerHTML = ''
    if (!da || !da.length) {
        h3[0].style.display = "none"
        h3[1].style.display = "block"
    } else {
        h3[0].style.display = "block"
        h3[1].style.display = "none"
        for (const meal of da) {
            root.innerHTML += `
        <div class="card">
         <img src="${meal.strMealThumb}" alt="">
        <a onclick="getMealById(${meal.idMeal})">${meal.strMeal}</a>
        </div>
        `
        }
    }
}
function showDetailMeal(obj, ingredients) {
    const ingrs = ingredients.map((el) => `<li><img src="https://www.themealdb.com/images/ingredients/${el}-Small.png"><h4>${el}</h4></li>`)
    root.innerHTML = `
<div class="detail-cart">
<div>
<h2>${obj.strMeal}</h2>
<img class="trumb" src="${obj.strMealThumb}">
</div>
<div>
<h2>Ingredients</h2>
<ul class="ingrUl">${ingrs}</ul>
</div>
</div> 
<div class="instru">
<h2>Instrution</h2>
<p>${obj.strInstructions}</p>
</div>`
}

function showLetters(simval = "a") {
    fit = false
    fetch(url2 + simval)
        .then((request) => request.json())
        .then(data => {
            console.log(data.meals)
            showMeal(data.meals)
        })

}

randomBtn.onclick = () => {
    fit = false
    fetch(random)
        .then((request) => request.json())
        .then(data => {
            console.log(data.meals)
            showMeal(data.meals)
        })
}

inp.onchange = () => {
    console.log(inp.value)
    let seer = urlSearch + inp.value
    fetch(seer)
            .then((request) => request.json())
            .then(data => {
                console.log(data.meals)
                showMeal(data.meals)
            })
            inp.value = ""
}


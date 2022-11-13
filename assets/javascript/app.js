const result = document.querySelector('.result')
const searchBox = document.querySelector('.search-box')
const randomBtn = document.querySelector('.random-btn')
const mealsList = document.querySelector('.meals-list')
const searchHeading = document.querySelector('.search-heading')
const mealItems = document.querySelectorAll('.meal-item')


function renderHtml(data){
    let htmls = ''

    if(data == null){
        searchHeading.textContent = 'Not results be found, please try again!'
    } else {
        data.forEach(meal => {
            htmls += `<a href="/page/detail.html?id=${meal.idMeal}" class="meal-item">
                <img class="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-overlay">${meal.strMeal}</div>
                </a>`
        })
    }
    mealsList.innerHTML = htmls
}

// Random meal
randomBtn.onclick = () => {
    loading()
    result.classList.remove('d-none')
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        searchHeading.textContent = `Random Meal`
        renderHtml(data.meals)
    })
}

// Api search
searchBox.addEventListener('submit', e => {
    e.preventDefault()
    loading()
    let keyWord = document.querySelector('.search-input').value
    if(keyWord.trim()){
        result.classList.remove('d-none')
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyWord}`)
        .then(res => res.json())
        .then(data => {
            searchHeading.textContent = `Search result for "${keyWord}":`
            renderHtml(data.meals)
        })
    } else {
        alert('Please type something before seaching!')
    }

})


function loading(){
    searchHeading.innerHTML = `<div class="lds-facebook">
                                    <div class=""></div>
                                    <div class=""></div>
                                    <div class=""></div>
                                </div>`
    
}
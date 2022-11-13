var urlParams = new URLSearchParams(window.location.search);

var mealId = urlParams.get('id');

const mealName = document.querySelector('.meal-name')
const mealImg = document.querySelector('.detail-img')
const ingredientsWrapper = document.querySelector('.ingredients-wrapper')
const infoMeals = document.querySelectorAll('.detail-info li')
const mealInstruction = document.querySelector('.instruction-text')
const instructionVideo = document.querySelector('.instruction-video')

console.log(mealName)

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
.then(res => res.json())
.then(data => {
    console.log(data)
    renderHtml(data.meals[0])
})


        

function renderHtml(data){
    mealName.textContent = data.strMeal
    mealImg.setAttribute('src', data.strMealThumb)
    infoMeals.forEach(info => {
        if(data.strArea) document.querySelector('.detail-country').innerHTML = `<b>Country</b>: ${data.strArea}`
        if(data.strCategory) document.querySelector('.detail-category').innerHTML = `<b>Category</b>: ${data.strCategory}`
        if(data.strTags) document.querySelector('.detail-tag').innerHTML = `<b>Tags</b>: ${data.strTags}`
    })
    htmls = ''
    for(let i = 1; i <= 20; i++){
        if(data[`strIngredient${i}`] != '') {
            htmls +=   `<a href="#" class="ingredients-item">
                            <img src="https://www.themealdb.com/images/ingredients/${data[`strIngredient${i}`]}.png" alt=""
                                class="ingredients-img">
                            <div class="ingredients-name">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</div>
                        </a>`
        } else break
    }
    ingredientsWrapper.innerHTML = htmls

    mealInstruction.innerHTML = data.strInstructions.replace(/(\r\n\r\n)/g, '<br><br>').replace(/(\r\n)/g, '<br><br>')

    if(data.strYoutube) {
        instructionVideo.innerHTML = `<h2 class="detail-heading">Video instructions</h2>
        <iframe class="meal-video" width="100%" height="532px" src="${data.strYoutube.replace('watch?v=', 'embed/')}" allowfullscreen></iframe>`
    }
}
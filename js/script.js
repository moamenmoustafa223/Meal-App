let x= $(".navbarcontainer").innerWidth();
$("#sidenavBar").css("left",-x);
let categoryRow =document.getElementById("categoryRow") ;
let areaRow = document.getElementById("areaRow");
let ingredientRow = document.getElementById("ingredientRow");
let contactRow = document.getElementById("contactRow");
let mealRow = document.getElementById("mealRow");
let detailsRow = document.getElementById("detailsRow");
let searchRow = document.getElementById("searchRow");

$(".fa-bars, .fa-xmark").click(function(){
   
    if($("#sidenavBar").css("left")=='0px'){
        
       closeNav()
        }else{
      
       openNav()
    }
})

function closeNav() {
    let x= $(".navbarcontainer").innerWidth();
    $("#sidenavBar").animate({left:-x},500);
    for (let i = 0; i < $(".navbarcontainer li").length ; i++) {
        $(".navbarcontainer li").eq(i).animate({
            top: 200
        }, (i + $(".navbarcontainer li").length) * 100)
    }

    $(".fa-bars").css("display", "block");
    $(".fa-xmark").css("display", "none");
    
}

function openNav(){
    $("#sidenavBar").animate({left:'0px'},500);
    for (let i = 0; i < $(".navbarcontainer li").length ; i++) {
        $(".navbarcontainer li").eq(i).animate({
            top: 0
        }, (i + $(".navbarcontainer li").length) * 100)
    }
    $(".fa-bars").css("display", "none");
    $(".fa-xmark").css("display", "block");

}
$("#homeLogo").click(function(){
    restValues()
    searchByName("")
})
$(function(){
    searchByName("").then(() => {
        $(".loading").fadeOut(500)
    })
})


function restValues (){
    $("#category").addClass("d-none")
    $("#area").addClass("d-none")
    $("#ingredients").addClass("d-none")
    $("#contactUs").addClass("d-none")
    $("#mealsSearchName").addClass("d-none")
    $("#mealDetails").addClass("d-none")
    $("#search").addClass("d-none")
    categoryRow.innerHTML=""
    ingredientRow.innerHTML=""
    areaRow.innerHTML=""
    contactRow.innerHTML=""
    mealRow.innerHTML=""
    detailsRow.innerHTML=""
    searchRow.innerHTML=""
}

$("#Categories").click(function() {
    getCategories()
    closeNav()
    $("#category").removeClass("d-none")
    
})

async function getCategories() {
   
    restValues()
    $(".loading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    console.log(response.categories);
    displayCategories(response.categories)
    $(".loading").fadeOut(300)
   
}

function displayCategories(data) {
    let cartona = "";
   
    // console.log(data)
    // console.log(cartona);
    for (let i = 0; i < data.length; i++) {
        cartona += `
         <div class="col-lg-3 col-md-4 col-sm-6">
          <div onclick="getCategoryMeals('${data[i].strCategory}')" class="meal-card p-3 shadow-lg    rounded overflow-hidden ">
          <figure class= "position-relative m-0 rounded-top  overflow-hidden bg-white">
            <img src="${data[i].strCategoryThumb}" class="img-fluid  rounded-top " alt="">
            <div class="meal-layer  rounded-top position-absolute d-flex justify-content-center align-items-center">
            <p class="text-white fw-semibold">View More</p>
          </div>
            </figure>

             <div class="  bg-white p-2 rounded-bottom ">

             <p class="fw-bold fs-5 m-2" >${data[i].strCategory}</p>
             <p>
               ${data[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}
               </p>
             
            </div>
           
          </div>
        </div>
    
        `
    }
   
   categoryRow.innerHTML = cartona
 
}

async function getCategoryMeals(category) {
    restValues()

    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading").fadeOut(300)
    $("#mealsSearchName").removeClass("d-none")

}

function displayMeals(data) {
    let cartona = "";

    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div onclick="getDetails('${data[i].idMeal}')" class="meal-card p-3 shadow-lg    rounded overflow-hidden ">
          <figure class= "position-relative m-0 rounded-top  overflow-hidden">
            <img src="${data[i].strMealThumb}" class="img-fluid  rounded-top " alt="">
            <div class="meal-layer  rounded-top position-absolute d-flex justify-content-center align-items-center">
            <p class="text-white fw-semibold">View Details</p>
          </div>
            </figure>
            
            <div class="  bg-white p-3 rounded-bottom ">
             <p class="fw-bold fs-5 m-0" >${data[i].strMeal.split(" ").slice(0,3).join(" ")}</p>
            </div>
          </div>
        </div>
        `
    }

    mealRow.innerHTML = cartona
}

$("#Area").click(function() {
    getArea()
    closeNav()
    $("#area").removeClass("d-none")
    
})

async function getArea() {
   restValues()
    $(".loading").fadeIn(300)

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    // console.log(respone.meals);

    displayArea(respone.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}

function displayArea(data) {
    let cartona = "";

    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div onclick="getAreaMeals('${data[i].strArea}')" class="area-card text-center p-5 shadow-lg  rounded-3  ">
          <i class="fa-solid fa-house fs-1 mb-3"></i>
          <h3>${data[i].strArea}</h3>
        </div>
      </div>
        `
    }

    areaRow.innerHTML = cartona
}

async function getAreaMeals(area) {
    restValues()
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading").fadeOut(300)
    $("#mealsSearchName").removeClass("d-none")

}
$("#Ingredients").click(function() {
    getIngredients()
    closeNav()
    $("#ingredients").removeClass("d-none")
    
})
async function getIngredients() {
    restValues()
    $(".loading").fadeIn(300)

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    // console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}

function displayIngredients(data) {
    let cartona = "";

    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="Ingredients-card p-3 pt-3 shadow-lg text-center rounded-3  ">
            <i class="fa-solid fa-mortar-pestle fs-1 mb-2"></i>
         
            <h3 class="mb-3">${data[i].strIngredient}</h3>
            <p>
            ${data[i].strDescription.split(" ").slice(0,10).join(" ")} 

            </p>
          </div>
        </div>
        `
    }

    ingredientRow.innerHTML = cartona
}
async function getIngredientsMeals(ingredients) {
    restValues()
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading").fadeOut(300)
    $("#mealsSearchName").removeClass("d-none")

}

async function getDetails(mealId) {
    
    restValues()
    $(".loading").fadeIn(300)

   
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    respone = await respone.json();

    displayDetails(respone.meals[0])
    $(".loading").fadeOut(300)
    $("#mealDetails").removeClass("d-none")

}

function displayDetails(meal) {
    
    let ingredients = ""

    for (let i = 1; i <= 20; i++) {

        if (meal[`strIngredient${i}`]) {
            ingredients += `<span class="badge bg-secondary fs-5 fw-semibold mx-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</span>`

        }
    }

    let tags = meal.strTags?.split(",")
   
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<span class="badge bg-info fs-5 fw-semibold mx-1">${tags[i]}</span>`
    }

    let cartona = `
            <div class="col-lg-4 col-md-6 text-black">
            <h2 class="mb-3">${meal.strMeal}</h2>
            <figure class="p-3 rounded-4 bg-white shadow-lg ">
              <img src="${meal.strMealThumb}" class="img-fluid rounded-4" alt="">
            </figure>
  
          </div>
          <div class="col-lg-8 text-black">

             <h2 class=" mb-4">Instructions</h2> 
           
            <p class="mb-5">
            ${meal.strInstructions}  
            </p>
            <ul class="list-unstyled mb-4 fw-semibold">
          <li class="fs-2 ">Area : <span id="Area" class=" fw-bold">${meal.strArea}</span></li>
          <li class="fs-2 ">Category : <span id="Category " class="fw-bold">${meal.strCategory}</span></li>
          <li class="fs-2 " >Recipes : <span id="Recipes">
          ${ingredients}
          </span> </li>  
          <li class="fs-2" >Tags : <span id="Tags"> 
          ${tagsStr}
          </span> </li>  
        
             </ul>
             <a type="button" href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
             <a type="button" href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
          </div>`

    detailsRow.innerHTML = cartona
}

$("#Search").click(function() {
    showSearchInputs()
    closeNav()
    $("#search").removeClass("d-none")
    
})


function showSearchInputs() {
    restValues()
    $("#mealsSearchName").removeClass("d-none")
    searchRow.innerHTML = `
    <div class="col-md-6">
          <input  onkeyup="searchByName(this.value)" type="text" class="form-control shadow-lg mb-3" id="searchByName" placeholder="search By Name">

        </div>
        <div class="col-md-6">
          <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" type="text" class="form-control shadow-lg mb-3" id="searchByFirstLetter" placeholder="search By First Letter">
        </div>` 
}

async function searchByName(term) {
    $("#searchByFirstLetter").val("")
    $("#mealsSearchName").removeClass("d-none")
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

     if(response.meals){
        displayMeals(response.meals)
     }else{
        displayMeals([])
     }
    
    $(".loading").fadeOut(300)

}

async function searchByFirstLetter(term) {
    $("#searchByName").val("")
    $(".loading").fadeIn(300)
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    if(response.meals){
        displayMeals(response.meals)
     }else{
        displayMeals([])
     }
    
    $(".loading").fadeOut(300)

}

$("#Contact-US").click(function() {
    displayContacts()
    closeNav()
    $("#contactUs").removeClass("d-none")
    
})
let nameFlag = false;
let emailFlag = false;
let phoneFlag = false;
let ageFlag = false;
let passwordFlag = false;
let repasswordFlag = false;

function displayContacts() {
  
    restValues()
    contactRow.innerHTML = `<div class="row mb-4">
<div class="col-md-6">
  <input type="text" class="form-control mb-3 shadow" onblur="inputsValidation()" id="nameInput" placeholder="Enter your Name">
  <div id="nameAlert" class="alert alert-danger w-100  d-none">
    Special characters and numbers not allowed
</div>
  <input type="tel" class="form-control mb-3 shadow" onblur="inputsValidation()" id="phoneInput" placeholder="Enter your Phone">
  <div id="phoneAlert" class="alert alert-danger w-100   d-none ">
    Enter valid Phone Number
</div>
  <input type="password" class="form-control mb-3 shadow" onblur="inputsValidation()" id="passwordInput" placeholder="Enter your Password">
  <div id="passwordAlert" class="alert alert-danger w-100  d-none ">
  Invalid password, please  Enter at least 6 characters, one letter, and one number
  </div>
</div>
<div class="col-md-6">
  <input type="email" class="form-control mb-3 shadow"  onblur="inputsValidation()" id="emailInput" placeholder="Enter your Email">
  <div id="emailAlert" class="alert alert-danger w-100  d-none ">
    Invaild Email  
</div>
  <input type="number" class="form-control mb-3 shadow" onblur="inputsValidation()" id="ageInput" placeholder="Enter your Age">
  <div id="ageAlert" class="alert alert-danger w-100  d-none  ">
    Invalid age
</div>
  <input type="password" class="form-control mb-3 shadow" onblur="inputsValidation()" id="repasswordInput" placeholder="RePassword">
  <div id="repasswordAlert" class="alert alert-danger w-100  d-none ">
passwords are no matches 
</div>

</div>


</div>
<button type="submit" id="submitBtn" class="btn btn-success shadow" disabled >Submit</button>

`
submitBtn = document.getElementById("submitBtn");

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameFlag = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailFlag = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneFlag = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageFlag = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordFlag = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordFlag = true
    })
}

function inputsValidation() {
    if (nameFlag) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailFlag) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneFlag) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageFlag) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordFlag) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordFlag) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}










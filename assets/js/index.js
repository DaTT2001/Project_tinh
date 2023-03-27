$(document).ready(function () {
  $(".main-slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3500,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
});
$(document).ready(function () {
  $(".comment-slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3500,
    responsive: {
      0: {
        items: 1,
      },
      350: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
});

//dom
const rcmContainer1 = document.querySelector(".rcm-product-card-container1")
const rcmContainer2 = document.querySelector(".rcm-product-card-container2")
const hotContainer = document.querySelector(".hot-game-container")
const productCard = document.querySelector(".product-card")


//khai bao platform
const PC = 4
const NINTENDO = 18
const PS4 = 9
const PS5 = 187
//API_KEY
//firebase
const API_FIREBASE = "https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
//game
const API_GAME = `https://rawg.io/api/games?token&key=26b25919da7f43a3a316e35eb4124cc4&platforms=187,4,9,18&stores=1`;



function showRcmGames(data) {
  rcmContainer1.innerHTML = ""
  rcmContainer2.innerHTML = ""
  for(let i = 0; i < 5; i++) {
    rcmContainer1.innerHTML +=
    `<div class="col-md col-sm-6 col-6">
    <div class="product-card">
    <a href="${checkLogin("products")}#${data[i].id}">
      <img
        src= ${data[i].background_image}
        alt=""
      />
      
    </a>
      <div class="product-info">
      <a href="${checkLogin("products")}#${data[i].id}">
        <div class="info-name-price">
          <h5>${data[i].name}</h5>
        </div>
        <div class="price-rating d-flex justify-content-between align-items-center">
        <h6>Price: <span>€${getPrice(data[i])}</span></h6>
        <div class="product-rating ${getClassByRate(metacriticRate(data[i].metacritic))} d-flex align-items-center justify-content-center"><span ${getClassByRate(metacriticRate(data[i].metacritic))}>${metacriticRate(data[i].metacritic)}</span></div>
        </div>
        </a>
      </div>
      <div class="product-overview">
      <p>Genres: ${showGenre(data[i].genres)}</p>
      <div class="platforms-icon">${showPlatforms(data[i].platforms)}  
      <span class="add-to-cart"><i class="bi bi-cart-plus-fill"></i></span>
    </div>
    </div>
  </div>`
  }
  for(let i = 5; i < 10; i++) {
    rcmContainer2.innerHTML +=
    `<div class="col-md col-sm-6 col-6">
    <div class="product-card">
    <a href="${checkLogin("products")}#${data[i].id}">
      <img
        src= ${data[i].background_image}
        alt=""
      />
      
    </a>
      <div class="product-info">
      <a href="${checkLogin("products")}#${data[i].id}">
        <div class="info-name-price">
          <h5>${data[i].name}</h5>
        </div>
        <div class="price-rating d-flex justify-content-between align-items-center">
        <h6>Price: <span>€${getPrice(data[i])}</span></h6>
        <div class="product-rating ${getClassByRate(metacriticRate(data[i].metacritic))} d-flex align-items-center justify-content-center"><span ${getClassByRate(metacriticRate(data[i].metacritic))}>${metacriticRate(data[i].metacritic)}</span></div>
        </div>
        </a>
      </div>
      <div class="product-overview">
      <p>Genres: ${showGenre(data[i].genres)}</p>
      <div class="platforms-icon">${showPlatforms(data[i].platforms)}  
      <span class="add-to-cart"><i class="bi bi-cart-plus-fill"></i></span>
    </div>
    </div>
  </div>`
  }
}
function showHotGames(data) {
  hotContainer.innerHTML = ""
  for(let i = 10; i < 15; i++) {
    hotContainer.innerHTML +=
    `<div class="col-md col-sm-6 col-6">
    <div class="product-card">
    <a href="${checkLogin("products")}#${data[i].id}">
      <img
        src= ${data[i].background_image}
        alt=""
      />
    </a>
      <div class="product-info">
      <a href="${checkLogin("products")}#${data[i].id}">
        <div class="info-name-price">
          <h5>${data[i].name}</h5>
        </div>
        <div class="price-rating d-flex justify-content-between align-items-center">
        <h6>Price: <span>€${getPrice(data[i])}</span></h6>
        <div class="product-rating ${getClassByRate(metacriticRate(data[i].metacritic))} d-flex align-items-center justify-content-center"><span ${getClassByRate(metacriticRate(data[i].metacritic))}>${metacriticRate(data[i].metacritic)}</span></div>
        </div>
        
        </a>
      </div>
      <div class="product-overview">
      <p>Genres: ${showGenre(data[i].genres)}</p>
      <div class="platforms-icon">${showPlatforms(data[i].platforms)}  
      <span class="add-to-cart"><i class="bi bi-cart-plus-fill"></i></span>
      </div>
    </div>
  </div>`
  }
}
async function checkCart(uid) {
  const res = await fetch(`https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/carts.json`)
  const data = await res.json()
  const product_id_list = []
    for(let key in data) {
      product_id_list.push(key)
    }

  const product_list = document.querySelectorAll(".product-card > a") 
  const addToCartIcon = document.querySelectorAll(".add-to-cart")
  for(let i = 0; i < addToCartIcon.length; i++) {

        const newKey = product_list[i].hash.slice(1)
        if(product_id_list.includes(newKey)) {
          addToCartIcon[i].innerHTML = `
          <i class="bi bi-cart-check-fill"></i>
          `
          addToCartIcon[i].style.color = "#FAD322" 
          addToCartIcon[i].classList.replace("add-to-cart", "add-to-cart1")
        }
  }
}
function getClassByRate(rating) {
  if(rating >= 80) {
    return "blue"
  }
  else if(rating < 80 && rating >=60) {
    return "yellow"
  }
  else if(rating < 60 && rating >=40) {
    return "orange"
  }
  else {
    return "red"
  }
} 
async function getGames(url) {
  const res = await fetch(url);
  const data = await res.json();
  showRcmGames(data.results);
  showHotGames(data.results);
  checkCart(location.search.slice(6))
  addToCart()
}
function getPrice(id) {
  if(id.rating === 0) {
      return 0.99
    }
    return Math.round((id.rating) * 300)/100
} 
function metacriticRate(metacritic) {
  if(!metacritic) {
    return 0
  }
  return metacritic
} 
function showGenre(genres) {
  let result = ''
  for(let i = 0; i < genres.length - 1; i++) {
    result = result + genres[i].name + ", "
  }
  result = result + genres[genres.length - 1].name + "."
  return result
}
function showPlatforms(platform) {
  let platFormIcon = ''
  const result = []
  for(let i = 0; i < platform.length; i++) {
    result.push(platform[i].platform.id)
  }
  if(result.includes(PC)) {
    platFormIcon += 
    `
    <i class="bi bi-windows"></i>
    `
  }
  if(result.includes(NINTENDO)) {
    platFormIcon += 
    `
    <i class="bi bi-nintendo-switch"></i>
    `
  }
  if(result.includes(PS4) || result.includes(PS5)) {
    platFormIcon += 
    `
    <i class="bi bi-playstation"></i>
    `
  }
  return platFormIcon
}

getGames(API_GAME)

// banner click
const rcmBanner = document.querySelector(".rcm-banner")
const hotGameBanner = document.querySelector(".hot-game-banner")

function bannerClick(name,page) {
  name.addEventListener("click", (e) => {
    window.location.assign(`${checkLogin(page)}`)
  })
}
bannerClick(rcmBanner, "allgames")
bannerClick(hotGameBanner,"allgames")



// categories
const categoriesItemArr = document.querySelectorAll(".categories-item")
console.log(categoriesItemArr);
categoriesItemArr.forEach(item => {
  item.addEventListener("click", (e) => {
    location.assign(`${checkLogin("allgames")}`)
  })
});

// btn-nav
const btn_nav = document.querySelectorAll(".btn-nav")
console.log(btn_nav);
btn_nav.forEach(btn => {
  btn.addEventListener("click", (e) => {
    location.assign(`${checkLogin("allgames")}` )
    }
  )
});



// slider redirect
const slider = document.querySelectorAll(".slider a")
console.log(slider);
slider[0].href = `${checkLogin("products")}#32`
slider[1].href = `${checkLogin("products")}#881576`
slider[2].href = `${checkLogin("products")}#452639`
slider[3].href = `${checkLogin("products")}#906547`
slider[4].href = `${checkLogin("products")}#799265`


function checkLogin(page) {
  let uid = window.location.search.split("=")[1];
  if(!uid) {
    return "./login.html"
  }
  else {
    return `./${page}.html?user=${uid}`
  }
}
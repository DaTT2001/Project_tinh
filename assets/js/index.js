$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
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

//dom
const user = document.querySelector(".user-login");
const uid = location.hash.slice(10);
const rcmContainer = document.querySelector(".rcm-product-card-container")
const hotContainer = document.querySelector(".hot-game-container")
const productCard = document.querySelector(".product-card")
const searchInput = document.querySelector(".search-input-container")
const searchResultArea = document.querySelector(".search-result-area")


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





async function getUID(url) {
  const res = await fetch(url);
  const data = await res.json();
  const userData = data[`${uid}`];
  user.innerHTML = `
            <a class="nav-link dropdown-toggle person-login person-setting d-flex" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person"> </i>
                <p>${userData.username}</p>
            </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#user-uid-${uid}">My profile</a></li>
                <li><a class="dropdown-item" href="#user-uid-${uid}">Cart</a></li>
                <li><a class="dropdown-item" href="#user-uid-${uid}">Favourites</a></li>
                <li><a class="dropdown-item" href="#user-uid-${uid}">Order History</a></li>
              </ul>
        `;

  // fetch("https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users.json")
}
function showRcmGames(data) {
  rcmContainer.innerHTML = ""
  console.log(data);
  for(let i = 0; i < 8; i++) {
    rcmContainer.innerHTML +=
    `<div class="col-md-3 col-sm-6 col-12">
    <div class="product-card">
    <a href="./products.html#${data[i].id}">
      <img
        src= ${data[i].background_image}
        alt=""
      />
      
    </a>
      <div class="product-info">
        <a href="./products.html#${data[i].id}">
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
      <span class="add-to-cart"><i class="bi bi-heart"></i></span>
    </div>
    
    </div>
  </div>`
  }
}
function showHotGames(data) {
  hotContainer.innerHTML = ""
  for(let i = 8; i < 12; i++) {
    hotContainer.innerHTML +=
    `<div class="col-md-3 col-sm-6 col-12">
    <div class="product-card">
    <a href="./products.html#${data[i].id}">
      <img
        src= ${data[i].background_image}
        alt=""
      />
      
    </a>
      <div class="product-info">
        <a href="./products.html#${data[i].id}">
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
      <span class="add-to-cart"><i class="bi bi-heart"></i></span>
      </div>
    
    </div>
  </div>`
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
async function getSearch(url) {
  const res = await fetch(url);
  const data = await res.json();
  getSearchResult(data.results)
}

function search() {
  searchInput.addEventListener("input", (e) => {
      e.preventDefault()
      const formData = new FormData(searchInput)
      const data = Object.fromEntries(formData);
      getSearch(API_GAME+`&search=${data.search_input}`)
    }  
  )
}
function getSearchResult(data) {
  const formData1 = new FormData(searchInput)
  const data1 = Object.fromEntries(formData1);
  searchResultArea.innerHTML = ""
  for(let i = 0; i < data.length; i++) {
    searchResultArea.innerHTML += `
      <p>${data[i].name}</p>
    `
    if(i == 5) {
      break
    }
  }
  if(data1.search_input.trim() === "") {
    searchResultArea.innerHTML = ""
  }
}
search()
getUID(API_FIREBASE)
getGames(API_GAME)

// event click add-to-cart-icon start
function addToCart() {
  const addToCartIcon = document.querySelectorAll(".add-to-cart")
  addToCartIcon.forEach((item) => {
    item.addEventListener('click', (e) => {
      item.style.color = "#FAD318"
    })
  })
}
// click add to cart icon end

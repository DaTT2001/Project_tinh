const navBarArea = document.querySelectorAll(".nav-bar button")
const logo = document.querySelector(".logo")
let uid = location.search.slice(6);
const user = document.querySelector(".user-login");
const API_RAWG = `https://rawg.io/api/games?token&key=0d6ef0d8df40452fad1a02cef66ad626&platforms=187,4,9,18&stores=1`;




navBarArea.forEach(nav => {
  nav.addEventListener("click", (e) => {
    if(nav.value == 'community') {
      window.location.assign("https://discord.com/")
    }
    else {
      window.location.assign(`${checkLogin(nav.value)}`)
    }
  })
})
logo.addEventListener("click", (e) => {
  let uid = window.location.search.split("=")[1];
  if(!uid) {
    window.location.assign("./index.html")
  }
  else {
    window.location.assign(`./index.html?user=${uid}`)
  }
} )

async function getUID(url) {
  const res = await fetch(url);
  const data = await res.json();
  const userData = data[`${uid}`];
  user.innerHTML = `
            <a class="nav-link dropdown-toggle person-login person-setting d-flex" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <p>${userData.username}</p>
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="">My profile</a></li>
              <li><a class="dropdown-item" href="">Add funds</a></li>
              <li><a class="dropdown-item" href="">Dashboard</a></li>
              <li><a class="dropdown-item" href="./index.html">Log out</a></li>
            </ul>
              <li><a class="dropdown-item" href="">${userData.username}</a></li>
              <li><a class="dropdown-item" href="">My profile</a></li>
              <li><a class="dropdown-item" href="">Add funds</a></li>
              <li><a class="dropdown-item" href="">Dashboard</a></li>
              <li><a class="dropdown-item" href="./index.html">Log out</a></li>
        `;
}
getUID(API_FIREBASE)

//  login logic
function checkLogin(page) {
    let uid = window.location.search.split("=")[1];
    if(!uid) {
      return "./login.html"
    }
    else {
      return `./${page}.html?user=${uid}`
    }
}




// search
const searchInput = document.querySelector(".search-input-container")
const searchResultArea = document.querySelector(".search-result-area")

async function getSearch(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    getSearchResult(data.results)
  }
  
function search() {
    searchInput.addEventListener("input", (e) => {
        e.preventDefault()
        const formData = new FormData(searchInput)
        const data = Object.fromEntries(formData);
        getSearch(API_RAWG+`&search=${data.search_input}`)
      }  
    )
}
function getSearchResult(data) {
    const formData1 = new FormData(searchInput)
    const data1 = Object.fromEntries(formData1);
    searchResultArea.innerHTML = ""
    for(let i = 0; i < data.length; i++) {
      searchResultArea.innerHTML += `
        <a href="${checkLogin("products")}#${data[i].id}" class="d-flex justify-content-between search-result">${data[i].name} <img
        src= ${data[i].background_image}
        alt="" width="50px"
      /></a> 
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
searchInput.addEventListener("submit", (e) => {
    e.preventDefault()
    window.location.assign(`${checkLogin("allgames")}`)
})



// cart count
async function getCartCount() {
  const res =  await fetch(`https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/carts.json`)
  const data =  await res.json()
  let i = 0
  const product_id_list = []
  const product_quantity = []
  for(let key in data) {
    product_id_list.push(key)
    product_quantity.push(data[key])
    i++
  }
  const cartCount = document.querySelector(".cart-count")
  cartCount.textContent = i 
  // cart popup
  const cartPopupContentEl = document.querySelector(".cart-popup-content ul")
  const cartPopupTotalPrice = document.querySelector(".total-price")
  const cartPopupFooter = document.querySelector(".cart-popup-footer")
  const cartPopupBtnEl = document.getElementById("view-cart")
  if(product_id_list.length === 0) {
    cartPopupContentEl.innerHTML = `
    <li class="shopping-cart-empty popup-cart-item">
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" class="sHS1HD" style="max-width: 40px; min-width: 40px; height: auto;"><path fill="#FAC917" fill-rule="nonzero" d="M7.5 0a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm1.56 11.62c-.39.16-.7.27-.92.35-.23.08-.5.12-.8.12a1.6 1.6 0 0 1-1.1-.34 1.1 1.1 0 0 1-.38-.87 3.15 3.15 0 0 1 .12-.9l.48-1.7.11-.47c.03-.15.04-.28.04-.4 0-.22-.04-.37-.13-.46-.1-.08-.26-.12-.52-.12-.12 0-.25.01-.38.05L5.24 7l.13-.52c.32-.13.62-.24.9-.33.3-.1.57-.14.83-.14.46 0 .82.11 1.07.34.25.22.38.51.38.87a5.08 5.08 0 0 1-.12.9l-.48 1.7a4.81 4.81 0 0 0-.16.87c0 .23.05.38.16.46.1.09.27.13.52.13a2.26 2.26 0 0 0 .72-.17l-.13.52zm-.08-6.9c-.23.2-.5.3-.81.3-.32 0-.59-.1-.82-.3a1 1 0 0 1-.33-.76 1 1 0 0 1 .33-.76c.23-.21.5-.32.82-.32.31 0 .58.1.8.32a1 1 0 0 1 .34.76 1 1 0 0 1-.33.76z"></path></svg>
    <p>Your shopping cart is empty</p>
    </li>
    `
    cartPopupFooter.classList.add("none")
    cartPopupBtnEl.style.display = "none"
  }
  else {
    let price = 0
    cartPopupContentEl.innerHTML = ""
    for(let i = 0; i < product_id_list.length; i++) {
      const res1 = await fetch(`https://rawg.io/api/games/${product_id_list[i]}?token&key=0d6ef0d8df40452fad1a02cef66ad626&/`)
      const data1 = await res1.json()
      price += getPricePopup(data1)
      cartPopupContentEl.innerHTML += `
        <li class="popup-cart-item">
        <div class="d-flex align-items-center gap-2">
          <img
              src= ${data1.background_image}
              alt=""
            />
          <a href="${checkLogin("products")}#${data1.id}"> 
          ${data1.name}
          </a>
        </div>
        <div class="cart-item-info">
          <span>€${getPricePopup(data1)}</span>
        </div>
        </li>
      `
    }
    cartPopupTotalPrice.textContent = `€${(Math.round(price * 100 )) / 100}`
    
  }
}
function getPricePopup(id) {
  if(id.rating === 0) {
    return 0.99
  }
  return Math.round((id.rating) * 300)/100
}
getCartCount()




// cart redirect
const cartIcon = document.querySelector(".cart-icon a")
const cartPopupContentEl = document.querySelector(".cart-popup")
const cartPopupBtnEl = document.getElementById("view-cart")
const closeIcon =  document.querySelector(".cart-popup-header > i")

cartPopupBtnEl.addEventListener("click", (e) => {
  window.location.assign(`${checkLogin("carts")}`)
})
closeIcon.addEventListener("click", (e) => {
  cartPopupContentEl.classList.toggle("active")
})

document.addEventListener("click", (e) => {
  if(cartIcon.contains(e.target)) {
    cartPopupContentEl.classList.toggle("active")
  }
  else {
    cartPopupContentEl.classList.remove("active")
  }
})

// console.log(cartIcon);
// cartIcon.href = `${checkLogin("carts")}`



// reponsive
const navbarIcon = document.querySelector(".nav-bar-icon i")
const navbar = document.querySelector(".nav-bar")
const searchIcon = document.querySelector(".search-icon")
const searchInputContainer = document.querySelector(".search-input")
const xIcon = document.querySelector(".x-icon")
const personIcon = document.querySelector(".person-icon")
const userLogin = document.querySelector(".user-login")

searchIcon.addEventListener("click", (e) => {
  searchInputContainer.classList.add("active")
  searchInput.classList.add("active")
  searchIcon.classList.add("active")
  xIcon.classList.add("active")
})
xIcon.addEventListener("click", (e) => {
  searchInputContainer.classList.remove("active")
  searchInput.classList.remove("active")
  searchIcon.classList.remove("active")
  xIcon.classList.remove("active")
  searchInputContainer.value = ""
  searchResultArea.innerHTML = ""
})

document.addEventListener("click", (e) => {
  if(personIcon.contains(e.target)) {
    userLogin.classList.toggle("active")
    personIcon.classList.toggle("active")
  }
  else if(!personIcon.contains(e.target)) {
    userLogin.classList.remove("active")
    personIcon.classList.remove("active")
  }
})
document.addEventListener("click", (e) => {
  if(navbarIcon.contains(e.target)) {
    navbar.classList.toggle("active")
    navbarIcon.classList.toggle("active")
  }
  else if(!navbarIcon.contains(e.target)) {
    navbar.classList.remove("active")
  }
})

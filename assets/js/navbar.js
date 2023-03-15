const navBarArea = document.querySelectorAll(".nav-bar div button")
const logo = document.querySelector(".logo")
let uid = location.search.slice(6);
const user = document.querySelector(".user-login");
const API_RAWG = `https://rawg.io/api/games?token&key=26b25919da7f43a3a316e35eb4124cc4&platforms=187,4,9,18&stores=1`;




navBarArea.forEach(nav => {
  nav.addEventListener("click", (e) => {
    window.location.assign(`${checkLogin(nav.value)}`)
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
            <i class="bi bi-person"> </i>
                <p>${userData.username}</p>
            </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="./index.html">Log out</a></li>
              </ul>
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
  for(let key in data) {
    i++
  }
  const cartCount = document.querySelector(".cart-count")
  cartCount.textContent = i 
}
getCartCount()

//API_KEY
//firebase
const API_FIREBASE = "https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
//game
const API_GAME = `https://rawg.io/api/games?token&key=26b25919da7f43a3a316e35eb4124cc4&platforms=187,4,9,18&stores=1&metacritic=1,100`;


//khai bao platform
const PC = 4
const NINTENDO = 18
const PS4 = 9
const PS5 = 187

// dom
const listGameContainer = document.querySelector(".product-card-container")
const formDataArea = document.getElementById("formElement")
const searchArea = document.querySelector(".filter-search > input")
const checkBoxes = document.querySelectorAll('input[name="genres"]')
const checkBoxesPlatforms = document.querySelectorAll('input[name="platforms"]')
const releaseDate = document.querySelectorAll('.released input')
const metacriticArr = document.querySelectorAll('.metacritic input')
const resultFound = document.querySelector(".count-result span")
const selectArea = document.getElementById("my-select-order")


// color rating
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

function showGameList(data) {
    listGameContainer.innerHTML =""
    for(let i = 0; i < data.length; i++) {
        listGameContainer.innerHTML +=
          `<div class="col-md-3 col-sm-6 col-12 d-flex justify-content-center">
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
                <p>${data[i].name}</p>
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
// showGameList()
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
    if(genres.length == 0) {
        return "undefined"
    }
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
    if(result.length == 0) {
        platFormIcon = `
            <i class="bi bi-windows"></i>
        `
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
async function getGames(url) {
    const res = await fetch(url);
    const data = await res.json();
    showGameList(data.results);
    resultFound.textContent = getDataCount(data)
    checkCart(location.search.slice(6))
    addToCart()
}

getGames(API_GAME+`&ordering=${selectArea.value}`)
numOfPages(API_GAME+`&ordering=${selectArea.value}`)
nextPage(API_GAME+`&ordering=${selectArea.value}`)


function searchListGames() {
    const numberPages = document.querySelector(".number-pages")
    let currentAPI = API_GAME
    selectArea.addEventListener("change", (e) => {
      const genres = getGenres(checkBoxes)
      currentAPI = API_GAME + `&search=${getProductName()}` + genres + getMetacritic(metacriticArr)
      + getPlatforms(checkBoxesPlatforms) + `&ordering=${selectArea.value}` 
      getGames(currentAPI) 
      numberPages.innerHTML = ""
      numOfPages(currentAPI)   
    })
    searchArea.addEventListener("input", (e) => {
        const genres = getGenres(checkBoxes)
        currentAPI = API_GAME + `&search=${getProductName()}` + genres + getMetacritic(metacriticArr)
        + getPlatforms(checkBoxesPlatforms) + `&ordering=${selectArea.value}`
      getGames(currentAPI)   
      numberPages.innerHTML = ""
      numOfPages(currentAPI)   


      })
    checkBoxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const genres = getGenres(checkBoxes)
        currentAPI = API_GAME + `&search=${getProductName()}` + genres + getMetacritic(metacriticArr)
      + getPlatforms(checkBoxesPlatforms) + `&ordering=${selectArea.value}`
      getGames(currentAPI)   
      numberPages.innerHTML = ""
      numOfPages(currentAPI)   
      
      })
    })
    checkBoxesPlatforms.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const genres = getGenres(checkBoxes)
        currentAPI = API_GAME + `&search=${getProductName()}` + genres + getMetacritic(metacriticArr)
      + getPlatforms(checkBoxesPlatforms) + `&ordering=${selectArea.value}`
        getGames(currentAPI)
      numberPages.innerHTML = ""
      console.log(currentAPI);
        numOfPages(currentAPI)   
      })
    })
    metacriticArr[0].addEventListener("input", (e) => {
        const genres = getGenres(checkBoxes)
        currentAPI = API_GAME + `&search=${getProductName()}` + genres + getMetacritic(metacriticArr)
      + getPlatforms(checkBoxesPlatforms) + `&ordering=${selectArea.value}`
        getGames(currentAPI)
      numberPages.innerHTML = ""
        numOfPages(currentAPI)   

      })
    metacriticArr[1].addEventListener("input", (e) => {
        const genres = getGenres(checkBoxes)        
        currentAPI = API_GAME + `&search=${getProductName()}` + genres + getMetacritic(metacriticArr)
      + getPlatforms(checkBoxesPlatforms) + `&ordering=${selectArea.value}`
        getGames(currentAPI)
      numberPages.innerHTML = ""
      numOfPages(currentAPI)   
      })
  }


function getDataCount(data) {
  return data.count
}

// // Show button and change color
function modify_buttons(all_buttons, required_page,currentAPI) {
  let show_button_arr = []
  // document.querySelector('.body-cards').innerHTML = ``
  all_buttons.forEach((btn) => {
      btn.classList.remove('active_button')
      btn.classList.add('hidden_button')
  })
  if (required_page > 1) {
      show_button_arr = required_page >= 3 ? all_buttons.slice(required_page - 3, required_page + 2) : all_buttons.slice(required_page - 2, required_page + 3)
  }
  else {
    show_button_arr = all_buttons.slice(0,5)
  }
  show_button_arr.forEach(show_button => {
      show_button.classList.remove('hidden_button')
  })
  all_buttons[required_page - 1].classList.add('active_button')
  getGames(currentAPI + `&page=${required_page}`)
}


// Page Number
function numOfPages(currentAPI) {
  const num_buttons = document.querySelector('.number-pages')
  for (num = 1; num <= 30; num++) {
      if (num <= 5) {
          button_number = `<button id = "${num}" class="num-page">${num}</button>`
          num_buttons.innerHTML += button_number
          continue
      }
      button_number = `<button id = "${num}" class="hidden_button num-page">${num}</button>`
      num_buttons.innerHTML += button_number
  }
  const buttons = document.querySelectorAll('.num-page')
  const all_buttons = Array.from(buttons)
  all_buttons[0].classList.add('active_button')
  all_buttons.forEach((button, index) => {
      button.addEventListener("click", function () {
          required_page = index + 1
          modify_buttons(all_buttons, required_page, currentAPI )
      })
  });
}
// Next Page
function nextPage(currentAPI) {
  const next_page_btn = document.querySelector('.next-page')
  const prep_page_btn = document.querySelector('.prep-page')
  const buttons = document.querySelectorAll('.num-page')
  const all_buttons = [...buttons]
  next_page_btn.addEventListener('click', function () {
      const current_page = Number(document.querySelector('.active_button').id)
      const required_page = current_page + 1
      modify_buttons(all_buttons, required_page)
  })
  prep_page_btn.addEventListener('click', () => {
      const current_page = Number(document.querySelector('.active_button').id)
      const required_page = current_page > 1 ? current_page - 1 : current_page
      modify_buttons(all_buttons, required_page, currentAPI)
  })
}





function getReleased(release) {
    let date1 = new Date(release[0].value)
    let date2 = new Date(release[1].value)
    if(date1 > date2) {
        return `&dates=${release[1].value},${release[0].value}`
    }
    else if(date2 > date1) {
        return `&dates=${release[1].value},${release[0].value}`
    }
    else {
        return `&dates=${release[1].value}`
    }
}

function getMetacritic(metacritic) {
    if(metacritic[0].value.trim() == "" || metacritic[1].value.trim() =="") {
        return `&metacritic=1,100`
    }
    else {
        let value0 = Number(metacritic[0].value)
        let value1 = Number(metacritic[1].value)
        if(value0 <= value1) {
            return `&metacritic=${metacritic[0].value},${metacritic[1].value}`
        }
        else {
            return `&metacritic=${metacritic[1].value},${metacritic[0].value}`
        }
    }
}
function getGenres(checkbox) {
    const selectedGenres = []
    checkbox.forEach((checkbox) => {
        if(checkbox.checked) {
            selectedGenres.push(`&genres=${checkbox.value}`)
        }
    })   
    return selectedGenres.join("")
}
function getProductName() {
    return searchArea.value.trim()
}
function checkInput(input) {
  if (input.value === "") {
    input.value = input.defaultValue;
  }
  else {
    let num = Number(input.value) 
    if(num < 0) {
      input.value = input.defaultValue
    }
    else if(num >= 100){
      input.value = input.defaultValue
    }
  }
}
function getPlatforms(platforms) {
  const selectedPlatforms = []
  platforms.forEach((platforms) => {
    if(platforms.checked) {
      selectedPlatforms.push(`&platforms=${platforms.value}`)
    }
  })
  return selectedPlatforms.join("")
}
searchListGames()


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



// logic responsive 
const filter_icon = document.querySelector(".filter-icon")
const filter_table = document.querySelector(".filter-table")
const filter_close_icon = document.querySelector(".filter-table-close")

document.addEventListener("click", (e) => {
  if(filter_icon.contains(e.target)) {
    filter_table.classList.add("active")
  }
  else if(!filter_table.contains(e.target)) {
    filter_table.classList.remove("active")
  }
})
filter_close_icon.addEventListener("click", (e) => {
  filter_table.classList.remove("active")
})
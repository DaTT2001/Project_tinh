
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
    resultFound.textContent = `${data.count}`
}
getGames(API_GAME +`&ordering=${selectArea.value}`)
function search() {
    selectArea.addEventListener("change", (e) => {
      const genres = getGenres(checkBoxes)
      getGames(API_GAME + `&search=${getProductName()}` + genres + getMetacritic(metacriticArr)
      + getPlatforms(checkBoxesPlatforms) + `&ordering=${selectArea.value}`)
    })
    searchArea.addEventListener("input", (e) => {
        const genres = getGenres(checkBoxes)
        getGames(API_GAME + `&search=${getProductName()}` + genres + getMetacritic(metacriticArr)
        + getPlatforms(checkBoxesPlatforms)+ `&ordering=${selectArea.value}`)
    })
    checkBoxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
      console.log(selectArea.value);

        const genres = getGenres(checkBoxes)
        getGames(API_GAME + genres + `&search=${getProductName()}`+ getReleased(releaseDate) + getMetacritic(metacriticArr) + getPlatforms(checkBoxesPlatforms)+ `&ordering=${selectArea.value}` )
      })
    })
    checkBoxesPlatforms.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const genres = getGenres(checkBoxes)
        getGames(API_GAME + genres + `&search=${getProductName()}`+ getReleased(releaseDate) + getMetacritic(metacriticArr) + getPlatforms(checkBoxesPlatforms) + `&ordering=${selectArea.value}`)
      })
    })
    // checkBoxes.addEventListener("change", (e) => {
    //     const genres = getGenres(checkBoxes)
    //     getGames(API_GAME + genres + `&search=${getProductName()}`+ getReleased(releaseDate) + getMetacritic(metacriticArr)  )
    //   }  
    // )
    metacriticArr[0].addEventListener("input", (e) => {
        const genres = getGenres(checkBoxes)
        getGames(API_GAME + genres + `&search=${getProductName()}`+ getReleased(releaseDate) + getMetacritic(metacriticArr) + getPlatforms(checkBoxesPlatforms) + `&ordering=${selectArea.value}`)
    })
    metacriticArr[1].addEventListener("input", (e) => {
        const genres = getGenres(checkBoxes)
        getGames(API_GAME + genres + `&search=${getProductName()}`+ getReleased(releaseDate) + getMetacritic(metacriticArr) + getPlatforms(checkBoxesPlatforms)+ `&ordering=${selectArea.value}` )
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
search()

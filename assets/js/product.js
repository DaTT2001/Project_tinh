
//API_KEY
//firebase
const API_FIREBASE = "https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
//game
const API_GAME = `https://rawg.io/api/games/${location.hash.slice(1)}?token&key=26b25919da7f43a3a316e35eb4124cc4&/`;
const API_IMG = `https://rawg.io/api/games/${location.hash.slice(1)}/screenshots?token&key=26b25919da7f43a3a316e35eb4124cc4&/`

//khai bao platform
const PC = 4
const NINTENDO = 18
const PS4 = 9
const PS5 = 187

// khai bao DOM
const productInfoArea = document.querySelector(".product")
const productPrice = document.querySelector(".offer-content h3")


// lay du lieu game
async function getGame(url) {
    const res = await fetch(url) ;
    const data = await res.json(
    ) ;
    console.log(data);
    showGame(data)
    productPrice.innerHTML = `
        €${getPrice(data.rating)}
        <span>ⓘ Price is not final</span>
    `
    showMoreDetails(data)
    showRequirement(data)
    showDescription(data)
}
getGame(API_GAME)
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

function showGame(data) {
    productInfoArea.innerHTML = ""
    productInfoArea.innerHTML = `
    <div class="col-3 product-img">
    <img src="${data.background_image}" alt="" width="100%">
</div>
<div class="col-9 product-info d-flex flex-column justify-content-between">
    <div class="product-name-meta d-flex justify-content-between">
        <h2>${data.name}</h2>
        <div class="product-rating d-flex align-items-center justify-content-center ${getClassByRate(data.metacritic)}">
            <span class=${getClassByRate(data.metacritic)}>${getMetacritic(data.metacritic)}</span>
        </div>
    </div>
    <div class="rating-star">
        ${getStar(data.rating)}
        <span class="rating-count">${getRatingCount(data.ratings_count, data.rating)}</span>
    </div>
    <div class="product-genres">
        ${getGenres(data.genres)}
    </div>
    <div class="product-redeem">
        <div class="product-redeem-item">
            <div class="d-flex align-items-center gap-2">
                <i class="bi bi-check-square-fill"></i>
                <b>Global</b>
            </div>
            <p>Activated in VietNam</p>
        </div>
        <div class="product-redeem-item">
            <div class="d-flex align-items-center gap-2">
                <i class="bi bi-steam"></i>
            <b>Steam</b>
            </div>
            
            <p>Activated/redeem on <span>Steam</span>, Check <span>activation guide</span></p>
            
        </div>
        <div class="product-redeem-item">
            <div class="d-flex align-items-center gap-2"><i class="bi bi-key"></i>
                <b>Digital key</b></div>
            
            <p>This is a digital edition of the product (CD-KEY)</p>
        </div>
    </div>
    <div class="product-platforms d-flex align-items-center gap-3">
        <span>Works on: </span>
        ${getPlatforms(data.platforms)}
    </div>
    `
}


function getStar(rating) {
    if(rating == 0) {
        return `No rated`
    }
    let result = ''
    let a = Math.floor(rating)
    let b = rating - a
    if(b >= 0.8) {
        b = 1
    }
    else if( b >= 0.2 && b < 0.8) {
        b = 0.5
    }
    else{
        b = 0
    }
    let c = 5 - a - 1
    for(let i = 0; i < a; i++) {
        result += `<i class="bi bi-star-fill"></i>` 
    }
    if(b == 1) {
        result += `<i class="bi bi-star-fill"></i>`
    }
    else if(b == 0.5) {
        result += `<i class="bi bi-star-half"></i>`
    }   
    for(let i = 0; i < c; i++) {
        result += `<i class="bi bi-star"></i>`
    }
    return result
}
function getGenres(genres) {
    let result = ''
    genres.forEach(genre => {
        result += `<span>${genre.name}</span>`
    });
    return result
}
function getPlatforms(platform) {
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
function getMetacritic(metacritic) {
    if(!metacritic) {
        return 0
      }
      return metacritic
}
function getDev(developers) {
    const result = []
    developers.forEach(developer => {
        result.push(developer.name)
    });
    return result.join(', ')
}
function getRatingCount(count,rating) {
    if(rating == 0) {
        return ""
    }
    return `Rated by: ${count} user in RAWG.com`
}
 
function getPrice(rating) {
    if(rating === 0) {
      return 0.99
    }
    return Math.round((rating) * 300)/100
} 
async function getScreenshots(url) {
    const res = await fetch(url)
    const data = await res.json()
    const slider = document.querySelector(".owl-carousel") 
    slider.innerHTML = ""
    data.results.forEach(img => {
        slider.innerHTML += `<div><img class="screenshots-item" src="${img.image}" width="100%"></div>`
    });
    $(document).ready(function () {
        $(".owl-carousel").owlCarousel({
          loop: true,
          margin: 10,
          nav: false,
          dots: true,
          autoplay: true,
          autoplayTimeout: 3500,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 4,
            },
          },
        });
      });
}
getScreenshots(API_IMG)


// more details
function showMoreDetails(data) {
    const moreDetailsArea = document.querySelector(".more-details")
    moreDetailsArea.innerHTML = ""
    moreDetailsArea.innerHTML = `
        <li>
                  <h6>More Details</h6>
                </li>
                <li>
                  <p>Publisher:</p>
                  <span>${getDev(data.publishers)}</span>
                </li>
                <li>
                  <p>Developers:</p>
                  <span>${getDev(data.developers)}</span>
                </li>
                <li>
                  <p>Age:</p>
                  <span>${getAge(data.esrb_rating)}</span>
                </li>
                <li>
                  <p>Released:</p>
                  <span>${data.released}</span>
                </li>
                <li>
                  <p>Updated:</p>
                  <span>${data.updated.slice(0, 10)}</span>
                </li>
            </div>
    `
}
function getAge(age) {
    if(age == null) {
        return "Mature"
    }
    else {
        return age.name
    }
}

// requirement

function getRequirementMinimum(platforms) {
    let result 
   for(let i = 0; i < platforms.length; i++) {
        if(platforms[i].platform.id == 4) {
            if(platforms[i].requirements.length == 0) {
                return "Minimum:<br>Requires a 64-bit processor and operating system<br>OS: Windows 7 - Service Pack 1 (6.1.7601)<br>Processor: Intel® Core™ i5-2500K / AMD FX-6300<br>Memory: 8 GB RAM<br>Graphics: Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB<br>Network: Broadband Internet connection<br>Storage: 150 GB available space<br>Sound Card: Direct X Compatible"
            }
           result = platforms[i].requirements.minimum.split("\n")
        }
   }
   return result.join("<br>")
}
function getRequirementRecommended(platforms) {
    let result 
   for(let i = 0; i < platforms.length; i++) { 
        if(platforms[i].platform.id == 4) {
            if(platforms[i].requirements.length == 0) {
                return "Recommended:<br>Requires a 64-bit processor and operating system<br>OS: Windows 10 - April 2018 Update (v1803)<br>Processor: Intel® Core™ i7-4770K / AMD Ryzen 5 1500X<br>Memory: 12 GB RAM<br>Graphics: Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB<br>Network: Broadband Internet connection<br>Storage: 150 GB available space<br>Sound Card: Direct X Compatible"
            }
           result = platforms[i].requirements.recommended.split("\n")
        }
   }
   return result.join("<br>")
}
function showRequirement(data) {
    const minimumArea = document.querySelector(".minimum")
    const recommendedArea = document.querySelector(".requirement .recommended")
    minimumArea.innerHTML = `
    <p>Minimum:</p>
    <p>Requires a 64-bit processor and operating system<br>OS: Windows 7 - Service Pack 1 (6.1.7601)<br>Processor: Intel® Core™ i5-2500K / AMD FX-6300<br>Memory: 8 GB RAM<br>Graphics: Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB<br>Network: Broadband Internet connection<br>Storage: 150 GB available space<br>Sound Card: Direct X Compatible</p>
    `
    recommendedArea.innerHTML = `
    <p>Recommended:</p>
        <p>Requires a 64-bit processor and operating system<br>OS: Windows 10 - April 2018 Update (v1803)<br>Processor: Intel® Core™ i7-4770K / AMD Ryzen 5 1500X<br>Memory: 12 GB RAM<br>Graphics: Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB<br>Network: Broadband Internet connection<br>Storage: 150 GB available space<br>Sound Card: Direct X Compatible</p>
    `
}


// description
function showMoreDescription() {
    const showMoreDesArea = document.getElementById("show-more-description")
    const desContentArea = document.querySelector(".description-content")
    console.log(showMoreDesArea);
    showMoreDesArea.addEventListener("click", (e) => {
        desContentArea.classList.toggle('active')
    })
}

showMoreDescription()
function showDescription(data) {
    const desContentArea = document.querySelector(".description-content")
    desContentArea.innerHTML = `
      ${data.description}
    `
}
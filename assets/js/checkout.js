const form  = document.getElementById("checkout")
const button = document.getElementById("checkout-btn")
const emailErr = document.querySelector(".email-err")
const nameErr = document.querySelector(".name-err")
const emailInput = document.getElementById("email")
const firstNameInput = document.getElementById("firstName")
const lastNameInput = document.getElementById("lastName")

button.addEventListener("click", (e) => {
    e.preventDefault()
    let formIsValid = true
    let formData = new FormData(form)
    let data = Object.fromEntries(formData)
    console.log(data);
    if(data.email.trim().length === 0) {
        emailErr.classList.add("active")
        formIsValid = false
    }
    if(data.firstName.trim().length === 0) {
        nameErr.classList.add("active")
        formIsValid = false
    }
    if(data.lastName.trim().length === 0) {
        nameErr.classList.add("active")
        formIsValid = false
    }
    if(formIsValid) {
        deleteAllCarts(location.search.slice(6))
    }
    emailInput.addEventListener("focus", (e) => {
        emailErr.classList.remove("active")
    })
    firstNameInput.addEventListener("focus", (e) => {
        nameErr.classList.remove("active")
    })
    lastNameInput.addEventListener("focus", (e) => {
        nameErr.classList.remove("active")
    })
})
async function deleteAllCarts(uid) {
    await fetch(`https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/carts.json`, {
        method: "DELETE",
    })
    reloadPage()
}

async function getCart() {
    let uid = location.search.slice(6);
    const res =  await fetch(`https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/carts.json`)
    const data =  await res.json()
    let i = 0
    
    const product_id_list = []
    const product_quantity = []
    
    for(let key in data) {
      product_id_list.push(key)
      product_quantity.push(data[key])
      i+=data[key]
    }
    
    const cartPopupContentEl = document.getElementById("products")
    const totalPrice = document.querySelector(".total-price")
    const totalQuantity = document.querySelector(".price h6")
    let price = 0
    const productPriceArr = []
    for(let i = 0; i < product_id_list.length; i++) {
        const res1 = await fetch(`https://rawg.io/api/games/${product_id_list[i]}?token&key=26b25919da7f43a3a316e35eb4124cc4&/`)
        const data1 = await res1.json()
        price += getPriceCart(data1)
        cartPopupContentEl.innerHTML += `
          <li class="cart-item">
             <div class = "cart-item-info1">
                <img
                    src= ${data1.background_image}
                    alt=""
                />
                <div class="cart-item-name">
                    <a href="${checkLogin("products")}#${data1.id}"> 
                        ${data1.name}
                    </a>
                </div>
             </div>
             <div class="cart-item-quantity">x<span>${product_quantity[i]}</span></div>
          </li>
        `
        productPriceArr.push(getPriceCart(data1))
    }
    console.log(getTotalPrice(productPriceArr, product_quantity));
    totalPrice.textContent = `€${Math.round((getTotalPrice(productPriceArr, product_quantity) + 0.99)*100)/100}`
    totalQuantity.textContent =`
        Total (${i} product):
    `
}
getCart()
function getPriceCart(id) {
    if(id.rating === 0) {
      return 0.99
    }
    return Math.round((id.rating) * 300)/100
  }
  function checkLogin(page) {
    let uid = window.location.search.split("=")[1];
    if(!uid) {
      return "./login.html"
    }
    else {
      return `./${page}.html?user=${uid}`
    }
}
function getTotalPrice(productArr, quantityArr) {
    let result = 0
    for(let i =0 ; i < productArr.length; i++) {
        result += productArr[i] * quantityArr[i]
    }
    return Math.round(result * 100)/100
  }


// return carts
const returnNav = document.querySelector(".return-carts")
returnNav.addEventListener("click", (e) => {
    location.assign(`${checkLogin("carts")}`)
})





// document.getElementById("open-popup-btn").addEventListener("click",function(){
//   document.getElementById("open-popup-btn").style.display = "none";
//   document.getElementsByClassName("done-container")[0].style.display = "block";
// });
 
// document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
//   document.getElementById("open-popup-btn").style.display = "block";
//   document.getElementsByClassName("popup")[0].classList.remove("active");
// });
function showSuccess() {
    document.getElementsByClassName("popup")[0].classList.add("active");
    document.getElementsByClassName("done-container")[0].style.display = "block";
    document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
        setTimeout(function() {
            // Thay đổi địa chỉ URL của trang để tải lại trang
            location.assign(`${checkLogin("index")}`)
          }, 1000);
        }    
    );
}
const modalLoading = document.querySelector(".modal-loading")
function reloadPage() {
  const currentUrl = `${checkLogin("index")}`;
  modalLoading.style.display = "flex"
  setTimeout(function() {
    // Thay đổi địa chỉ URL của trang để tải lại trang
    // location.assign(currentUrl);
    modalLoading.style.display = "none"
  }, 2000);
  setTimeout(function() {
    showSuccess()
  },2000)

}
let uid = location.search.slice(6);
async function getCart() {
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

    const cartPopupContentEl = document.querySelector(".cart-container")
    const cartPopupTotalPrice = document.querySelector(".total-price")
      let price = 0
    if(!product_id_list.length) {
        cartPopupContentEl.innerHTML = `
        <li class="cart-heading">
            <h6>YOUR CART</h6>
        </li>
        <li class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" class="sHS1HD" style="max-width: 40px; min-width: 40px; height: auto;"><path fill="#FAC917" fill-rule="nonzero" d="M7.5 0a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm1.56 11.62c-.39.16-.7.27-.92.35-.23.08-.5.12-.8.12a1.6 1.6 0 0 1-1.1-.34 1.1 1.1 0 0 1-.38-.87 3.15 3.15 0 0 1 .12-.9l.48-1.7.11-.47c.03-.15.04-.28.04-.4 0-.22-.04-.37-.13-.46-.1-.08-.26-.12-.52-.12-.12 0-.25.01-.38.05L5.24 7l.13-.52c.32-.13.62-.24.9-.33.3-.1.57-.14.83-.14.46 0 .82.11 1.07.34.25.22.38.51.38.87a5.08 5.08 0 0 1-.12.9l-.48 1.7a4.81 4.81 0 0 0-.16.87c0 .23.05.38.16.46.1.09.27.13.52.13a2.26 2.26 0 0 0 .72-.17l-.13.52zm-.08-6.9c-.23.2-.5.3-.81.3-.32 0-.59-.1-.82-.3a1 1 0 0 1-.33-.76 1 1 0 0 1 .33-.76c.23-.21.5-.32.82-.32.31 0 .58.1.8.32a1 1 0 0 1 .34.76 1 1 0 0 1-.33.76z"></path></svg>
        <p>Your shopping cart is empty<a href="${checkLogin("index")}">Go to Homepage</a></p>
        </li>
      `
    }
      
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
                        <p class="product-name-des">Digital product<p>
                    </a>
                    <div class="add-minus">
                        <button class="minus" value="${data1.id}">
                            -
                        </button>
                        <span class="quantity">${product_quantity[i]}</span>
                        <button class="add">
                            +
                        </button>
                    </div>
                </div>
             </div>

            <div class="cart-item-price1">
                <span class="price1-item" price="${getPriceCart(data1)}">€${Math.round(getPriceCart(data1) * product_quantity[i] * 100)/100}</span>
                <span class="trash-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </span> 
            </div>
          </li>
        `
        productPriceArr.push(getPriceCart(data1))
        console.log(product_quantity);
        console.log(productPriceArr);
      
    }
    cartPopupTotalPrice.innerHTML = 
      `
      <h6>SUMMARY</h6>
      <button class="checkout">
        Proceed to checkout
      </button>
      <div class="calc-total">
        <p class="d-flex justify-content-between align-items-center">Products:<span class="price-calc price-main">€${getTotalPrice(productPriceArr, product_quantity)}</span></p>
        <p class="d-flex justify-content-between align-items-center">Service fee: <span class="price-calc">€0.99</span></p>
        <hr>
        <p class="d-flex justify-content-between align-items-center">Total: <span class="price-calc price-main">€${Math.round((getTotalPrice(productPriceArr, product_quantity) + 0.99) * 100)/100}</span></p>
      </div>
      <div class="d-flex justify-content-between">
        <input type="text" name="" id="discount-code" placeholder="Enter code">
        <button class="discount-code-submit">Submit</button>
      </div>
      `
    addAndMinus()
    deleteCart()
    cartRedirect()
  }

  function getTotalPrice(productArr, quantityArr) {
    let result = 0
    for(let i =0 ; i < productArr.length; i++) {
        result += productArr[i] * quantityArr[i]
    }
    return Math.round(result * 100)/100
  }
  function getTotalQuantity(quantityArr) {
    let result = 0
    for(let i = 0; i < quantityArr.length; i++) {
        result += quantityArr 
    }
    return result
  }
  function getPriceCart(id) {
    if(id.rating === 0) {
      return 0.99
    }
    return Math.round((id.rating) * 300)/100
  }
  getCart()
  
  function checkLogin(page) {
    let uid = window.location.search.split("=")[1];
    if(!uid) {
      return "./login.html"
    }
    else {
      return `./${page}.html?user=${uid}`
    }
}
function updateQuantity(uid, key , value) {
    fetch(`https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/carts/${key}.json`, {
      method: "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    });
}
async function deleteProduct(uid,key) {
    await fetch(`https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/carts/${key}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload()
}
// deleteProduct(uid, 3328)
function addAndMinus() {
    const add = document.querySelectorAll(".add")
    const minus = document.querySelectorAll(".minus")
    const quantity = document.querySelectorAll(".quantity")
    const price = document.querySelectorAll(".price1-item")
    const totalPrice = document.querySelectorAll(".price-main")
    for(let i = 0; i < minus.length; i++) {
        let a = Number(quantity[i].textContent) 
        let b = Number(price[i].getAttribute("price")) 
        
        minus[i].addEventListener("click", (e) => {
            let total0 = Number(totalPrice[0].textContent.trim().slice(1))
            let total1 = Number(totalPrice[0].textContent.trim().slice(1))
            if(a === 1) {
                return
            }
            else {
                a--
                price[i].innerHTML = `€${Math.round(a * b * 100)/100}`
                quantity[i].textContent = a
                updateQuantity(uid, minus[i].value, a)
                totalPrice[0].textContent = `€${Math.round((total0 - b)*100)/100}`
                totalPrice[1].textContent = `€${Math.round((total1 - b +0.99)*100)/100}`
            }
        })
        add[i].addEventListener("click", (e) => {
            let total0 = Number(totalPrice[0].textContent.trim().slice(1))
            let total1 = Number(totalPrice[0].textContent.trim().slice(1))
            a++
            price[i].innerHTML = `€${Math.round(a * b * 100)/100}`
            quantity[i].textContent = a
            updateQuantity(uid, minus[i].value, a)
            totalPrice[0].textContent = `€${Math.round((total0 + b)*100)/100}`
            totalPrice[1].textContent = `€${Math.round((total1 + b+ 0.99)*100)/100}`
        })
    }
}
function updateTotalPrice() {
    
}
function deleteCart() {
    const delete1 = document.querySelectorAll(".trash-icon")
    const minus = document.querySelectorAll(".minus")
    const ul = document.querySelector(".cart-container")
    const modal = document.querySelector(".modal")
    const close = document.querySelector(".close-modal")
    const accept = document.querySelector(".accept-modal")
    const xClose = document.querySelector(".close")
    for(let i= 0; i < delete1.length; i++) {
        delete1[i].addEventListener("click", (e) => {
            modal.classList.add("active")
            accept.addEventListener("click", (e) => {
                deleteProduct(uid,minus[i].value)
                checkItem(ul)
            })
            close.addEventListener("click", (e) => {
                modal.classList.remove("active")
                checkItem(ul)
                return
            })
            xClose.addEventListener("click", (e) => {
                modal.classList.remove("active")
                checkItem(ul)
                return
            })
            // if(confirm("Are you sure you want to delete this product")) {
            //     deleteProduct(uid,minus[i].value)
            //     let liItem = delete1[i].closest("li")
            //     liItem.remove();
            //     checkItem(ul)
            // }
            // else {
            //     return
            // }
        })
    }
}
function checkItem(element1) {
    if(element1.textContent.trim() === `YOUR CART`) {
        element1.innerHTML += `
        <li class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" class="sHS1HD" style="max-width: 40px; min-width: 40px; height: auto;"><path fill="#FAC917" fill-rule="nonzero" d="M7.5 0a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm1.56 11.62c-.39.16-.7.27-.92.35-.23.08-.5.12-.8.12a1.6 1.6 0 0 1-1.1-.34 1.1 1.1 0 0 1-.38-.87 3.15 3.15 0 0 1 .12-.9l.48-1.7.11-.47c.03-.15.04-.28.04-.4 0-.22-.04-.37-.13-.46-.1-.08-.26-.12-.52-.12-.12 0-.25.01-.38.05L5.24 7l.13-.52c.32-.13.62-.24.9-.33.3-.1.57-.14.83-.14.46 0 .82.11 1.07.34.25.22.38.51.38.87a5.08 5.08 0 0 1-.12.9l-.48 1.7a4.81 4.81 0 0 0-.16.87c0 .23.05.38.16.46.1.09.27.13.52.13a2.26 2.26 0 0 0 .72-.17l-.13.52zm-.08-6.9c-.23.2-.5.3-.81.3-.32 0-.59-.1-.82-.3a1 1 0 0 1-.33-.76 1 1 0 0 1 .33-.76c.23-.21.5-.32.82-.32.31 0 .58.1.8.32a1 1 0 0 1 .34.76 1 1 0 0 1-.33.76z"></path></svg>
        <p>Your shopping cart is empty <a href="${checkLogin("index")}"> Go to Homepage</a></p>
        </li>
      `
    //   element2.innerHTML
    }
}   


// carts redirect
function cartRedirect() {
    const checkoutBtn = document.querySelector(".checkout")
    checkoutBtn.addEventListener("click", (e) => {
    window.location.assign(`${checkLogin("checkout")}`)
})
}



// redirect to index
const logo = document.querySelector(".logo")
logo.addEventListener("click", (e) => {
    let uid = window.location.search.split("=")[1];
    if(!uid) {
      window.location.assign("./index.html")
    }
    else {
      window.location.assign(`./index.html?user=${uid}`)
    }
  } )
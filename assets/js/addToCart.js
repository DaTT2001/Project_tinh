const modalLoading = document.querySelector(".modal-loading")
function reloadPage() {
  const currentUrl = location.href;
  modalLoading.style.display = "flex"
  setTimeout(function() {
    // Thay đổi địa chỉ URL của trang để tải lại trang
    location.assign(currentUrl);
  }, 1000);
}

function addToCart() {
    const addToCartIcon = document.querySelectorAll(".add-to-cart")
    const product_list = document.querySelectorAll(".product-card > a")
    let uid = location.search.slice(6);
    console.log(addToCartIcon);
    for(let i = 0; i < addToCartIcon.length; i++) {
        addToCartIcon[i].addEventListener("click", (e) => {
            const newKey = product_list[i].hash.slice(1)
            const newValue = 1
            postCartToFirebase(uid, newKey, newValue)
        })  
    }
}


async function postCartToFirebase(uid, key , value) {
    if(!uid) {
        window.location.assign("./login.html")
    }
    else {
        await fetch(`https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/carts.json`, {
      method: "PATCH",
      body: JSON.stringify({[key]: value}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    reloadPage()
    }
}

            
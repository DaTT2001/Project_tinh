var option = 
    {
        animation : true,
        delay : 1500
    };
            
function Toasty()
    {
        var toastHTMLElement = document.getElementById( 'EpicToast' );        
        var toastElement = new bootstrap.Toast( toastHTMLElement, option );  
        toastElement.show( );
    }

function addToCart() {
    const addToCartIcon = document.querySelectorAll(".add-to-cart")
    const product_list = document.querySelectorAll(".product-card > a")
    let uid = location.search.slice(6);
    for(let i = 0; i < addToCartIcon.length; i++) {
        addToCartIcon[i].addEventListener("click", (e) => {
            console.log(product_list[i].hash.slice(1));
            const newKey = product_list[i].hash.slice(1)
            const newValue = 1
            postCartToFirebase(uid, newKey, newValue)
            addToCartIcon[i].style.color = "#FAD322"
            Toasty()
        })
    }
}

function postCartToFirebase(uid, key , value) {
    fetch(`https://main-project-28ab6-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/carts.json`, {
      method: "PATCH",
      body: JSON.stringify({[key]: value}),
      headers: {
        "Content-Type": "application/json",
      },
    });
}

            
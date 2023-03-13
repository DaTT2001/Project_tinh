 const password = document.getElementById("password")
    const email = document.getElementById("email")
    const confirmPassword = document.getElementById("confirmpassword")
    const check = document.getElementById("check")
    const signUp = document.querySelector(".sign-up-button")
    const formValidate = document.querySelector(".signup-content")
    const passwordErr = document.querySelector(".password-err")
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDcN3NihhpaG0OBZKc-WKsia-vnL7wtEzI",
      authDomain: "main-project-379f6.firebaseapp.com",
      databaseURL: "https://main-project-379f6-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "main-project-379f6",
      storageBucket: "main-project-379f6.appspot.com",
      messagingSenderId: "829527450691",
      appId: "1:829527450691:web:ef978c111cf2deee39a0f6"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth()
formValidate.addEventListener("submit",(e) => {
    e.preventDefault()
    let formIsValid = true
    const formData = new FormData(formValidate)
    const  data = Object.fromEntries(formData)
    console.log(data);
    if(data.password.trim().length === 0) {
        passwordErr.classList.add("active")
        passwordErr.textContent = "Không được để trống"
        formIsValid = false
    }
    if(data.password.trim().length < 6 || data.password.trim().length > 14) {
        passwordErr.classList.add("active")
        passwordErr.textContent = "Vui lòng nhập đúng yêu cầu"
        formIsValid = false
    }
    if(data.password.trim() !== data.confirmPassword.trim()) {
        passwordErr.classList.add("active")
        passwordErr.textContent = "Vui lòng nhập đúng yêu cầu"
        formIsValid = false
    }
    if(formIsValid) {
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
        const user = userCredential.user;
        // ...
        alert("done")
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert(errorMessage)
        });
    }
})
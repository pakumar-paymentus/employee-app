// const axios = require("axios");

let typedEmail;
let typedPassword;
const SELECTOR = {
    passField : document.querySelector(".password"),
    showBtn : document.querySelector(".show"),
    loginBtn : document.querySelector("input[type = 'submit']"),
    
}

SELECTOR.showBtn.addEventListener("click", () => {
    if(SELECTOR.passField.type == "password"){
        SELECTOR.passField.type = "text";
        SELECTOR.showBtn.textContent = "HIDE"; 
    }else{
        SELECTOR.passField.type = "password";
        SELECTOR.showBtn.textContent = "SHOW"
    }
 });


SELECTOR.loginBtn.addEventListener("click", (event) => {
    // event.preventDefault();
    console.log("login button was pressed");
    typedEmail = document.getElementsByClassName("email")[0].value;
    typedPassword = document.getElementsByClassName("password")[0].value;
    
    console.log(typedEmail);
    console.log(typedPassword);
    const userData = {email: typedEmail, password : typedPassword};

    // Example POST method implementation:
    postData = async (url, userData) => {
    // Default options are marked with *
     const res = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
      body: JSON.stringify(userData) // body data type must match "Content-Type" header
    });
    // console.log(res);
    return res// parses JSON response into native JavaScript objects
    
  }

  postData("/auth", userData)
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    })
    .catch(err => {
        console.log(err);
    })
})



const SELECTOR = {
  PASS_FIELD: document.querySelector("#password"),
  SHOW_BTN: document.querySelector(".show"),
  LOGIN_BTN: document.querySelector("input[type = 'submit']"),

}

SELECTOR.SHOW_BTN.addEventListener("click", () => {
  if (SELECTOR.PASS_FIELD.type == "password") {
    SELECTOR.PASS_FIELD.type = "text";
    SELECTOR.SHOW_BTN.textContent = "HIDE";
  } else {
    SELECTOR.PASS_FIELD.type = "password";
    SELECTOR.SHOW_BTN.textContent = "SHOW"
  }
});

login = () => {
  // event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
 

  loginApi(email, password)
    .then(userObj => {
      if (userObj.status){

        window.localStorage.setItem('token', userObj.accessToken);
        window.location.href = "../homepage/home.html";
        // requestHomePage(window.localStorage.getItem("token"))
        // .then(() => console.log("login successfully"))
        // .catch(err => console.log(err))
      }
    })
    .catch(err => {
      console.log("something went wrong try after some time" + err);
    })
  }

//  user data is passing to 
loginApi =  (email, password) => {
  const userData = {
    email: email,
    password: password
  }
  // Default options are marked with *
   return fetch("/auth", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'credentials' : 'same-origin'
    },
    body: JSON.stringify(userData),

  })
  .then( (res) => {
    return res.json();
  })
  // .catch( err => console.log(err))
  // console.log(res);

}

// requestHomePage = (token) => {
//   console.log(tokenObj);
//   return fetch("/home", {
//     method: "GET",
//     headers : {   
//       'content-Type' : 'application/json',
//       'token' : token
//     }
//   })
//   .then(res => {
//     return res.json();
//   })
// }

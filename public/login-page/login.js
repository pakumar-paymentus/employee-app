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
  // console.log(email);
  // console.log(password);

  loginApi(email, password)
    .then(userObj => {
      if (userObj.status){
        console.log(userObj);
        window.localStorage.setItem('user', userObj.accessToken);
        // console.log(JSON.parse(window.localStorage.getItem('user')).accessToken);
        window.location.href = "../homepage/home.html";
      }
    })
    .catch(err => {
      console.log("something went wrong try after some time" + err);
    })
  }

//  user data is passing to 
loginApi =  (email, password) => {
  const userData = {
    "email": email,
    "password": password
  }
   return fetch("/api/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),

  })
  .then( (res) => {
    return res.json();
  })
  // .catch( err => console.log(err))
  // console.log(res);
 

}



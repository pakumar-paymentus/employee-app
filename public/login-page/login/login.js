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
  console.log(email);
  console.log(password);

  loginApi(email, password)
    .then(statusObj => {
      console.log(statusObj);
      //go to home page
      //redirect here
    })
    .catch(err => {
      console.log("something went wrong " + err);
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
    redirect: "error"
  })
  .then( (res) => {
    return res.json();
  })
  // .catch( err => console.log(err))
  // console.log(res);
 

}



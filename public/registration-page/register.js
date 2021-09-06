    register = (event) => {
    event.preventDefault();
    // const firstName = document.getElementById("first-name").value;
    // const lastName = document.getElementById("last-name").value;
    // const email = document.getElementById("email").value;
    // const password = document.getElementById("password").value;
    // const conformPassword = document.getElementById("conform-password").value;
    // const age = document.getElementById("age").value;
    // const gender = document.getElementById("gender").value;
    // const mobile = document.getElementById("mobile").value;
    // console.log(firstName);
    // console.log(lastName);
    console.log("come from register.html");
  
    registerApi("a", "a", "a@gmail.com", "12", "12", "23", "male", "244244424")
      .then((value) => console.log("okay" + value))
      .catch((err) => console.log("not ok" + err));
  }
  
  //  user data is passing to 
  registerApi = (firstName, lastName, email, password, conformPassword, age, gender, mobile) => {
    const userData = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "conformPassword": conformPassword,
      "age": age,
      "gender": gender,
      "mobile": mobile
    }
  

  fetch("/register",{
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userData),
})
.then(res => {
  console.log(res.json);
  return res.json()
})

.catch((error) => {
  console.error('Error:', error);
});
}


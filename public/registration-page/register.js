const SELECTOR = {
  PASS_FIELD: document.querySelector("#password"),
  SHOW_BTN: document.querySelector(".show")

}


register = () => {
  // event.preventDefault();
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const conformPassword = document.getElementById("conform-password").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const mobile = document.getElementById("mobile").value;

  registerApi(firstName, lastName, email, password, conformPassword, age, gender, mobile)
    .then((status) => console.log("okay" + status))
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
  // Default options are marked with *
  return fetch("/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'credentials': 'same-origin'
    },
    body: JSON.stringify(userData)

  })
    .then((res) => {
      return res.json();
    })
    .catch(err => console.log(err))
  // console.log(res);
}


// const login_cred = JSON.parse(fs.readFileSync("../login-data.json"));
// console.log(login_cred);
const SELECTOR = {
    passField : document.querySelector(".password"),
    showBtn : document.querySelector(".show"),
    loginBtn : document.querySelector("input[type = 'submit']")
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


let passField = document.querySelector(".password");
let showBtn = document.querySelector(".show");

showBtn.addEventListener("click", function(){
    if(passField.type == "password"){
        passField.type = "text";
        showBtn.textContent = "HIDE"; 
    }else{
        passField.type = "password";
        showBtn.textContent = "SHOW"
    }
});
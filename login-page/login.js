

const SELECTOR = {
    passField : document.querySelector(".password"),
    showBtn : document.querySelector(".show")
}

SELECTOR.showBtn.addEventListener("click", function(){
    if(SELECTOR.passField.type == "password"){
        SELECTOR.passField.type = "text";
        SELECTOR.showBtn.textContent = "HIDE"; 
    }else{
        SELECTOR.passField.type = "password";
        SELECTOR.showBtn.textContent = "SHOW"
    }
 });

 
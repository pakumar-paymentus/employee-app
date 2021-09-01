logout = () => {
    // event.preventDefault();

    logoutApi(window.localStorage.getItem('token'))      //send server the access tien from local Storage
    .then(authStatus => {
        if(authStatus){
            window.localStorage.removeItem('token');     //remove token from local storage before logout
            window.location.href = "../login/login.html";       //after logout redirected to homepage
        }
    }).catch(err => console.log("something went wrong try after some time" + err));
}

logoutApi = (accessToken) => {
    const tokenObj = {"token" : accessToken};
    return fetch("/logout", {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(tokenObj)
    })
    .then( (res) => {
        return res.json();
    })
}
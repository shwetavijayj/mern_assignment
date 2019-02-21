class LogOutService {
    logout(callback){
        fetch("http://localhost:8080/logout",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("authorization"),
                    "UserId":sessionStorage.getItem("UserId")
                },
            }).then(response => response.json())
            .then(resData => {
                callback(null,{'data':resData});
            });
    }
    hello(){
        console.log("Hello");
    }
}

export default LogOutService;
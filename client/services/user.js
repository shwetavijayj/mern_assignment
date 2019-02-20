class userService {
    authenticateUser(UserData, callback) {
        console.log("userdata", UserData);
        fetch("http://localhost:8080/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserData)
            }).then(response => response.json())
            .then(resData => {
                console.log("Updated User details", JSON.stringify(resData))
                callback(null, JSON.stringify(resData))
            });

    }
    getUserData(UserData) {
        let promise = fetch("http://localhost:8080/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserData)
            });
        console.log("promise", promise);
        return promise;
    }
    updateUserData(UserData){
        fetch("http://localhost:8080/users/updateUserTemp",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserData)
            }).then(response => response.json())
            .then(resData => {
                callback(null,{'Flag':'True'});
            });
    }

}

export default userService;
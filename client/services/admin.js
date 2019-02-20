class adminService{
    createUser(newUserData,callback){
        console.log(newUserData);
        fetch("http://localhost:8080/users/createUser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUserData)
            }).then(response => response.json())
            .then(resData => {
                callback(null,{'Flag':'True'});
            });
    }
    getUserData(callback){
        fetch("http://localhost:8080/users/getTemporaryUsers",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json())
            .then(resData => {
                console.log("result",resData);
                callback(null,{'result':resData});
            });
        
    } 
    saveData(userData,callback){
        fetch("http://localhost:8080/users/registerUser",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then(response => response.json())
        .then(resData => {
            console.log("result",resData);
            callback(null,{'result':resData});
        }); 
    }
    rejectData(userData,callback){
        fetch("http://localhost:8080/users/rejectUserRequest",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then(response => response.json())
        .then(resData => {
            console.log("result",resData);
            callback(null,{'result':resData});
        }); 
    }
    createRole(newRole,callback){
        fetch("http://localhost:8080/users/userRole",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newRole)
            }).then(response => response.json())
            .then(resData => {
                callback(null,{'Flag':'True'});
            });
    }
    getAllUserRole(callback){
        fetch("http://localhost:8080/users/getUserRole",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => response.json())
            .then(resData => {
                callback(null,{'data':resData});
            });
    }
}

export default adminService;
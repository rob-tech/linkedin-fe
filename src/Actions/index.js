export const handleProfiles = () => {
    return async (dispatch, getState) => {
        var headers = new Headers({
            "Authorization": 'Basic dXNlcjc6M1VVNWRZRnZlblJ1UlA3RQ==',
        });
        var response = await fetch("http://localhost:3000/profile/user7" , {
            method: "GET", headers: headers
        })
        if (response.ok) {
            var userProfile = await response.json();

        }

        console.log(userProfile)

        dispatch({
            type: "USER_PROFILE",
            payload: userProfile
        });
    }
}

export const handleAllProfiles = () => {
    return async (dispatch, getState) => {
        var headers = new Headers({
            "Authorization": 'Basic dXNlcjc6M1VVNWRZRnZlblJ1UlA3RQ==',
        });
        var response = await fetch("https://striveschool.herokuapp.com/api/profiles/", {
            method: "GET", headers: headers
        })
        if (response.ok) {
            var allProfiles = await response.json();
        }

        console.log(allProfiles)

        dispatch({
            type: "ALL_PROFILES",
            payload: allProfiles
        });
    }
}

export const handleExperience = () => {
    return async (dispatch, getState) => {
        var headers = new Headers({
            "Authorization": 'Basic dXNlcjc6M1VVNWRZRnZlblJ1UlA3RQ==',
        });
        var response = await fetch("https://striveschool.herokuapp.com/api/profiles/user7/experiences", {
            method: "GET", headers: headers
        })
        if (response.ok) {
            var userExperiences = await response.json();

        }

        console.log(userExperiences)

        dispatch({
            type: "USER_EXPERIENCES",
            payload: userExperiences
        });
    }

}

export const getFeeds = () => {
    return async (dispatch, getState) => {
        var headers = new Headers({
            "Authorization": 'Basic dXNlcjc6M1VVNWRZRnZlblJ1UlA3RQ==',
        });
        var response = await fetch("http://localhost:3000/feeds ", {
            method: "GET", headers: headers
        })
        if (response.ok) {
            var userFeeds = await response.json();

        }

        console.log(userFeeds)

        dispatch({
            type: "USER_FEEDS",
            payload: userFeeds
        });
    }

}

export const postFeeds = (message) => {
    return async (dispatch, getState) => {
        // var headers = new Headers({
        //     "Authorization": 'Basic dXNlcjc6M1VVNWRZRnZlblJ1UlA3RQ==',
        //     "Content-Type": "application/json"
        // });
        var token = localStorage.getItem("accessToken");
        if(token){
        var response = await fetch("http://localhost:3000/feeds ", {
            method: "POST", 
            // headers: headers, 
            body: JSON.stringify({text: message})

        })
        var postFeeds = response.ok ? await response.json() :null
    
    
        console.log(postFeeds)

        dispatch({
            type: "POST_FEEDS",
            payload: postFeeds
        });
    }
}

}
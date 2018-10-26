export function setUserId(userId) {
    return {
        type:"SET_USER_ID",
        userId: userId
    }
}

export function setCookies(cookies){
    return {
        type:"SET_COOKIES",
        cookies:cookies
    }
};

export function setNavigation(navigation) {
    return {
        type:"SET_NAVIGATION",
        navigation:navigation
    }
};
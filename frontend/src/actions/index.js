//actions to sent information to the store
export function setUserId(userId) {
    return {
        type:"SET_USER_ID",
        userId: userId
    }
}
export function setProjectId(projectId){
    return {
        type:"SET_PROJECT_ID",
        projectId:projectId
    }
}
export function setSideBar(sideBarOpen){
    return {
        type:"SET_SIDEBAR",
        sideBarOpen:sideBarOpen
    }
};
export function setUser(user){
    return {
        type:"SET_USER",
        user:user
    }
};

export function setProject(projectAll) {
    return {
        type:"SET_PROJECT_ALL",
        projectAll:projectAll
    }
};
export function setFilter(filter){
    return {
        type:"SET_FILTER",
        filter:filter
    }
};
export function setCookies(cookies){
    return {
        type:"SET_COOKIES",
        cookies:cookies
    }
};
export function setLoading(isLoadingProject) {
    return{
        type:"SET_LOADING",
        isLoadingProject:isLoadingProject
    }
};
export function setNavigation(navigation) {
    return {
        type:"SET_NAVIGATION",
        navigation:navigation
    }
};
export function setAuth(isAuth) {
    return {
        type:"SET_AUTHENTICATION",
        isAuth:isAuth
    }
}
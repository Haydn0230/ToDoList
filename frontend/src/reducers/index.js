export default (state, action) => {
    switch (action.type) {
        case "SET_PROJECT":
            return {
                ...state,
                project:action.project
            };
        case "SET_USER_ID":
            return {
                ...state,
                userId:action.userId
            };
        case "SET_COOKIES":
            return {
                ...state,
                cookies:action.cookies
            };
        case "SET_NAVIGATION":
            return {
                ...state,
                navigation:action.cookies
            }
        case "SET_AUTHENTICATION":
            return {
                ...state,
                isAuth:action.isAuth
            }
        default:
            return state;
    }
}
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
        default:
            return state;
    }
}
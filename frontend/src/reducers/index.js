//reducers write the action to the store
export default (state, action) => {
    switch (action.type) {
        case "SET_PROJECT_ID":
            return {
                ...state,
                projectId: action.projectId
            };
        case "SET_USER_ID":
            return {
                ...state,
                userId: action.userId
            };
        case "SET_COOKIES":
            return {
                ...state,
                cookies: action.cookies
            };
        case "SET_NAVIGATION":
            return {
                ...state,
                navigation: action.cookies
            };
        case "SET_FILTER":
            return {
                ...state,
                filter:action.filter
            };
        case "SET_SIDEBAR":
            return {
                ...state,
                sideBarOpen: action.sideBarOpen
            };
        case "SET_PROJECT_ALL":
            return {
                ...state,
                projectAll: action.projectAll
            };
        case "SET_AUTHENTICATION":
            return {
                ...state,
                isAuth: action.isAuth
            };
        case "SET_USER":
            return {
                ...state,
                user: action.user
            };
        case "SET_LOADING":
            return {
                ...state,
                isLoadingProject: action.isLoadingProject
            };
        case "SET_PROJECT_ONE":
            //returns a single project by comparing ID
            let project = state.projectAll.filter(projects => {
                return action.projectId === projects._id
            })
            return {
                ...state,
                projectOne: project
            };
        case "UPDATE_PROJECT_ONE":
            return {
                ...state,
                projectOne: action.projectOne
            };
        case "ADD_LIST_ITEM":
            return {
                ...state,
                'projectOne[0].listItem': [...action.listItem]
            };

        //creates new array based on ID to overwrite list items
        case "DELETE_LIST_ITEM":
            let listItems = state.projectOne[0].listItem.filter(listItem => {
                return action._id !== listItem._id
            });
            return {
                ...state,
                'project.listItem': listItems

            };

        default:
            return state;
    }
}
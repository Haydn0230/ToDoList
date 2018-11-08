export default (state, action) => {
    console.log("Reducer called");
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
            //loops throught the projects to find 
            //the project id equal to action.projectId
            let project = state.projectAll.filter(projects => {
                console.log("PROJECT __ ", projects)
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
            console.log("1 state.projectOne.listItem", state.projectOne[0].listItem, "ACTION ", action.listItem)
            //this function is rewriting the projectone state to only hold the list item causing it to break.
            //need to find a way to create a new state, then append the new list item onto it
            return {
                ...state,
                'projectOne[0].listItem': [...action.listItem]
            };

        //loops through the project.listItem to evaluate listItemId by action.listItemID
        //places all those not equal to listItem.id into a new array
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
export default (state, action) => {
    console.log("STATE", state, "ACTION", action);
    switch (action.type) {
        case "SET_PROJECT_ID":
            return {
                ...state,
                projectId:action.projectId
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
            };
        case "SET_PROJECT_ALL":
            return {
                ...state,
                projectAll:action.projectAll
            };
        case "SET_AUTHENTICATION":
            return {
                ...state,
                isAuth:action.isAuth
            };
        case "SET_LOADING":
            return {
                ...state,
                isLoadingProject:action.isLoadingProject
            };
        case "SET_PROJECT_ONE":
            let project = state.project.filter(projects =>{
                return action.projectId ===projects.project._id
            })
            return {
                ...state,
                project:project
            }
        case "DELETE_LIST_ITEM":
            let listItems  = state.project.listItem.filter(listItem => {
                console.log("1",listItem._id,"2",action._id)
                return action._id !== listItem._id
            });
            console.log("NEW LIST ITEMS",listItems)
            return {
                ...state,
                'project.listItem':listItems
                
            }

        default:
            return state;
    }
}
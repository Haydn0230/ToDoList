import reducer from '../reducers'
import {createStore, compose} from 'redux'


//used to talk to google chrome redux extension
const enhancers = compose(
window.devToolsExtension ? window.devToolsExtension() : f => f
);

//set intial store
const intialState ={
    sideBarOpen:false,
    userId:"",
    filter:'ALL',
    user:[],
    projectId:"",
    isAuth:false,
    cookies:[],
    navigation:[],
    projectAll:[],
    projectOne:[],
    isLoadingProject:true
};


const store = createStore(reducer, intialState,  enhancers);

export default store;
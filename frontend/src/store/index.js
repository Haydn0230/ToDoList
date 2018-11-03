import reducer from '../reducers'
import {createStore, compose} from 'redux'



const enhancers = compose(
window.devToolsExtension ? window.devToolsExtension() : f => f
);

const intialState ={
    userId:"",
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
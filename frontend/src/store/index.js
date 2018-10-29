import reducer from '../reducers'
import {createStore} from 'redux'
import {compose} from 'redux'

const enhancers = compose(
window.devToolsExtension ? window.devToolsExtension() : f => f
);

const intialState ={
    userId:"",
    projectId:"",
    isAuth:false,
    cookies:[],
    navigation:[]
};
const store = createStore(reducer, intialState, enhancers);

export default store;
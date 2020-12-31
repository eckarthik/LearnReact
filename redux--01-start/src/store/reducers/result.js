import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

const initialState = {
    results: []
}

const reducer = (state = initialState,action) => {
    if(action.type === actionTypes.STORE_RESULT) 
        return updateObject(state,{results: state.results.concat({id: new Date(),value:action.result})})
    else if(action.type === actionTypes.DELETE_RESULT) {
       const updatedResults = state.results.filter(result => result.id !== action.id);
       return updateObject(state, {results:updatedResults})
    }
    return state;
}

export default reducer;
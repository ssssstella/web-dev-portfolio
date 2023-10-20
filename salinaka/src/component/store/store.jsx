import {createStore} from 'redux';

let store = createStore(reducer);

function reducer(state={search: ''}, action) {
    let newState = { ...state };

    switch(action.type) {
        case 'search':
            newState.search = action.value;
            return newState
        default :
            return newState
    }
}

export default store;
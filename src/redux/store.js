import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import loading from './reducers/loading';
import dialog from './reducers/dialog';
import toaster from './reducers/toaster';

export const getReduxData = (name) => {
    try {            
        const resp = (store).getState()[name];
        return resp?.data !== undefined ? resp.data : resp;
    } catch (error) {
        return null;
    } 
}

export const setReduxData = (functionName, data) => {
    try {                    
        store.dispatch({type: functionName, payload: data});
    } catch (error) {
        console.error('setReduxData', functionName, error);
    } 
}

export const loadState = () => {
    try {
        return JSON.parse(localStorage.getItem('transportes.state') || "");
    } catch (error) {
        return undefined;
    }
}

const saveState = (state) => {
    try {
        localStorage.setItem('transportes.state', JSON.stringify(state));
    } catch (error) {
        return;
    }
}

const reducer = combineReducers({
    toaster, 
    loading,
    dialog
});

const initialData = loadState();

const store = createStore(reducer,
    initialData,
    composeWithDevTools(), /* para la extensión de chrome de Redux */
);

store.subscribe(() => {
    saveState({
        // subscription: store.getState().subscription,
    });
});

export default store;

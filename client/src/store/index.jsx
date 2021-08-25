import {createStore, applyMiddleware} from 'redux';
import  {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'; // trabajar con promesas - funciones asincronas
import rootReducer from '../reducer';

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
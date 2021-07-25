import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import beerReducer from './beerSlice';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = createStore(beerReducer, composedEnhancer);

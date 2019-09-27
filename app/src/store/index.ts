import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import homeStore from './home/reducer';
import Home from './home/type';

const loggerMiddleware = createLogger();

export const store = createStore(
  combineReducers({homeStore}),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export interface RootState{
    homeStore: Home
};
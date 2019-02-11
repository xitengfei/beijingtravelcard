import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import homeStore from '@/pages/Home/redux/reducer'

const loggerMiddleware = createLogger()

const preloadedState = {}

const store =  createStore(
    combineReducers({
        homeStore,
    }),
    preloadedState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

export default store
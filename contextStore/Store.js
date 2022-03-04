import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './Reducers/User'
import { FriendsReducer } from './Reducers/Friends'
import { GroupReducer } from './Reducers/Group'
const rootReducer = combineReducers({ userReducer, FriendsReducer, GroupReducer })
export const Store = createStore(rootReducer, applyMiddleware(thunk))
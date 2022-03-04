import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './Reducers/User'
import { FriendsReducer } from './Reducers/Friends'
import { GroupReducer } from './Reducers/Group'
import { ExpenseReducer } from './Reducers/Expense'
const rootReducer = combineReducers({ userReducer, FriendsReducer, GroupReducer, ExpenseReducer })
export const Store = createStore(rootReducer, applyMiddleware(thunk))
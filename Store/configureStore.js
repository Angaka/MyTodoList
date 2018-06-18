import { createStore } from 'redux'
import { combineReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import toggleTask from './Reducers/taskReducer'

export default createStore(toggleTask)

import { createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import toggleTask from './Reducers/taskReducer'

const rootPersistConfig = {
	key: 'root',
	storage
}

export default createStore(persistReducer(rootPersistConfig, toggleTask))

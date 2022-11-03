import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { isProd } from '@/utils'

// 引入每一个reducer
import globalReducer from './reducer/globalReducer'

// 创建reducer对象
const allReducer = {
	globalReducer,
}

// 持久化配置
const persistConfig = {
	key: 'root',
	storage,
	// 需要缓存的reducer
	whitelist: ['globalReducer'],
	// 不需要缓存的reducer
	blackList: [],
}

const rootReducer = combineReducers(allReducer)
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	// 正式环境禁用开发者工具
	devTools: !isProd(),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export type RootState = ReturnType<typeof store.getState>

export const persist = persistStore(store)
export default store

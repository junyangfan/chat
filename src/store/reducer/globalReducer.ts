import { createSlice } from '@reduxjs/toolkit'

// 定义初始化数据
const initialState: IGlobal = {
	token: '',
}

// 定义一个切片
const globalSlice = createSlice({
	// slice的名称
	name: 'global',
	// state的初始值
	initialState,
	reducers: {
		setToken: (state, { payload }) => {
			state.token = payload
		},
		// 初始化状态
		resetGlobal: () => initialState,
	},
})

// 提取action creator 对象与reducer函数
const { reducer, actions } = globalSlice

// 导出action
export const { setToken, resetGlobal } = actions

// 默认导出，导出的文件需要在store入口文件引入
export default reducer

interface IGlobal {
  token: string
}

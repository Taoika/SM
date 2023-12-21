import { configureStore } from '@reduxjs/toolkit'
import userInfo from './slice/userInfo' // 自己写的切片

export const store = configureStore({
  reducer: {
    userInfo,
  },
})

// 返回store的方法getState的类型
export type RootState = ReturnType<typeof store.getState>

// 拿到store的dispatch方法的类型
export type AppDispatch = typeof store.dispatch
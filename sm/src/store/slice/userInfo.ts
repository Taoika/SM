import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..';

const initialState = {
    userId: '',
    username: '',
    phone: '',
    address: '',
    permission: '',
    store: <any[]>[],
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setPermission: (state, action: PayloadAction<string>) => {
            state.permission = action.payload;
        },
        setStore: (state, action: PayloadAction<any[]>) => {
            state.store = action.payload;
        }
    },
});

export const { setUsername, setPhone, setAddress, setUserId, setStore } = userInfoSlice.actions

export const selectUserInfo = (state: RootState) => {
    const { username, phone, address, userId, permission, store } = state.userInfo;
    return { username, phone, address, userId, permission, store } ;
}

export default userInfoSlice.reducer
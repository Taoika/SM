import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..';

const initialState = {
    username: '',
    phone: '',
    address: ''
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
        }
    },
});

export const { setUsername, setPhone, setAddress } = userInfoSlice.actions

export const selectUserInfo = (state: RootState) => {
    const { username, phone, address } = state.userInfo;
    return { username, phone, address } ;
}

export default userInfoSlice.reducer
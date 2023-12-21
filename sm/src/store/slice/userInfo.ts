import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..';

const initialState = {
    token: '', 
    userId: '',
    name: '', 
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setAllUserInfo: (state, action: PayloadAction<any>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.name = action.payload.name;
        }
    },
});

export const { setAllUserInfo } = userInfoSlice.actions

export const selectUserInfo = (state: RootState) => {
    const {token, userId, name } = state.userInfo;
    return {token, userId, name };
}

export default userInfoSlice.reducer
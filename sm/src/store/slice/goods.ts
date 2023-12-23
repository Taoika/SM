import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..';

const initialState = {
    storeGoods: <any[]>[],
    allGoods: <any[]>[],
    userGoods: <any[]>[],
}

export const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        setStoreGoods: (state, action: PayloadAction<any[]>) => {
            state.storeGoods = action.payload;
        },
        setAllGoods: (state, action: PayloadAction<any[]>) => {
            state.allGoods = action.payload;
        },
        setUserGoods: (state, action: PayloadAction<any[]>) => {
            state.userGoods = action.payload;
        }
    },
});

export const { setStoreGoods, setAllGoods, setUserGoods } = goodsSlice.actions

export const selectUserInfo = (state: RootState) => {
    const { storeGoods, allGoods, userGoods } = state.goods;
    return { storeGoods, allGoods, userGoods } ;
}

export default goodsSlice.reducer
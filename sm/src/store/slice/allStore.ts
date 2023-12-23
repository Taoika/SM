import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..';

const initialState = {
    applying: <any[]>[],
    inOperation: <any[]>[],
    dismissed: <any[]>[],
    deprecated: <any[]>[],
    storeGoods: <any[]>[],
}

export const allStoreSlice = createSlice({
    name: 'allStore',
    initialState,
    reducers: {
        setApplying: (state, action: PayloadAction<any[]>) => {
            state.applying = action.payload;
        },
        setInOperation: (state, action: PayloadAction<any[]>) => {
            state.inOperation = action.payload;
        },
        setDismissed: (state, action: PayloadAction<any[]>) => {
            state.dismissed = action.payload;
        },
        setDeprecated: (state, action: PayloadAction<any[]>) => {
            state.deprecated = action.payload;
        },
        setStoreGoods: (state, action: PayloadAction<any[]>) => {
            state.storeGoods = action.payload;
        },
    },
});

export const { setApplying, setInOperation, setDismissed, setDeprecated, setStoreGoods } = allStoreSlice.actions

export const selectUserInfo = (state: RootState) => {
    const { applying, inOperation, dismissed, deprecated, storeGoods } = state.allStore;
    return { applying, inOperation, dismissed, deprecated, storeGoods } ;
}

export default allStoreSlice.reducer
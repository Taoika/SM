import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..';

const initialState = {
    applying: <any[]>[],
    inOperation: <any[]>[],
    dismissed: <any[]>[],
    deprecated: <any[]>[],
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
    },
});

export const { setApplying, setInOperation, setDismissed, setDeprecated } = allStoreSlice.actions

export const selectUserInfo = (state: RootState) => {
    const { applying, inOperation, dismissed, deprecated } = state.allStore;
    return { applying, inOperation, dismissed, deprecated } ;
}

export default allStoreSlice.reducer
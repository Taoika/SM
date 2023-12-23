import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..';

const initialState = {
    applying: <any[]>[],
    inOperation: <any[]>[],
    deprecated: <any[]>[],
}

export const allStoreSlice = createSlice({
    name: 'allStore',
    initialState,
    reducers: {
        setApplying: (state, action: PayloadAction<any[]>) => {
            state.applying = action.payload;
        },
    },
});

export const { setApplying  } = allStoreSlice.actions

export const selectUserInfo = (state: RootState) => {
    const { applying } = state.allStore;
    return { applying } ;
}

export default allStoreSlice.reducer
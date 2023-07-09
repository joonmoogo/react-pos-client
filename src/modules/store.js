import { configureStore, createSlice } from '@reduxjs/toolkit'

// state 만드는 함수 
let obj = createSlice({
    name: 'key',
    initialState: 'value'
})
let obj1 = createSlice({
    name: 'key',
    initialState: 'value'
})
let obj2 = createSlice({
    name: 'key',
    initialState: 'value'
})

export default configureStore({
    reducer:{
        obj : obj.reducer,
        obj1 : obj1.reducer,
        obj2 : obj2.reducer
    }
})
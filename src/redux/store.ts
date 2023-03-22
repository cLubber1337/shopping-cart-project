import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./products.slice";
import cartSlice from "./cart.slice";


const store = configureStore({
    reducer: {
        productsSlice, cartSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
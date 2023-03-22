import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import validateProduct from "../api";
import {RootState} from "./store";


export interface Product {
    id: string
    title: string
    price: number
}

interface ProductSliceState {
    products: Product[],
    validationState?: ValidationState,
    errorMessage?: string
}

export enum ValidationState {
    Fulfilled,
    Pending,
    Rejected
}

export const addProductAsync = createAsyncThunk(
    "product/ addNewProduct",
    async (initialProduct: Product) => {
        return await validateProduct(initialProduct)
    })


const initialProducts: Product[] = [
    {title: "CS:GO", price: 99, id: "csgo"},
    {title: "DOTA2", price: 150, id: "dota"},
    {title: "PUBG", price: 75, id: "pub"},
]

const initialState: ProductSliceState = {
    products: initialProducts,
    validationState: undefined,
    errorMessage: undefined
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload)
        },
        removeProduct(state, action: PayloadAction<string>) {
            return {...state, products: state.products.filter(prod => prod.id !== action.payload)}
        }
    },
    extraReducers: builder => {
        builder.addCase(addProductAsync.fulfilled, (state, action) => ({
            ...state,
            validationState: ValidationState.Fulfilled,
            errorMessage: undefined,
            products: [...state.products, action.payload]
        }))
        builder.addCase(addProductAsync.rejected, (state, action) => ({
            ...state,
            validationState: ValidationState.Rejected,
            errorMessage: action.error.message
        }))
        builder.addCase(addProductAsync.pending, (state) => ({
            ...state,
            validationState: ValidationState.Pending,
            errorMessage: undefined
        }))
    }
})


export const getProducts = ((state: RootState) => state.productsSlice.products)
export const getMessageError = ((state: RootState) => state.productsSlice.errorMessage)

export const {addProduct, removeProduct} = productsSlice.actions

export default productsSlice.reducer
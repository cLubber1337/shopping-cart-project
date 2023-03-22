import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import validateProduct from "../api";
import {RootState} from "./store";


export interface Product {
    id: string
    title: string
    price: number
}

interface ProductSliceState {
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


const productAdapter = createEntityAdapter<Product>()

const initialState = productAdapter.getInitialState<ProductSliceState>({
    errorMessage: undefined,
    validationState: undefined
})
const filledInitialState = productAdapter.upsertMany(initialState, initialProducts)

const productsSlice = createSlice({
    name: 'products',
    initialState: filledInitialState,
    reducers: {

        addProduct(state, action: PayloadAction<Product>) {
            productAdapter.upsertOne(state, action.payload)
        },
        removeProduct(state, action: PayloadAction<string>) {
            productAdapter.removeOne(state, action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(addProductAsync.fulfilled, (state, action) => {
            productAdapter.upsertOne(state, action.payload)
            state.validationState = ValidationState.Fulfilled
            state.errorMessage = undefined
        })


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

export const {addProduct, removeProduct} = productsSlice.actions

export const getProducts = ((state: RootState) => state.productsSlice.entities)
export const getMessageError = ((state: RootState) => state.productsSlice.errorMessage)
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectEntities: selectProductEntities,
    selectIds: selectProductIds,
    selectTotal: selectTotalProducts
} = productAdapter.getSelectors<RootState>(state => state.productsSlice)


export default productsSlice.reducer
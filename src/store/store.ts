import { configureStore } from '@reduxjs/toolkit'
import shoppingCartReducer from '../store/shoppingCartSlice'

export default configureStore({
    reducer: {
        shoppingCart: shoppingCartReducer
    }
})
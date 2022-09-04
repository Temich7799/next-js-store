import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    image: {
        src: any
        alt: string
    },
    wordpress_id: number
    quantity: number
}

export const shoppingCartSlice = createSlice(
    {
        name: 'shoppingCart',
        initialState: <any>localStorage.getItem('ordered_products') ? JSON.parse(localStorage.getItem('ordered_products')) : {},
        reducers: {
            addToShoppingCart: (state, action: PayloadAction<Product>) => {
                state.hasOwnProperty(action.payload.wordpress_id)
                    ? state[action.payload.wordpress_id].quantity += 1
                    : state[action.payload.wordpress_id] = action.payload;

                saveCart(state);
            },

            removeFromShoopingCart: (state, action: PayloadAction<number>) => {
                delete state[action.payload];
                saveCart(state);
            },

            decreaseProductQuantity: (state, action: PayloadAction<number>) => {

                if (state[action.payload].quantity > 1) {
                    state[action.payload].quantity -= 1;
                }
                else {
                    delete state[action.payload];
                }

                saveCart(state);
            },
        }
    }
);

function saveCart(data: any) {
    localStorage.setItem('ordered_products', JSON.stringify(data));
}

export const { addToShoppingCart, removeFromShoopingCart, decreaseProductQuantity } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
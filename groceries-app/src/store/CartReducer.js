import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[],
        favourite: [],
        products: [],
    },
    reducers:{
        addToCart : (state,action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            if(itemInCart){
                itemInCart.quantity++;
            }else{
                state.cart.push({...action.payload,quantity:1})
            }
        },
        removeFromCart : (state,action) => {
            const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
            state.cart = removeFromCart;
        },
        addToFavourites : (state,action) => {
            const itemInFavourite = state.favourite.find((item) => item.id == action.payload.id);
            if(itemInFavourite){
                itemInFavourite.quantity++;
            }else{
                state.favourite.push({...action.payload,quantity:1})
            }
        },
        removeFromFavourites : (state,action) => {
            const removeFromFavourite = state.favourite.filter((item) => item.id !== action.payload.id);
            state.favourite = removeFromFavourite;
        },
        incrementQuantity : (state,action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            itemInCart.quantity++;
        },
        decrementQuantity : (state,action) => {
            const itemInCart = state.cart.find((item) => item.id == action.payload.id);
            if(itemInCart.quantity == 1){
                const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
                state.cart = removeFromCart;
            }else{
                itemInCart.quantity--;
            }

        }
    }
});


export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity, removeFromFavourites, addToFavourites} = cartSlice.actions;

export default cartSlice.reducer;
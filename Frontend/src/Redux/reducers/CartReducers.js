import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemAction: (state, action) => {
            const { dish, quantity } = action.payload;
            if (quantity > 0) {
                const itemIndex = state.items.findIndex((item) => item.idDish === dish.idDish);
                if (itemIndex >= 0) {
                    // L'articolo esiste già nel carrello, quindi aumenta la quantità
                    state.items[itemIndex].quantity += quantity;
                } else {
                    // L'articolo non esiste nel carrello, quindi aggiungilo
                    state.items = [...state.items, { ...dish, quantity }];
                    toast.success("Prodotto aggiunto al carrello", { position: "bottom-left" });
                }
            }
        },
        removeItemAction: (state, action) => {
            state.items = state.items.filter((item) => item.idDish !== action.payload);
        },
        updateQuantityAction: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item.idDish === action.payload.idDish);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity = action.payload.quantity;
            }
        },
        clearCartAction: (state) => {
            state.items = [];
        },
    },
});

export const { addItemAction, removeItemAction, updateQuantityAction, clearCartAction } = cartSlice.actions;

export default cartSlice.reducer;

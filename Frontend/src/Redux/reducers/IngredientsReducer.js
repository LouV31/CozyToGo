import { createSlice } from "@reduxjs/toolkit";
const ingredientSlice = createSlice({
    name: "ingredients",
    initialState: {
        ingredients: null,
    },
    reducers: {
        getIngredientsAction: (state, action) => {
            state.ingredients = action.payload;
        },
        addIngredientAction: (state, action) => {
            state.ingredients = [...state.ingredients, action.payload];
        },
        editIngredientAction: (state, action) => {
            const { idIngredient, Name, Price } = action.payload;
            const ingredientIndex = state.ingredients.findIndex(
                (ingredient) => ingredient.idIngredient === idIngredient
            );
            state.ingredients[ingredientIndex].Name = Name;
            state.ingredients[ingredientIndex].Price = Price;
        },
        searchIngredientAction: (state, action) => {
            state.ingredients = action.payload;
        },
    },
});
export const { getIngredientsAction, addIngredientAction, editIngredientAction, searchIngredientAction } =
    ingredientSlice.actions;
export default ingredientSlice.reducer;

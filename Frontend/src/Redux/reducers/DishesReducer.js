import { createSlice } from "@reduxjs/toolkit";

const dishesSlice = createSlice({
    name: "dishes",
    initialState: {
        dishes: null,
    },
    reducers: {
        getRestaurantDishesAction: (state, action) => {
            state.dishes = action.payload;
        },
        addDishAction: (state, action) => {
            state.dishes = [...state.dishes, action.payload];
        },
        editDishAction: (state, action) => {
            const { idDish, Name, Description, Ingredients } = action.payload;
            const dishIndex = state.dishes.findIndex((dish) => dish.idDish === idDish);
            state.dishes[dishIndex].Name = Name;
            state.dishes[dishIndex].Description = Description;
            state.dishes[dishIndex].Ingredients = Ingredients;
        },
        uploadDishImageAction: (state, action) => {
            const { idDish, image } = action.payload;
            const dishIndex = state.dishes.findIndex((dish) => dish.idDish === idDish);
            state.dishes[dishIndex].image = image;
        },
        searchDishAction: (state, action) => {
            state.dishes = action.payload;
        },
        toggleDishAvailabilityAction: (state, action) => {
            const { idDish } = action.payload;
            const dishIndex = state.dishes.findIndex((dish) => dish.idDish === idDish);
            state.dishes[dishIndex].isAvailable = !state.dishes[dishIndex].isAvailable;
        },
    },
});

export const {
    toggleDishAvailabilityAction,
    getRestaurantDishesAction,
    addDishAction,
    editDishAction,
    uploadDishImageAction,
    searchDishAction,
} = dishesSlice.actions;

export default dishesSlice.reducer;

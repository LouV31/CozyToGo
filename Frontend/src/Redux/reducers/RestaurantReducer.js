import { createSlice } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState: {
        restaurants: null,
        restaurant: null,
    },
    reducers: {
        getRestaurantsAction: (state, action) => {
            state.restaurants = action.payload;
        },
        getSingleRestaurantAction: (state, action) => {
            state.restaurant = action.payload;
        },
        addRestaurantAction: (state, action) => {
            state.restaurants = [...state.restaurants, action.payload];
        },
        toggleRestaurantAction: (state, action) => {
            const { idRestaurant } = action.payload;
            const restaurantIndex = state.restaurants.findIndex(
                (restaurant) => restaurant.idRestaurant === idRestaurant
            );
            state.restaurants[restaurantIndex].isActive = !state.restaurants[restaurantIndex].isActive;
        },
        searchRestaurantAction: (state, action) => {
            state.restaurants = action.payload;
        },
        editRestaurantAction: (state, action) => {
            state.restaurant = action.payload;
        },
        uploadImageAction: (state, action) => {
            state.restaurant = {
                ...state.restaurant,
                image: action.payload,
            };
        },
    },
});

export const {
    searchRestaurantAction,
    getRestaurantsAction,
    getSingleRestaurantAction,
    addRestaurantAction,
    toggleRestaurantAction,
    editRestaurantAction,
    uploadImageAction,
} = restaurantsSlice.actions;

export default restaurantsSlice.reducer;

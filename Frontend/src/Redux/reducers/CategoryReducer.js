import { createSlice } from "@reduxjs/toolkit";
const sliceCategory = createSlice({
    name: "category",
    initialState: {
        categories: null,
    },
    reducers: {
        getCategoriesAction: (state, action) => {
            state.categories = action.payload;
        },
    },
});
export const { getCategoriesAction } = sliceCategory.actions;
export default sliceCategory.reducer;

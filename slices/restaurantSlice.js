import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  restaurant: {
    id: null,
    title: null,
    imgUrl: null,
    rating: null,
    genre: null,
    address: null, 
    description: null,
    categories:null,
    dishes: null,
    lng: null,
    lat: null
  },
  activecategory: null,

}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activecategory = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRestaurant,setActiveCategory } = restaurantSlice.actions

export const selectResturant = state=> state.restaurant.restaurant;
export const selectActiveCategory = state=> state.restaurant.activecategory;
export const selectCategories = state=> state.restaurant.restaurant.categories;

export default restaurantSlice.reducer
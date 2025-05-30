import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";

export const fetchRestaurants = createAsyncThunk(
  "getAll/fetchRestaurants",
  async (_, { getState }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}restaurants/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchViewRestaurant = createAsyncThunk(
  "getAll/fetchViewRestaurant",
  async (restoId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${baseUrl}restaurants/${restoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Data fetch failed");
    }
  }
);

export const deleteRestaurants = createAsyncThunk(
  "getAll/deleteRestaurants",
  async (restaurantId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${baseUrl}restaurants/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return restaurantId;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

export const fetchCustomer = createAsyncThunk(
  "getAll/fetchCustomer",
  async (_, { getState }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}customers/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const getAllSlice = createSlice({
  name: "getAll",
  initialState: {
    restaurants: [],
    restaurantDetails: null,
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all resturant
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // view particular restaurant
      .addCase(fetchViewRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViewRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantDetails = action.payload;
      })
      .addCase(fetchViewRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete restaurant
      .addCase(deleteRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = state.restaurants.filter(
          (res) => res.id !== action.payload
        );
      })
      .addCase(deleteRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get all resturant
      .addCase(fetchCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getAllSlice.reducer;

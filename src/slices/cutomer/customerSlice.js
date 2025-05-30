import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"; 

import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";

export const fetchCustomers= createAsyncThunk(
    "getAll/fetchCustomers",
    async(_,{getState})=>{
        const token=localStorage.getItem("token");
        const response = await axios.get(`${baseUrl}customers/`,{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        });
        return response.data;
    }
);

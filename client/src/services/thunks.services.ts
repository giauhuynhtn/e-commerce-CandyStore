import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const path = "http://localhost:4000/api/v1/products/";

const fetchProductInfoThunk = createAsyncThunk(
  "productInfo/fetch",
  async (params: any) => {
    const { id } = params;
    const URL = `${path}${id}`;
    const response = await axios.get(URL);
    return { data: response.data, status: response.status };
  }
);

const fetchProductsByNameThunk = createAsyncThunk(
  "productsByName/fetch",
  async (name: string) => {
    const URL = `${path}filterByName/${name}`;
    const response = await axios.get(URL);
    return { data: response.data, status: response.status };
  }
);

const fetchProductsByCategoryThunk = createAsyncThunk(
  "productsByCategory/fetch",
  async (category: string) => {
    const URL = `${path}filterByCategory/${category}`;
    const response = await axios.get(URL);
    return { data: response.data, status: response.status };
  }
);

const fetchProductsThunk = createAsyncThunk("products/fetch", async () => {
  const URL = path;
  const response = await axios.get(URL);
  return { data: response.data, status: response.status };
});

export {
  fetchProductInfoThunk,
  fetchProductsByNameThunk,
  fetchProductsByCategoryThunk,
  fetchProductsThunk,
};

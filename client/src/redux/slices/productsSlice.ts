import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Product = {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  img: string;
};

export interface ProductsState {
  items: Product[];
  filteredItemsByName: Product[];
  filteredItemsByCategory: Product[];
  productInfo: Product;
  isLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  filteredItemsByName: [],
  filteredItemsByCategory: [],
  productInfo: {
    _id: "",
    name: "",
    category: "",
    description: "",
    price: 0,
    quantity: 0,
    img: "",
  },
  isLoading: false,
};

export const fetchProductInfoThunk = createAsyncThunk(
  "productInfo/fetch",
  async (params: any) => {
    const { id } = params;
    const URL = `http://localhost:4000/api/v1/products/${id}`;
    const response = await axios.get(URL);
    return { data: response.data, status: response.status };
  }
);

export const fetchProductsByNameThunk = createAsyncThunk(
  "productsByName/fetch",
  async (name: string) => {
    // const { name } = params;
    const URL = `http://localhost:4000/api/v1/products/filterByName/${name}`;
    const response = await axios.get(URL);
    return { data: response.data, status: response.status };
  }
);

export const fetchProductsByCategoryThunk = createAsyncThunk(
  "productsByCategory/fetch",
  async (category: string) => {
    const URL = `http://localhost:4000/api/v1/products/filterByCategory/${category}`;
    const response = await axios.get(URL);
    return { data: response.data, status: response.status };
  }
);

export const fetchProductsThunk = createAsyncThunk(
  "products/fetch",
  async () => {
    const URL = "http://localhost:4000/api/v1/products";
    const response = await axios.get(URL);
    return { data: response.data, status: response.status };
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.isLoading = false;
    });

    builder.addCase(fetchProductInfoThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProductInfoThunk.fulfilled, (state, action) => {
      state.productInfo = action.payload.data;
      state.isLoading = false;
    });

    builder.addCase(fetchProductsByNameThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProductsByNameThunk.fulfilled, (state, action) => {
      state.filteredItemsByName = action.payload.data;
      state.isLoading = false;
    });

    builder.addCase(fetchProductsByCategoryThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProductsByCategoryThunk.fulfilled, (state, action) => {
      state.filteredItemsByCategory = action.payload.data;
      state.isLoading = false;
    });
  },
});

export default productsSlice.reducer;

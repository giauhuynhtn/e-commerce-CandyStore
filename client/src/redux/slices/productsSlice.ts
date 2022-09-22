import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type Product = {
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  img: string;
};

export interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  productInfo: Product;
  isLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  productInfo: {
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
  reducers: {
    filteredProducts: (state, action: PayloadAction<string>) => {
      const filteredProducts = state.items.filter((product) => {
        const lowerCaseName = product.name.toLocaleLowerCase();
        return lowerCaseName.includes(action.payload.toLocaleLowerCase());
      });
      state.filteredItems = filteredProducts;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchProductsThunk.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProductsThunk.fulfilled, (state: any, action: any) => {
      state.items = action.payload.data;
      state.filteredItems = action.payload.data;
      state.isLoading = false;
    });

    builder.addCase(fetchProductInfoThunk.pending, (state: any) => {
      state.isLoading = true;
    });

    builder.addCase(
      fetchProductInfoThunk.fulfilled,
      (state: any, action: any) => {
        state.productInfo = action.payload.data;
        state.isLoading = false;
      }
    );
  },
});

export default productsSlice.reducer;

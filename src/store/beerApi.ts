import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../utils/http';
import { BASE_URL } from '../utils/base_url';
import PER_PAGE from '../utils/per_page';
import { Beer } from '../interfaces/beer';


export const getBeersApi = createAsyncThunk(
  'beers/getBeers',
  async (page: number, { rejectWithValue }) => {
    try {
      const { data }: { data: Beer[] } = await http(
        `${BASE_URL}beers?page=${page}&per_page=${PER_PAGE}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBeersByFoodApi = createAsyncThunk(
  'beers/getByFood',
  async({food, page} : {food:string; page:number}, { rejectWithValue }) => {
    try {
      const { data }: { data:Beer[]} = await http(
        `${BASE_URL}beers?food=${food}&per_page=${PER_PAGE}&page=${page}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
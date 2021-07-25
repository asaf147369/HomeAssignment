import { createSlice } from '@reduxjs/toolkit';
import { Beer } from '../interfaces/beer';
import { State } from '../interfaces/state';
import {
  getBeersApi, getBeersByFoodApi
} from './beerApi';
// import { v4 as uuidv4 } from 'uuid';

// import { State } from "../interfaces/State";
// import { Fav } from '../interfaces/Fav';
// import { Current } from '../interfaces/Current';

const initialState: Readonly<State> = {
  loading: false,
  error: '',
  current: null,
  showDeletePopup: false,
  page: 1,
  food: "",
  beers: []

};

export const beerSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    handleFavorite: (state: State, { payload }: { payload: any }) => {
      let exist: boolean;
      if (state.favorites) {
        exist = state.favorites.some((beer) => beer.id === payload.id);
      } else {
        exist = false;
      }

      if (!state.favorites) {
        state.favorites = [];
      }
      if (exist) {
        state.favorites = state.favorites.filter(
          (beer) => beer.id !== payload.id
        );
      } else {
        const beer: Beer = {
          ...payload,
        }
        state.favorites.push(beer);
      }
    },
    changeCurrent: (state: State, { payload }: { payload: Beer | null }) => {
      state.current = payload;
    },
    toggleDeletePopup: (state: State, { payload }: { payload: string | null }) => {
      if (payload === "delete") {
        state.showDeletePopup = true;
      } else {
        state.showDeletePopup = false;
      }
    },
    deleteAllFavorits: (state: State) => {
      state.favorites = [];
      state.showDeletePopup = false;
    },
    changePagination: (state: State, { payload }: { payload: number }) => {
      state.page = payload;
    },
    setSearchValue: (state: State, { payload }: {payload: string }) => {
      state.food = payload;
    },
    resetPageNumber: (state: State) => {
      state.page = 1;
    },
  },
  extraReducers: {
    [getBeersApi.pending.toString()]: (state: State) => {
      state.loading = true;
      state.error = '';
    },
    [getBeersApi.fulfilled.toString()]: (state: State, { payload } : { payload: Beer[]}) => {
      state.loading = false;
      state.beers = payload;
    },
    [getBeersApi.rejected.toString()]: (state: State, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getBeersByFoodApi.pending.toString()]: (state: State) => {
      state.loading = true;
      state.error = '';
    },
    [getBeersByFoodApi.fulfilled.toString()]: (state: State, { payload }: { payload: Beer[] }) => {
      state.loading = false;
      state.beers = payload;
    },
    [getBeersByFoodApi.rejected.toString()]: (state: State, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { 
  handleFavorite, 
  changeCurrent, 
  toggleDeletePopup, 
  deleteAllFavorits, 
  changePagination, 
  setSearchValue,
  resetPageNumber
} = beerSlice.actions;

export default beerSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { Beer } from '../interfaces/beer';
import { State } from '../interfaces/state';
import {
  getBeersApi, getBeersByFoodApi
} from './beerApi';

const initialState: Readonly<State> = {
  loading: false,
  error: '',
  current: null,
  page: 1,
  food: "",
  beers: [],
  favorites: []
};

export const beerSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    handleFavorite: (state: State, { payload }: { payload: Beer }) => {
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
          rank: 1
        }
        state.favorites.push(beer);
      }
    },
    changeCurrentBeer: (state: State, { payload }: { payload: Beer | null }) => {
      state.current = payload;
    },
    deleteAllFavorits: (state: State) => {
      state.favorites.length = 0;
    },
    changePagination: (state: State, { payload }: { payload: number }) => {
      state.page = payload;
    },
    resetPageNumber: (state: State) => {
      state.page = 1;
    },
    setSearchValue: (state: State, { payload }: {payload: string }) => {
      state.food = payload;
    },
    changeRanking: (state: State, { payload }: { payload: { id: number; rank: number } }) => {
      const index = state.favorites.findIndex(x => x.id === payload.id);
      state.favorites[index].rank = payload.rank;
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
  changeCurrentBeer, 
  deleteAllFavorits, 
  changePagination, 
  setSearchValue,
  resetPageNumber,
  changeRanking
} = beerSlice.actions;

export default beerSlice.reducer;

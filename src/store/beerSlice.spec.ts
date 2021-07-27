import Chance from 'chance';
import { Beer } from '../interfaces/beer';
import { State } from '../interfaces/state';
import reducer, { handleFavorite, changeCurrentBeer, deleteAllFavorits, changePagination, resetPageNumber, setSearchValue, changeRanking } from './beerSlice';



const chance = Chance();

test('should handle a beer being added to the favorites state', () => {
	const state: Partial<State> = { favorites: [] };
	const previousState: State = createFakeInitialState(state);
	const fav = createFakeBeer();
	expect(reducer(previousState, handleFavorite(fav))).toEqual(
		{
			favorites: [fav],
			beers: previousState.beers,
			current: previousState.current,
			loading: previousState.loading,
			error: previousState.error,
			page: previousState.page,
			food: previousState.food
		}
	)
})


test('should handle a beer being Removed from favorites to the favorites state', () => {
	const beer = createFakeBeer();
	const state: Partial<State> = { favorites: [beer] };
	const previousState: State = createFakeInitialState(state);
	expect(reducer(previousState, handleFavorite(beer))).toEqual(
		{
			favorites: [],
			beers: previousState.beers,
			current: previousState.current,
			loading: previousState.loading,
			error: previousState.error,
			page: previousState.page,
			food: previousState.food
		}
	)
})


test('should handle the current beer being changed', () => {
	const state: Partial<State> = { current: null };
	const previousState: State = createFakeInitialState(state);
	const beer = createFakeBeer();
	expect(reducer(previousState, changeCurrentBeer(beer))).toEqual(
		{
			favorites: previousState.favorites,
			beers: previousState.beers,
			current: beer,
			loading: previousState.loading,
			error: previousState.error,
			page: previousState.page,
			food: previousState.food
		}
	)
})

test('should handle the current beer being removed', () => {
	const beer = createFakeBeer();
	const state: Partial<State> = { current: beer };
	const previousState: State = createFakeInitialState(state);
	expect(reducer(previousState, changeCurrentBeer(null))).toEqual(
		{
			favorites: previousState.favorites,
			beers: previousState.beers,
			current: null,
			loading: previousState.loading,
			error: previousState.error,
			page: previousState.page,
			food: previousState.food
		}
	)
})

test('should delete a favorite with delete all', () => {
	const beer = createFakeBeer();
	const state: Partial<State> = { favorites: [beer] };
	const previousState: State = createFakeInitialState(state);
	expect(reducer(previousState, deleteAllFavorits())).toEqual(
		{
			favorites: [],
			beers: previousState.beers,
			current: previousState.current,
			loading: previousState.loading,
			error: previousState.error,
			page: previousState.page,
			food: previousState.food
		}
	)
})

test('should delete multiple favorites with delete all', () => {
	const beer = createFakeBeer();
	const beer2 = createFakeBeer();
	const beer3 = createFakeBeer();
	const state: Partial<State> = { favorites: [beer, beer2, beer3] };
	const previousState: State = createFakeInitialState(state);
	expect(reducer(previousState, deleteAllFavorits())).toEqual(
		{
			favorites: [],
			beers: previousState.beers,
			current: previousState.current,
			loading: previousState.loading,
			error: previousState.error,
			page: previousState.page,
			food: previousState.food
		}
	)
})

test('should handle pagination change', () => {
	const newPage = Math.floor(Math.random() * 10) + 1;
	const oldPage = Math.floor(Math.random() * 10) + 1;
	const state: Partial<State> = { page: oldPage};
	const previousState: State = createFakeInitialState(state);
	expect(reducer(previousState, changePagination(newPage))).toEqual(
		{
			favorites: previousState.favorites,
			beers: previousState.beers,
			current: previousState.current,
			loading: previousState.loading,
			error: previousState.error,
			page: newPage,
			food: previousState.food
		}
	)
})

test('should handle pagination reset', () => {
	const oldPage = Math.floor(Math.random() * 10) + 1;
	const state: Partial<State> = { page: oldPage };
	const previousState: State = createFakeInitialState(state);
	expect(reducer(previousState, resetPageNumber())).toEqual(
		{
			favorites: previousState.favorites,
			beers: previousState.beers,
			current: previousState.current,
			loading: previousState.loading,
			error: previousState.error,
			page: 1,
			food: previousState.food
		}
	)
})

test('should handle search value input', () => {
	const food = chance.word();
	const state: Partial<State> = { food: "" };
	const previousState: State = createFakeInitialState(state);
	expect(reducer(previousState, setSearchValue(food))).toEqual(
		{
			favorites: previousState.favorites,
			beers: previousState.beers,
			current: previousState.current,
			loading: previousState.loading,
			error: previousState.error,
			page: previousState.page,
			food: food
		}
	)
})

test('should handle search value change', () => {
	const food = chance.word();
	const state: Partial<State> = { food: chance.word() };
	const previousState: State = createFakeInitialState(state);
	expect(reducer(previousState, setSearchValue(food))).toEqual(
		{
			favorites: previousState.favorites,
			beers: previousState.beers,
			current: previousState.current,
			loading: previousState.loading,
			error: previousState.error,
			page: previousState.page,
			food: food
		}
	)
})


test('should handle a beer rank being changed', () => {
	const beer = createFakeBeer();
	const fav = { id: beer.id, rank: Math.floor(Math.random() * 5) + 1};
	const state: Partial<State> = { favorites: [beer] };
	const previousState: State = createFakeInitialState(state);
	expect(reducer(previousState, changeRanking(fav))).toEqual(
		{
			favorites:[beer],
			beers: previousState.beers,
			current: previousState.current,
			loading: previousState.loading,
			error: previousState.error,
			page: previousState.page,
			food: previousState.food
		}
	)
})



// mock functions

function createFakeInitialState(state?: Partial<State>): State {
	return {
		beers: state?.beers || [createFakeBeer()],
		favorites: state?.favorites || [createFakeBeer()],
		current: state?.current || createFakeBeer(),
		loading: state?.loading || chance.bool(),
		error: state?.error || "",
		page: state?.page || chance.integer(),
		food: state?.food || chance.word()
	}
}


function createFakeBeer(beer?: Partial<Beer>): Beer {
	return {
		id: beer?.id || chance.integer(),
		name: beer?.name || chance.word(),
		image_url: beer?.image_url || chance.url(),
		first_brewed: beer?.first_brewed || chance.word(),
		tagline: beer?.tagline || chance.word(),
		description: beer?.description || chance.paragraph(),
		isFavoritesPage: beer?.isFavoritesPage || chance.bool(),
		rank: beer?.rank || 1
	}
}
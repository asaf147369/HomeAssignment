import { Pagination } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Beer } from "../../interfaces/beer";
import { State } from "../../interfaces/state";
import { getBeersApi, getBeersByFoodApi } from "../../store/beerApi";
import { changePagination } from "../../store/beerSlice";
import BeerDisplay from "../beerDisplay/BeerDisplay";
import { Container } from "../common/container/Container";
import { Spinner } from "../common/Spinner/Spinner";
import { Title } from "../common/text/Title";
import { SearchBar } from "../search/SearchBar";

const Main = () => {

	const { beers, page, food, loading, error } = useSelector((state: State) => state);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!food) {
			dispatch(getBeersApi(page));
		} else {
			dispatch(getBeersByFoodApi({ food, page }))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, dispatch]);

	const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
		dispatch(changePagination(value));
	}

	return (
		<Container dir="column" alignItems="flex-end" padding="15px 25px">
			<SearchBar />
			{loading ? (
				<Container alignItems="center" justify="center" width="100%" height="400px">
					<Spinner />
				</Container>
			) : (beers?.length > 0 ? (
				<Container
					wrap="wrap"
					width="100%"
					gap="30px"
					margin="25px 0"
					justify="flex-start"
				>
					{beers.map((beer: Beer) => (
						<BeerDisplay {...beer} key={beer.id}></BeerDisplay>
					))}
				</Container>
			) : (
				error ? <Title level="2">{error}</Title> :
					<Title level="2">
						No beers found
					</Title>
			))}
			{beers?.length ?
				<Pagination count={10} page={page} onChange={handlePageChange} size="medium" /> : <React.Fragment />
			}
		</Container>
	)

}

export default Main
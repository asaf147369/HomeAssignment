import { Pagination } from "@material-ui/lab";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Beer } from "../../interfaces/beer";
import { State } from "../../interfaces/state";
import { getBeersApi, getBeersByFoodApi } from "../../store/beerApi";
import { changePagination } from "../../store/beerSlice";
import BeerDisplay from "../beerDisplay/BeerDisplay";
import { Container } from "../common/container/Container";
import { Spinner } from "../common/Spinner/Spinner";
import SearchBar from "../search/SearchBar";

const Main = () => {

	const { beers, page, food } = useSelector((state: State) => state);
	
	const dispatch = useDispatch();

	useEffect(() => { 
		if(!food) {
			dispatch(getBeersApi(page)); 
		} else {
			dispatch(getBeersByFoodApi({food, page}))
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, dispatch]);

	const handleChange = (e: React.ChangeEvent<any>, value: number) => {
		dispatch(changePagination(value));
	}

return (
	<Container dir="column" alignItems="flex-end" padding="15px 25px">
		<SearchBar />
		<Container
			wrap="wrap"
			padding="0 25px 20px"
			width="100%"
		>
			{beers?.length > 0 ?
				beers.map((beer:Beer) => (
					<BeerDisplay {...beer} key={beer.id}></BeerDisplay>
				)) : <Spinner />}
		</Container>
		<Pagination count={10} page={page} onChange={handleChange} />
	</Container>
)

}

export default Main
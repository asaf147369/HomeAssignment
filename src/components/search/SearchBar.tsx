import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from '@material-ui/core';
import { getBeersByFoodApi } from "../../store/beerApi";
import { useDispatch, useSelector } from "react-redux";
import { resetPageNumber, setSearchValue } from "../../store/beerSlice";
import { State } from "../../interfaces/state";

const SearchBar = () => {

	const { food } = useSelector((state: State) => state);

	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(resetPageNumber());
		dispatch(getBeersByFoodApi({food, page:1}));
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(resetPageNumber());
		dispatch(setSearchValue(event.target.value));
	}



	return(
		<TextField
			label="Food Pairing"
			onChange={handleChange}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleClick}>
							<SearchIcon />
						</IconButton>
					</InputAdornment>
				)
			}}
		/>
	)
}

export default SearchBar;
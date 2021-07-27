import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from '@material-ui/core';
import { getBeersApi, getBeersByFoodApi } from "../../store/beerApi";
import { useDispatch, useSelector } from "react-redux";
import { resetPageNumber, setSearchValue } from "../../store/beerSlice";
import { State } from "../../interfaces/state";

export const SearchBar = () => {

	const { food } = useSelector((state: State) => state);

	const dispatch = useDispatch();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchValue(event.target.value));
	}
	
	const handleSearchSubmit = () => {
		dispatch(resetPageNumber());
		if(food !== "") {
			dispatch(getBeersByFoodApi({food, page:1}));
		} else {
			dispatch(getBeersApi(1));
		}
	}

	const sendOnEnter = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearchSubmit();
		}
	}

	return(
		<TextField
			label="Food Pairing"
			onChange={handleChange}
			onKeyDown={sendOnEnter}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleSearchSubmit}>
							<SearchIcon />
						</IconButton>
					</InputAdornment>
				)
			}}
		/>
	)
}
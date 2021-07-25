import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from "react-redux";
import { changeRanking } from "../../store/beerSlice";
import { Beer } from "../../interfaces/beer";
import React from 'react';


export const BeerRanking = (beer:Beer) => {

	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);

	const handleChange = (event: React.ChangeEvent<{ value: number }>) => {
		const newBeer = {
			id: beer.id,
			rank: event.target.value
		}
		dispatch(changeRanking(newBeer));
	}

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
	}

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<Select
			open={open}
			onClose={handleClose}
			onOpen={handleOpen}
			value={beer.rank}
			label="Age"
			onChange={handleChange}
			onClick={handleClick}
		>
			<MenuItem value={1}>1</MenuItem>
			<MenuItem value={2}>2</MenuItem>
			<MenuItem value={3}>3</MenuItem>
			<MenuItem value={4}>4</MenuItem>
			<MenuItem value={5}>5</MenuItem>
		</Select>
	)
}
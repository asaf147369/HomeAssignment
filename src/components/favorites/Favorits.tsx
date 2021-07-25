import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import BeerDisplay from "../beerDisplay/BeerDisplay";
import { Container } from "../common/container/Container";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { toggleDeletePopup } from "../../store/beerSlice";
import DeleteFavoritsPopup from "../popups/deleteFavoritsPopup/DeleteFavoritsPopup";
import { Title } from "../common/text/Title";
import React from "react";
import { State } from "../../interfaces/state";
import { Beer } from "../../interfaces/beer";

const Favorits = () => {

	const { favorites, showDeletePopup } = useSelector((state: State) => state);

	const dispatch = useDispatch();

	const openDeleteModal = () => {
		dispatch(toggleDeletePopup('delete'));
	}

	return (
		<Container dir="column" alignItems="flex-end" padding="15px 25px">
			{favorites?.length ? 
				<Button variant="outlined" startIcon={<DeleteForeverIcon />} onClick={openDeleteModal}>
					Delete
				</Button> : <React.Fragment />
			}
			{ showDeletePopup ? <DeleteFavoritsPopup></DeleteFavoritsPopup> : <React.Fragment />}
			<Container
				wrap="wrap"
				width="100%"
			>
				<Container
					wrap="wrap"
					width="100%"
					gap="30px"
					margin="25px 0"
					justify="flex-start"
				>
					{favorites.length > 0 ?
						favorites.map((beer: Beer) => (
							<BeerDisplay {...beer} key={beer.id} showRank={true}></BeerDisplay>
						)) : <Title level="2">No favorits selected</Title>}
				</Container>
			</Container>
		</Container>
		
	)

}

export default Favorits;
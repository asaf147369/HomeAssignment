import { Button } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Beer } from "../../interfaces/beer";
import { State } from "../../interfaces/state";
import BeerDisplay from "../beerDisplay/BeerDisplay";
import { Container } from "../common/container/Container";
import { Title } from "../common/text/Title";
import DeleteFavoritsPopup from "../popups/deleteFavoritsPopup/DeleteFavoritsPopup";

const Favorits = () => {

	const { favorites } = useSelector((state: State) => state);

	const [modalOpen, toggleModal] = useState<boolean>(false);

	const openDeleteModal = () => {
		toggleModal(true);
	}

	return (
		<Container dir="column" alignItems="flex-end" padding="15px 25px">
			{favorites?.length ? 
				<Button variant="outlined" startIcon={<DeleteForeverIcon />} onClick={openDeleteModal}>
					Delete
				</Button> : <React.Fragment />
			}
			{modalOpen ? <DeleteFavoritsPopup modalOpen={modalOpen} toggleModal={toggleModal}/>: <React.Fragment />}
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
							<BeerDisplay {...beer} key={beer.id} isFavoritesPage={true} />
						)) : <Title level="2">No favorits selected</Title>}
				</Container>
			</Container>
		</Container>
		
	)

}

export default Favorits;
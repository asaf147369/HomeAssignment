import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import BeerDisplay from "../beerDisplay/BeerDisplay";
import { Container } from "../common/container/Container";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { toggleDeletePopup } from "../../store/beerSlice";
import DeleteFavoritsPopup from "../popups/deleteFavoritsPopup/DeleteFavoritsPopup";

const Main = () => {

	const { favorites, showDeletePopup } = useSelector((state: any) => state);

	const dispatch = useDispatch();

	const openDeleteModal = () => {
		dispatch(toggleDeletePopup('delete'));
	}


	return (
		<Container dir="column" alignItems="flex-end" padding="15px 25px">
			<Button variant="outlined" startIcon={<DeleteForeverIcon />} onClick={openDeleteModal}>
				Delete
			</Button>
			<Container
				wrap="wrap"
				width="100%"
			>
				{ showDeletePopup && <DeleteFavoritsPopup></DeleteFavoritsPopup>}
				{favorites?.length > 0 &&
					favorites.map((beer: any) => (
						<BeerDisplay {...beer} key={beer.id}></BeerDisplay>
					))}
			</Container>
		</Container>
		
	)

}

export default Main
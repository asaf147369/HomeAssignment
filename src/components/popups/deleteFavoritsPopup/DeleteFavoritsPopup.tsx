import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../interfaces/state";
import { deleteAllFavorits, toggleDeletePopup } from "../../../store/beerSlice";
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core/';

const DeleteFavoritsPopup = () => {


	const { showDeletePopup } = useSelector((state: State) => state);

	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(deleteAllFavorits());
	};

	const handleClose = () => {
		dispatch(toggleDeletePopup(null))
	};

	return (
		<Dialog
			open={showDeletePopup}
			onClose={handleClose}
		>
			<DialogTitle id="alert-dialog-title">{"Are you sure you want to delete all favorites?"}</DialogTitle>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Close popup
				</Button>
				<Button onClick={handleClick} color="primary">
					Delete all
				</Button>
			</DialogActions>
		</Dialog>
	)

}

export default DeleteFavoritsPopup;
import { useDispatch } from "react-redux";
import { deleteAllFavorits } from "../../../store/beerSlice";
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core/';
import React from "react";

const DeleteFavoritsPopup = (props: { modalOpen: boolean ,toggleModal:any}) => {

	const dispatch = useDispatch();

	const deleteAll = () => {
		props.toggleModal(false);
		dispatch(deleteAllFavorits());
	};

	const closeModal = () => {
		props.toggleModal(false);
	}


	return (
		<Dialog
			open={props.modalOpen}
			onClose={closeModal}
		>
			<DialogTitle id="alert-dialog-title">Are you sure you want to delete all favorites?</DialogTitle>
			<DialogActions>
				<Button onClick={closeModal} color="primary">
					Close popup
				</Button>
				<Button onClick={deleteAll} color="primary">
					Delete all
				</Button>
			</DialogActions>
		</Dialog>
	)

}

export default DeleteFavoritsPopup;
import { useDispatch, useSelector } from "react-redux";
import { Beer } from "../../interfaces/beer";
import { State } from "../../interfaces/state";
import { changeCurrentBeer, handleFavorite } from "../../store/beerSlice";
import { Col } from "../common/col/Col";
import { Text } from "../common/text/Text";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Alert, Button, IconButton, Snackbar } from '@material-ui/core/';
import { Img } from "../common/img/Img";
import { escapeHtml } from "../../utils/escape";
import { BeerRanking } from "../beerRanking/BeerRanking";
import React, { useState } from "react";
import CloseIcon from '@material-ui/icons/Close';

const BeersDisplay = (beer: Beer) => {

	const favorites = useSelector((state: State) => state.favorites);

	const dispatch = useDispatch();

	let existInFavorite: boolean = false;
	if (favorites?.length) {
		existInFavorite = favorites.some(
			(favorite: Beer) => favorite.id === beer.id
		);
	}

	const [isLeaving, setIsLeaving] = useState(false);
	const [myTimeout, setMyTimeout] = useState<any>(null)
	const [toastOpen, setToastOpen] = useState(false);
	
	const handleFavoriteToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (beer.isFavoritesPage) {
			setToastOpen(true);
			setIsLeaving(!isLeaving);
			let timeout = setTimeout(function () {
				console.log("5 sec ended");
				dispatch(handleFavorite(beer))
			}, 5000);
			setMyTimeout(timeout);
		} else {
			dispatch(handleFavorite(beer));
		}
	};

	const UndoRemoveFromFavorits = () => {
		setIsLeaving(!isLeaving);
		clearTimeout(myTimeout);
	}

	const openBeerModal = () => {
		dispatch(changeCurrentBeer(beer));
	}

	const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setToastOpen(false);
	};

	const mountedStyle = { animation: "inAnimation 1500ms ease-in" };
	const unmountedStyle = { animation: "outAnimation 5000ms ease-in" };

	return (
		<React.Fragment>
			<Col
				dir="column"
				justify="center"
				alignItems="center"
				width="var(--display-block-width)"
				border="1px solid rgba(0, 0, 0, 0.23)"
				radius="8px"
				padding="25px"
				onClick={openBeerModal}
				style={isLeaving ?  unmountedStyle : myTimeout ? mountedStyle : {}}
			>
				<Col width="100%" margin="0 0 10px">
					<React.Fragment>
						{beer.isFavoritesPage && <BeerRanking {...beer} />}
					</React.Fragment>
					<Col margin="0 0 0 auto">
						<IconButton onClick={handleFavoriteToggle}>
							{existInFavorite ? <StarIcon style={{ color: '#EADB4C' }} /> : <StarBorderIcon />}
						</IconButton>
					</Col>
				</Col>
				<Img
					src={beer.image_url}
					alt={escapeHtml(beer.name)}
					margin="auto"
					maxHeight="200px"
				/>
				<br />
				<Text size="2rem" margin="auto 0 0">
					{beer.name}
				</Text>
			</Col>
			{isLeaving && beer.isFavoritesPage && toastOpen && (
				<Snackbar
					open={isLeaving}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center'
					}}
					autoHideDuration={5000}
					onClose={handleClose}
				>
					<Alert severity="warning">			
						Beer removed from favorites
						<Button color="secondary" size="small" onClick={UndoRemoveFromFavorits}>
							UNDO
						</Button>
						<IconButton
							size="small"
							aria-label="close"
							color="inherit"
							onClick={handleClose}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					</Alert>
				</Snackbar>
			)}
		</React.Fragment>

	)

}

export default BeersDisplay;
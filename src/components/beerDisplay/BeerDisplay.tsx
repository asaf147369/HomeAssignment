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
import { useEffect } from "react";

const BeersDisplay = (beer: Beer) => {

	const favorites = useSelector((state: State) => state.favorites);

	const dispatch = useDispatch();

	const [isLeaving, setIsLeaving] = useState(false);
	const [myTimeout, setMyTimeout] = useState<any>(null)
	const [toastOpen, setToastOpen] = useState(false);
	const [inFavorits, setInFavorites] = useState(false);


	let existInFavorite: boolean = false;
	if (favorites?.length) {
		existInFavorite = favorites.some(
			(favorite: Beer) => favorite.id === beer.id
		);
	}

	useEffect(() => {
		setInFavorites(existInFavorite)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleFavoriteToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setInFavorites(!inFavorits);
		if ( existInFavorite) {
			setToastOpen(true);
			setIsLeaving(!isLeaving);
			let timeout = setTimeout(function () {
				dispatch(handleFavorite(beer))
			}, 5000);
			setMyTimeout(timeout);
		} else {
			dispatch(handleFavorite(beer));
		}
		existInFavorite = !existInFavorite;
	};

	const UndoRemoveFromFavorits = () => {
		setIsLeaving(!isLeaving);
		setInFavorites(true);
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
				cursor="pointer"
				onClick={openBeerModal}
				style={isLeaving && beer.isFavoritesPage ? unmountedStyle : myTimeout && beer.isFavoritesPage ? mountedStyle : {}}
			>
				<Col width="100%" margin="0 0 10px">
					<React.Fragment>
						{beer.isFavoritesPage && !isLeaving && <BeerRanking {...beer} />}
					</React.Fragment>
					<Col margin="0 0 0 auto" width="auto !important">
						<IconButton onClick={handleFavoriteToggle}>
							{inFavorits ? <StarIcon style={{ color: '#EADB4C' }} /> : <StarBorderIcon />}
						</IconButton>
					</Col>
				</Col>
				<Img
					src={beer.image_url ? beer.image_url : "https://static.horiba.com/fileadmin/Horiba/_processed_/3/6/csm_csm_01_02-2019_Beer_Brewing_53ef2818e5_948557e774.png"}
					alt={escapeHtml(beer.name)}
					margin="auto"
					maxHeight="200px"
				/>
				<br />
				<Text size="2rem" margin="auto 0 0">
					{beer.name}
				</Text>
			</Col>
			{toastOpen && (
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
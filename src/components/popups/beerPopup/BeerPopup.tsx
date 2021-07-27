import { useDispatch, useSelector } from "react-redux";
import { Beer } from "../../../interfaces/beer";
import { State } from "../../../interfaces/state";
import { changeCurrentBeer } from "../../../store/beerSlice";
import { Col } from "../../common/col/Col";
import { Text } from "../../common/text/Text";
import { Dialog } from '@material-ui/core/';
import { Title } from "../../common/text/Title";

const BeerPopup = (beer: Beer) => {

	const current = useSelector((state: State) => state.current);

	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(changeCurrentBeer(null))
	};

	return (
		<Dialog
			open={Boolean(current)}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<Col
				dir="column"
				justify="center"
				alignItems="flex-start"
				width="100%"
				padding="25px"
			>
				<Col textAlign="center">
					<Title level="2">
						{beer.name}
					</Title>
				</Col>
				<Text size="1.5rem" margin="auto 0 0">
					first brewed:&nbsp;{beer.first_brewed}
				</Text>
				<br />
				<Text size="1.5rem" margin="auto 0 0">
					tagline:&nbsp;{beer.tagline}
				</Text>
				<br />
				<Text size="1.5rem" margin="auto 0 0">
					description:&nbsp;{beer.description}
				</Text>
			</Col>
		</Dialog>
	)
}

export default BeerPopup;
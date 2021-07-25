import { useDispatch, useSelector } from "react-redux";
import { Beer } from "../../interfaces/beer";
import { State } from "../../interfaces/state";
import { changeCurrent, handleFavorite } from "../../store/beerSlice";
import { Col } from "../common/col/Col";
import { Text } from "../common/text/Text";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { IconButton } from '@material-ui/core/';
import { Img } from "../common/img/Img";
import { escapeHtml } from "../../utils/escape";

const BeersDisplay = (beer:Beer) => {


const favorites = useSelector((state: State) => state.favorites);

  const dispatch = useDispatch();

  let existInFavorite:boolean = false;
  if (favorites?.length) {
    existInFavorite = favorites.some(
      (favorite:Beer) => favorite.id === beer.id
    );
  }

  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
	  e.stopPropagation();
	  dispatch(handleFavorite(beer));
  };

  const openModal = () => {
	  dispatch(changeCurrent(beer));
  }

	return (
		<Col
			dir="column"
			justify="center"
			alignItems="center"
			width="calc(100% / 4 - 60px)"
			border="1px solid black"
			radius="8px"
			padding="25px"
			margin="30px 30px"
			onClick={openModal}
		>
			<Col margin="0 0 0 auto">
				<IconButton onClick={handleClick}>
					{existInFavorite ? <StarIcon style={{ color: '#EADB4C' }} /> : <StarBorderIcon />}
				</IconButton>
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
	)

}

export default BeersDisplay;
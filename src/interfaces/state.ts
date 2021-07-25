import { Beer } from "./beer";

export interface State {
	beers: Beer[];
	favorites?: Beer[];
	current: Beer | null;
	loading: boolean;
	error: string;
	showDeletePopup: boolean;
	page: number;
	food: string;
}
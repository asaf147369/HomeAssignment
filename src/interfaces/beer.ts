export interface Beer {
	id: number;
	name: string;
	image_url: string;
	first_brewed: string;
	tagline: string;
	description: string;
	isFavoritesPage?: boolean;
	rank?: number;
}
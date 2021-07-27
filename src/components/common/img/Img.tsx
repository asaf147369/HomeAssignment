import styled from 'styled-components';

const SImg = styled.img<Props>`
	src: ${({ src }) => src};
	alt: ${({ alt }) => alt};
	width: ${({ width }) => width ? width : "100%"};
	height: ${({ height }) => height ? height : "100%"};
	margin: ${({ margin }) => margin ? margin : "0"};
	max-height: ${({ maxHeight }) => maxHeight ? maxHeight : "100%"}
`;


export const Img = (props: Props) => {
	return (
		<SImg {...props} />
	);
};

interface Props {
	src: string;
	alt: string;
	width?: string;
	height?: string;
	margin?: string;
	maxHeight?: string;
}

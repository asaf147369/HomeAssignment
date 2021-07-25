export const Title = (props:Props) => {
	const Heading = `h${props.level}` as keyof JSX.IntrinsicElements;;
	return (
	<Heading {...props}>
        {props.children}
    </Heading>
	);
};

interface Props {
	level: string;
	children: string | string[] | JSX.Element | JSX.Element[] | undefined;
	margin?: string;
	textAlign?: string;
}

import styled from 'styled-components';

const SRow = styled.div<Props>`
  display: flex;
  flex-direction: ${({ dir }) => dir};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ alignItems }) => alignItems};
  flex-wrap: ${({ wrap }) => wrap};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  height: ${({ height }) => height};
  overflow: ${({ overflow }) => overflow};
  border: ${({border}) => border};
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const Row = (props:Props) => {
  return <SRow {...props} />;
};


interface Props {
  dir?: string;
  justify?: string;
  alignItems?: string;
  wrap?: string
  padding?: string;
  margin?: string;
  height?: string;
  overflow?: string;
  children: JSX.Element | JSX.Element[];
  border?: string;
}
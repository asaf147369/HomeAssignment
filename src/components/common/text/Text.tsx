import styled from 'styled-components';

const SText = styled.p<Props>`
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
  font-weight: ${({ weight }) => weight};
  margin: ${({ margin }) => margin ? margin : "0"};
  padding: ${({ padding }) => padding};
  text-align: ${({ textAlign }) => textAlign};
  border: ${({ border }) => border};
  cursor: ${({ cursor }) => cursor};
`;

export const Text = (props:Props) => {
  return (
    <SText {...props}>
      {props.children}
    </SText>
  );
};

interface Props {
  size?: string;
  color?: string;
  weight?: string;
  margin?: string;
  padding?: string;
  children: string | string[] | null;
  textAlign?: string;
  border?: string;
  cursor?: string;
}

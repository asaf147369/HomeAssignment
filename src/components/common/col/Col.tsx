import React from 'react';

import styled from 'styled-components';

const SCol = styled.div<Props>`
  display: flex;
  flex: ${({ flex }) => flex};
  flex-direction: ${({ dir }) => dir};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ alignItems }) => alignItems};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border: ${({border}) => border};
  border-radius: ${({ radius }) => radius};
  text-align: ${({textAlign}) => textAlign};
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Col = (props:Props) => {
  return <SCol {...props} />;
};

interface Props {
  flex?: string;
  dir?: string;
  justify?: string;
  alignItems?: string;
  padding?: string;
  margin?: string;
  height?: string;
  width?: string;
  border?: string;
  radius?: string;
  textAlign?: string;
  cursor?: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: any;
}

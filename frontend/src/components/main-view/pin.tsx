import React, { ReactNode } from "react";
import styled from "styled-components";

const Card = styled.div<{ size: string }>`
  margin: 0.9rem 0.625rem;
  padding: 0;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;

  grid-row-end: ${(props) => props.size === "small" && "span 26"};
  grid-row-end: ${(props) => props.size === "medium" && "span 33"};
  grid-row-end: ${(props) => props.size === "big" && "span 45"};
`;

interface Props {
  size: string;
  children: ReactNode;
}

const Pin: React.FC<Props> = ({ size, children }) => {
  return <Card size={size}>{children}</Card>;
};

export default Pin;

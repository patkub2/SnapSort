import React, { Fragment } from "react";
import Image from "next/image";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  position: absolute;
  left: 1rem;
  top: 3rem;
  width: 30rem;
  height: 5rem;
  border: solid 1px #f4f5f6;
  border-radius: 6px;
  overflow: hidden;
  z-index: 1;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.06);
  font-family: "Inter", sans-serif;
  font-family: "Nunito Sans", sans-serif;
`;

const InfoBox = styled.div`
  margin: auto 0;
`;
const StatusBox = styled.div`
  p {
    color: #34383c;
    font-size: 1.6rem;
    font-weight: 500;
    margin: 0;
  }
`;
const MessageBox = styled.div`
  p {
    color: #7a898d;
    margin: 0;
  }
`;

const GreenBorder = styled.div`
  width: 0.5rem;
  height: 100%;
  background-color: #12931e;
`;

const RedBorder = styled(GreenBorder)`
  background-color: #fc6161;
`;

const CloseButton = styled.div`
  margin-left: auto;
  display: flex;
  border-left: solid 1px#f4f5f6;
  &:hover {
    cursor: pointer;
  }

  p {
    font-size: 0.8rem;
    color: #a0a8ac;
    margin: auto 1.3rem;
  }
`;

const Icon = styled(Image)`
  margin: auto 1.2rem;
`;

interface Props {
  options: {
    status: string;
    message: string;
  };
  onClose: () => void;
}

const RegisterLoginPopup: React.FC<Props> = ({ options, onClose }) => {
  let popup;

  if (options.status === "success") {
    popup = (
      <Box>
        <GreenBorder />
        <Icon
          src={"icons/success.svg"}
          alt="success icon"
          width={33}
          height={33}
        />
        <InfoBox>
          <StatusBox>
            <p>Success</p>
          </StatusBox>
          <MessageBox>
            <p>{options.message}</p>
          </MessageBox>
        </InfoBox>
        <CloseButton onClick={onClose}>
          <p>CLOSE</p>
        </CloseButton>
      </Box>
    );
  }

  if (options.status === "error") {
    popup = (
      <Box>
        <RedBorder />
        <Icon
          src={"icons/error.svg"}
          alt="success icon"
          width={33}
          height={33}
        />
        <InfoBox>
          <StatusBox>
            <p>Error</p>
          </StatusBox>
          <MessageBox>
            <p>{options.message}</p>
          </MessageBox>
        </InfoBox>
        <CloseButton onClick={onClose}>
          <p>CLOSE</p>
        </CloseButton>
      </Box>
    );
  }

  return <Fragment>{popup}</Fragment>;
};

export default RegisterLoginPopup;

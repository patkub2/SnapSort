import React, { FC, ReactElement, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: aliceblue;
  margin: 10rem auto;
  width: 25rem;
  height: auto;
  border-radius: 3%;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
`;
export const Input = styled.input`
  border: none;
  border: 2px solid #001049;
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  &::placeholder {
    color: #001049;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  width: 14rem;
`;
export const LogoImage = styled(Image)`
  margin: 2rem 0;
`;

export const Button = styled.button`
  width: 14rem;
  padding: 0.5rem 0;
  border-radius: 10px;
  border: 2px solid #001049;
  background-color: #001049;
  color: #fff;
  &:hover {
    background-color: #fff;
    color: #001049;
    cursor: pointer;
  }
`;

export const LoginLink = styled(Link)`
  text-decoration: none;
  margin-left: 0.3rem;
`;

export const H3 = styled.h3`
  font-size: 0.8rem;
  font-weight: 500;
`;

type ChildProps = {};

const RegistrationForm: FC<ChildProps> = (): ReactElement => {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Box>
      <LogoImage src="logo.svg" alt="Logo of the page" width={60} height={60} />
      <Form onSubmit={submitHandler}>
        <Input type="text" placeholder="Username" ref={usernameInputRef} />
        <Input type="email" placeholder="Email Address" ref={emailInputRef} />
        <Input type="password" placeholder="Password" ref={passwordInputRef} />
        <Input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordInputRef}
        />
        <Button>Sign Up</Button>
      </Form>
      <H3>
        Already have an account?
        <LoginLink href={"/login"}>Log In</LoginLink>
      </H3>
    </Box>
  );
};

export default RegistrationForm;

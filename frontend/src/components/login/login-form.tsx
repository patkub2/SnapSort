import React, { FC, ReactElement, useRef } from "react";
import {
  Box,
  LogoImage,
  Form,
  Input,
  Button,
  H3,
  LoginLink,
} from "../registration/registration-form";

type ChildProps = {};

const LoginForm: FC<ChildProps> = (): ReactElement => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Box>
      <LogoImage src="logo.svg" alt="Logo of the page" width={60} height={60} />
      <Form onSubmit={submitHandler}>
        <Input type="email" placeholder="Email Address" ref={emailInputRef} />
        <Input type="password" placeholder="Password" ref={passwordInputRef} />
        <Button>Log In</Button>
      </Form>
      <H3>
        Need a new account?
        <LoginLink href={"/registration"}>Register Now</LoginLink>
      </H3>
    </Box>
  );
};

export default LoginForm;

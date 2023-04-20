import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);
import {
  Box,
  LogoImage,
  Button,
  H3,
  LoginLink,
} from "../registration/registration-form";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  width: 14rem;
`;

const InputField = styled(Field)`
  border: none;
  border: 2px solid #001049;
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  margin: 1rem 0 0.5rem 0;
  &::placeholder {
    color: #001049;
  }
`;

const ErrorMessage = styled.div`
  font-size: 0.8rem;
  padding: 0 0 0 0.5rem;
  color: orangered;
`;

type ChildProps = {};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Must be at least 8 charakters long.")
    .minLowercase(1, "Must contain at least one lowercase charakter.")
    .minUppercase(1, "Must contain at least one uppercase charakter.")
    .minNumbers(1, "Must contain at least one number.")
    .minSymbols(1, "Must contain at least special charakter."),
});

const LoginForm: FC<ChildProps> = (): ReactElement => {
  const submitHandler = (values: { email: string; password: string }) => {
    console.log(values);
  };

  return (
    <Box>
      <LogoImage src="logo.svg" alt="Logo of the page" width={60} height={60} />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <InputField name="email" placeholder="Address Email" />
            {errors.email && touched.email && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
            <InputField name="password" placeholder="Password" />
            {errors.password && touched.password && (
              <ErrorMessage>{errors.password}</ErrorMessage>
            )}
            <Button type="submit">Log In</Button>
          </StyledForm>
        )}
      </Formik>
      <H3>
        Need a new account?
        <LoginLink href={"/registration"}>Register Now</LoginLink>
      </H3>
    </Box>
  );
};

export default LoginForm;

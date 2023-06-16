import React, { FC, ReactElement, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import axios from "axios";
import { message } from "antd";

YupPassword(Yup);

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

export const InputField = styled(Field)`
  border: none;
  border: 2px solid #001049;
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  margin: 1rem 0 0.5rem 0;
  &::placeholder {
    color: #001049;
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 14rem;
`;

export const LogoImage = styled(Image)`
  margin: 2rem 0;
`;

export const Button = styled.button`
  width: 14rem;
  padding: 0.5rem 0;
  margin-top: 1.5rem;
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

export const ErrorMessage = styled.div`
  font-size: 0.8rem;
  padding: 0 0 0 0.5rem;
  color: orangered;
`;

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Must be at least 4 letters long.")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email format.")
    .required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 charakters long.")
    .minLowercase(1, "Must contain at least one lowercase charakter.")
    .minUppercase(1, "Must contain at least one uppercase charakter.")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

type ChildProps = {};

const RegistrationForm: FC<ChildProps> = (): ReactElement => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isSuccess) {
      timer = setTimeout(() => {
        setIsSuccess(false);
        router.push("/login");
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess, router]);

  const submitHandler = async (
    values: {
      username: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    },
    actions: any
  ) => {
    const newUser = {
      username: values.username,
      password: values.password,
      email: values.email,
    };
    try {
      await axios.post("http://localhost:8080/api/users/register", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      message.success("Your account has been created");
      setIsSuccess(true);
    } catch (error: any) {
      message.error(error.response.data.message ?? "Something went wrong");
    }
  };

  return (
    <Box>
      <LogoImage
        src="icons/logo.svg"
        alt="Logo of the page"
        width={60}
        height={60}
        priority
      />
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <InputField name="username" placeholder="Username" />
            {errors.username && touched.username && (
              <ErrorMessage>{errors.username}</ErrorMessage>
            )}
            <InputField name="email" placeholder="Email Address" />
            {errors.email && touched.email && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
            <InputField
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && touched.password && (
              <ErrorMessage>{errors.password}</ErrorMessage>
            )}
            <InputField
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm Password"
            />
            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <ErrorMessage>{errors.passwordConfirmation}</ErrorMessage>
            )}
            <Button type="submit" disabled={isSuccess}>
              Sign Up
            </Button>
          </StyledForm>
        )}
      </Formik>
      <H3>
        Already have an account?
        <LoginLink href={"/login"}>Log In</LoginLink>
      </H3>
    </Box>
  );
};

export default RegistrationForm;

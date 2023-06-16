import React, { ReactElement, useState } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import YupPassword from "yup-password";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  Box,
  StyledForm,
  InputField,
  LogoImage,
  Button,
  H3,
  LoginLink,
  ErrorMessage,
} from "../registration/registration-form";
import { message } from "antd";

YupPassword(Yup);

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email format.")
    .required("Required"),
  password: Yup.string()
    .min(3, "Must be at least 8 charakters long.")
    // .minLowercase(1, "Must contain at least one lowercase charakter.")
    // .minUppercase(1, "Must contain at least one uppercase charakter.")
    .required("Required"),
});

const LoginForm = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement => {
  const router = useRouter();
  const callbackUrl = (router.query?.callbackUrl as string) ?? "/";
  const submitHandler = async (values: {
    email: string;
    password: string;
  }): Promise<void> => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (result?.error) {
      message.error("Wrong email or password");
    } else {
      message.success("Logging in");
      router.push(callbackUrl);
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
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <StyledForm method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <InputField name="email" placeholder="Address Email" />
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default LoginForm;

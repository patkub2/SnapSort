import React, { Fragment } from "react";
import { getSession } from "next-auth/react";
import LoginForm from "@/components/login/login-form";

export default function LoginPage() {
  return (
    <Fragment>
      <LoginForm csrfToken="" />
    </Fragment>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

import { Fragment } from "react";
import { getSession } from "next-auth/react";

import RegistrationForm from "@/components/registration/registration-form";

export default function RegistrationPage() {
  return (
    <Fragment>
      <RegistrationForm />
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

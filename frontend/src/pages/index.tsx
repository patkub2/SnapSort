import { Fragment } from "react";
import { getSession } from "next-auth/react";

export default function StartPage() {
  return <Fragment></Fragment>;
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
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

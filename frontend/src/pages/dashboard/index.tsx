import React, { Fragment, useEffect } from "react";
import Layout from "@/components/layout/layout";
import { getSession, useSession } from "next-auth/react";

const DashBoard = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(session);
    console.log(status);
  }, []);

  return (
    <Fragment>
      <Layout />
    </Fragment>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default DashBoard;

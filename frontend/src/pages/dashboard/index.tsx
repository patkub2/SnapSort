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

export default DashBoard;

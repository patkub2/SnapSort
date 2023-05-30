import Layout from "@/components/layout/layout";
import { useSession } from "next-auth/react";
import { Fragment, useEffect } from "react";

export default function StartPage() {
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
}

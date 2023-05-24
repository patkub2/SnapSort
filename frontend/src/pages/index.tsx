import { Fragment } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function StartPage() {
  const { data, status } = useSession();
  return (
    <Fragment>
      <nav>
        <ul>
          <Link href={"/registration"}>Register</Link>
        </ul>
        <ul>
          <Link href={"/login"}>Login</Link>
        </ul>
        <ul>
          <Link href={"/dashboard"}>Dashboard</Link>
        </ul>
      </nav>
      <main>
        <h1>Starting Page</h1>
      </main>
    </Fragment>
  );
}

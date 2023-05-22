import { Fragment } from "react";
import Link from "next/link";

export default function StartPage() {
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

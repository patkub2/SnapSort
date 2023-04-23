import { Fragment } from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <Fragment>
      <nav>
        <ul>
          <Link href={"/registration"}>Register</Link>
        </ul>
        <ul>
          <Link href={"/login"}>Login</Link>
        </ul>
      </nav>
      <main>
        <h1>HomePage</h1>
      </main>
    </Fragment>
  );
}

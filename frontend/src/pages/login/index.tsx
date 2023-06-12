import React, { Fragment } from "react";

import LoginForm from "@/components/login/login-form";

export default function LoginPage() {
  return (
    <Fragment>
      <LoginForm csrfToken="" />
    </Fragment>
  );
}

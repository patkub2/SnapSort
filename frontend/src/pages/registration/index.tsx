import { Fragment, useState } from "react";
import { getSession } from "next-auth/react";

import RegistrationForm from "@/components/registration/registration-form";

export default function RegistrationPage() {
  return (
    <Fragment>
      <RegistrationForm />
    </Fragment>
  );
}

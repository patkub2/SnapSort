import RegisterLoginPopup from "@/components/UI/register-login-popup";
import React, { Fragment, useState } from "react";

const TestPage = () => {
  const [isActive, setIsActive] = useState(false);
  const options1 = {
    status: "success",
    message: "Your account has been created.",
  };
  const options2 = {
    status: "error",
    message: "Email currently in use.",
  };

  const onClose = () => {};

  return (
    <Fragment>
      {isActive && <RegisterLoginPopup options={options1} onClose={onClose} />}
      {/* <div style={{ margin: `3rem 0` }}></div> */}
      {/* {isActive && <RegisterLoginPopup options={options2} onClose={onClose} />} */}
      <button onClick={() => setIsActive(true)}>Show</button>
      <button onClick={() => setIsActive(false)}>Hide</button>
    </Fragment>
  );
};

export default TestPage;

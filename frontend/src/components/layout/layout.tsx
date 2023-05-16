import React, { Fragment } from "react";
import MainView from "../main-view/main-view";
import Navigation from "../nav/navigation";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
`;

const Layout = () => {
  return (
    <Box>
      <Navigation />
      <MainView />
    </Box>
  );
};

export default Layout;

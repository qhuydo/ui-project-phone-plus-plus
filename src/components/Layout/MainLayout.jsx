import React from "react";
import { AppBar } from "components/AppBar";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer/Footer";
import StyledToolbar from "components/AppBar/StyledToolbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <AppBar />

      <StyledToolbar sx={{ marginBottom: 1 }} />

      <Container maxWidth="xl" sx={{ bgcolor: "background.default" }}>
        {children ? children : <Outlet />}
      </Container>

      <Footer />
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
};

export default MainLayout;

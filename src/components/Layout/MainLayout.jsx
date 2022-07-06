import { Container } from "@mui/material";
import { AppBar } from "components/AppBar";
import StyledToolbar from "components/AppBar/StyledToolbar";
import { Footer } from "components/Footer";
import PropTypes from "prop-types";
import React from "react";
import { Outlet } from "react-router-dom";

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

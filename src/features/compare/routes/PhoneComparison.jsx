import React from "react";
import { Head } from "components/Head/Head";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Container } from "@mui/material";

export const PhoneComparison = () => {
  return (
    <>
      <Head title={"Compare phones"} />

      <Container>
        <DefaultBreadcrumb currentPage={`Compare`} />
      </Container>
    </>
  );
};

import React from "react";
import { useParams } from "react-router-dom";
import {
  PhoneDetailsContextProvider,
  usePhoneDetailsContext,
} from "features/phones/context";
import { Head } from "components/Head/Head";
import { Container } from "@mui/material";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { PhoneDetailsFirstSection } from "features/phones/components/PhoneDetailSections";

export const PhoneDetails = () => {
  const { id } = useParams();
  return (
    <PhoneDetailsContextProvider phoneId={id}>
      <PhoneDetailsBody />
    </PhoneDetailsContextProvider>
  );
};

export const PhoneDetailsBody = () => {
  const {
    state: { phoneDetails, isLoading },
  } = usePhoneDetailsContext();

  if (isLoading) return null;
  if (!phoneDetails && !isLoading) return null;
  return (
    <>
      <Head title={`${phoneDetails ? phoneDetails.name : "Details"}`} />

      <Container display="block">
        <DefaultBreadcrumb
          currentPage={`${phoneDetails.name}`}
          links={[
            {
              to: "/phone",
              page: phoneDetails.categoryName ?? "Brand",
            },
          ]}
        />

        <PhoneDetailsFirstSection />
      </Container>
    </>
  );
};

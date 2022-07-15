import React from "react";
import { useParams } from "react-router-dom";
import {
  PhoneDetailsContextProvider,
  usePhoneDetailsContext,
} from "features/phones/context";
import { Head } from "components/Head/Head";
import { Container } from "@mui/material";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { PhoneDetailsFirstSection } from "features/phones/components/PhoneDetailHeader";
import NotFound from "features/misc/routes/NotFound";
import PhoneSpecificationSection from "features/phones/components/PhoneSpecificationSection/PhoneSpecificationSection";
import { PhoneCommentSection } from "features/phones/components/PhoneCommentSection";

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
  if (!phoneDetails && !isLoading) return <NotFound />;

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

        <PhoneSpecificationSection />

        <PhoneCommentSection />
      </Container>
    </>
  );
};

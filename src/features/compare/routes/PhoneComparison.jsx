import React, { useMemo } from "react";
import { Head } from "components/Head/Head";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Container } from "@mui/material";
import { PhoneComparisonContextProvider } from "features/compare/context/PhoneComparisonContext";
import { useSearchParams } from "react-router-dom";

export const PhoneComparison = () => {
  const [searchParams] = useSearchParams();
  const ids = useMemo(() => {
    const idList = new Set();
    for (const [key, value] of searchParams) {
      if (key.startsWith("id") && value.length !== 0) {
        idList.add(value);
      }
    }
    // console.log([...idList]);
    return [...idList];
  }, [searchParams]);

  return (
    <PhoneComparisonContextProvider ids={ids}>
      <PhoneComparisonBody />
    </PhoneComparisonContextProvider>
  );
};

const PhoneComparisonBody = () => {
  return (
    <>
      <Head title={"Compare phones"} />

      <Container>
        <DefaultBreadcrumb currentPage={`Compare`} />
      </Container>
    </>
  );
};

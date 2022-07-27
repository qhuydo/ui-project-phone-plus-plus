import React, { useMemo } from "react";
import { Head } from "components/Head/Head";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PhoneComparisonContextProvider } from "features/comparison/context";
import { useSearchParams } from "react-router-dom";
import { ControlSection } from "features/comparison/components";
import { ComparisonSection } from "features/comparison/components/ComparisonSection";

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
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Head title={"Compare phones"} />

      <Container sx={{ mb: 3 }}>
        <DefaultBreadcrumb currentPage={`Compare`} />

        <Typography
          variant={smScreen ? "h4" : "h3"}
          textAlign="center"
          sx={{ py: 1 }}
        >
          Phone Comparison
        </Typography>

        <Typography variant="h6" textAlign="center">
          Compare phone specifications of up to 3 devices at once
        </Typography>

        <ControlSection />

        <ComparisonSection />
      </Container>
    </>
  );
};

import React, { useMemo } from "react";
import { Head } from "components/Head/Head";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  PhoneComparisonContextProvider,
  usePhoneComparisonContext,
} from "features/comparison/context";
import { useSearchParams } from "react-router-dom";
import {
  ControlSection,
  SearchResultPlaceholder,
  ViewModeList,
} from "features/comparison/components";
import { shuffle } from "lodash-es";
import { allPhones } from "features/phones/assets";
import {
  MAX_ITEMS_PER_COMPARISON,
  MAX_RECOMMENDATIONS_PER_COLUMN,
} from "features/comparison/utils";

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
  const {
    state: { phoneDetails },
  } = usePhoneComparisonContext();
  const recommendations = useMemo(() => {
    const recommendedPhones = shuffle(allPhones)
      .filter((phone) => phoneDetails.indexOf(phone) === -1)
      .slice(0, MAX_RECOMMENDATIONS_PER_COLUMN * MAX_ITEMS_PER_COMPARISON);

    let recommendations = [];
    while (recommendedPhones.length) {
      recommendations.push(recommendedPhones.splice(0, 3));
    }
    return recommendations;
  }, [phoneDetails]);

  return (
    <>
      <Head title={"Compare phones"} />

      <Container>
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

        <Stack direction="row" spacing={2}>
          <Box flexGrow={1}>
            <ViewModeList />
          </Box>
          <Grid container flexGrow={1} gap={1}>
            <Grid item xs={4}>
              <SearchResultPlaceholder recommendations={recommendations[0]} />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

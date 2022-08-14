import { Box, Stack } from "@mui/material";
import { APPBAR_LARGE } from "components/AppBar/AppBar";
import ComparisonItemHeader from "features/comparison/components/ComparisonSection/ComparisonItemHeader";
import ComparisonTableGroup from "features/comparison/components/ComparisonSection/ComparisonTableGroup";
import { ViewModeList } from "features/comparison/components/ControlSection";
import { SearchResultPlaceholder } from "features/comparison/components/SearchResultPlaceholder";
import { usePhoneComparisonContext } from "features/comparison/context";
import {
  MAX_ITEMS_PER_COMPARISON,
  MAX_RECOMMENDATIONS_PER_COLUMN,
  TABLE_HEADER_MAX_WIDTH,
} from "features/comparison/utils";
import { allPhones } from "features/phones/assets";
import { useMemo } from "react";

const ComparisonSection = () => {
  const {
    state: { phoneDetails },
  } = usePhoneComparisonContext();

  const recommendations = useMemo(() => {
    const recommendedPhones = allPhones
      .filter((phone) => phoneDetails.indexOf(phone) === -1)
      .slice(0, MAX_RECOMMENDATIONS_PER_COLUMN * MAX_ITEMS_PER_COMPARISON);

    let recommendations = [];
    while (recommendedPhones.length) {
      recommendations.push(recommendedPhones.splice(0, 3));
    }
    return recommendations;
  }, [phoneDetails]);

  const nRecommendations = useMemo(
    () =>
      MAX_ITEMS_PER_COMPARISON -
      (phoneDetails.length > MAX_RECOMMENDATIONS_PER_COLUMN
        ? MAX_ITEMS_PER_COMPARISON
        : phoneDetails.length),
    [phoneDetails?.length]
  );

  return (
    <Stack direction="row" spacing={1}>
      <Stack
        directon="column"
        width={`calc(${phoneDetails.length} * (100% - ${TABLE_HEADER_MAX_WIDTH}px) / ${MAX_ITEMS_PER_COMPARISON} + ${TABLE_HEADER_MAX_WIDTH}px)`}
        spacing={1}
      >
        <Stack
          direction="row"
          width={1}
          position="sticky"
          sx={{
            paddingTop: 2,
            top: APPBAR_LARGE,
            zIndex: 10,
            bgcolor: "background.default",
          }}
        >
          <Box width={TABLE_HEADER_MAX_WIDTH} mr={1}>
            <ViewModeList />
          </Box>

          {phoneDetails.length !== 0 && (
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              flexGrow={1}
            >
              {phoneDetails.map((phone) => (
                <ComparisonItemHeader
                  phone={phone}
                  key={`phone-${phone.id}`}
                  width={`${100 / phoneDetails.length}%`}
                />
              ))}
            </Stack>
          )}
        </Stack>

        <ComparisonTableGroup />
      </Stack>

      {nRecommendations !== 0 && (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          width={`calc(${nRecommendations} * (100% - ${TABLE_HEADER_MAX_WIDTH}px) / ${MAX_ITEMS_PER_COMPARISON})`}
          pt={2}
        >
          {recommendations.slice(0, nRecommendations).map((phones, idx) => (
            <SearchResultPlaceholder
              recommendations={phones}
              key={`placeholder-${idx}`}
              width={1}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default ComparisonSection;

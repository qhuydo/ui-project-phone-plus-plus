import { Box, Stack } from "@mui/material";
import ComparisonItemHeader from "features/comparison/components/ComparisonSection/ComparisonItemHeader";
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
      <Box width={TABLE_HEADER_MAX_WIDTH} mr={1}>
        <ViewModeList />
      </Box>
      {phoneDetails.length !== 0 && (
        <Stack direction="row" flexGrow={1} spacing={1} justifyContent="center">
          {phoneDetails.map((phone) => (
            <ComparisonItemHeader
              phone={phone}
              key={`phone-${phone.id}`}
              width={`${100 / phoneDetails.length}%`}
            />
          ))}
        </Stack>
      )}
      {nRecommendations !== 0 && (
        <Stack direction="row" spacing={2} justifyContent="center">
          {recommendations.slice(0, nRecommendations).map((phones, idx) => (
            <SearchResultPlaceholder
              recommendations={phones}
              key={`placeholder-${idx}`}
              width={`${100 / nRecommendations}%`}
            />
          ))}
        </Stack>
      )}{" "}
    </Stack>
  );
};

export default ComparisonSection;

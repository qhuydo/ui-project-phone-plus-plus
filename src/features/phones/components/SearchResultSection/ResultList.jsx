import {
  PhoneCardContextProvider,
  useSearchResultContext,
} from "features/phones/context";
import { Grid } from "@mui/material";
import { PhoneCard } from "features/phones/components/Card";
import { useMemo } from "react";
import { paginate } from "features/phones/utils";
import NotFoundBanner from "features/misc/components/NotFoundBanner";

const ResultList = () => {
  const {
    state: { allResults, pageLimit, currentPage },
  } = useSearchResultContext();

  const phones = useMemo(() => {
    return paginate(allResults, pageLimit, currentPage);
  }, [allResults, currentPage, pageLimit]);

  return (
    <Grid
      container
      sx={{ width: 1, alignItems: "center", justifyContent: "center" }}
    >
      {phones.length === 0 ? (
        <NotFoundBanner containerWidth="80%" typography="h4" />
      ) : null}
      {phones.map((phone) => (
        <Grid item xs={6} lg={4} xl={3} key={phone.id} p={0.5}>
          <PhoneCardContextProvider phone={phone}>
            <PhoneCard />
          </PhoneCardContextProvider>
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultList;

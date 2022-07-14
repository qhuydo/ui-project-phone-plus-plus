import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { findPhoneByKeyword } from "features/phones/api";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Head } from "components/Head/Head";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import SearchResultSection from "features/phones/components/SearchResultSection/SearchResultSection";
import {
  SearchResultContextProvider,
  useSearchResultContext,
} from "features/phones/context/SearchResultContext";
import FilterColumn from "../components/SearchResultSection/FilterColumn";

const PhoneSearchResult = () => {
  return (
    <SearchResultContextProvider>
      <PhoneSearchResultBody />
    </SearchResultContextProvider>
  );
};

const PhoneSearchResultBody = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [isLoading, setIsLoading] = useState(false);
  const {
    state: { allResults: phones },
    addSearchResult,
  } = useSearchResultContext();

  const keyword = useMemo(() => {
    return searchParams.get("keyword") || "";
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      const phones = await findPhoneByKeyword(
        searchParams.get("keyword") || ""
      );
      addSearchResult(phones);
      // console.log(phones);
    })();
  }, [addSearchResult, searchParams]);

  return (
    <>
      <Head title={`Search results for "${keyword}"`} />
      <Container>
        <DefaultBreadcrumb currentPage={`Search results for "${keyword}"`} />
        <Box
          height={300}
          display="flex"
          sx={(theme) => ({
            my: 1,
            bgcolor: "primary.50",
            border: `2px solid ${theme.palette.divider}`,
            borderRadius: `${theme.shape.borderRadius}px`,
          })}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h1" color="primary.main">
            Banner
          </Typography>
        </Box>

        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            my: 1,
          }}
        >
          Search results for {'"'}
          <b>{keyword}</b>
          {'"'} - {`${phones.length}`}{" "}
          {`${phones.length === 1 ? "result" : "results"}`} found
        </Typography>

        <Grid container>
          <Grid item xs={3}>
            <FilterColumn />
          </Grid>

          <Grid item xs={9}>
            <SearchResultSection />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PhoneSearchResult;

import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { findPhoneAndFilter } from "features/phones/api";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Head } from "components/Head/Head";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import SearchResultSection from "features/phones/components/SearchResultSection/SearchResultSection";
import {
  SearchResultContextProvider,
  useSearchResultContext,
} from "features/phones/context/SearchResultContext";
import FilterColumn from "../components/SearchResultSection/FilterColumn";
import { useDebounce } from "hooks";
import FilterDialog from "features/phones/components/SearchResultSection/FilterDialog";
import { useForm, FormProvider } from "react-hook-form";

const PhoneSearchResult = () => {
  return (
    <SearchResultContextProvider>
      <PhoneSearchResultBody />
    </SearchResultContextProvider>
  );
};

const PhoneSearchResultBody = () => {
  const [searchParams] = useSearchParams();

  const {
    state: { allResults: phones, filterOptions, isLoading, sortBy },
    addSearchResult,
    dispatch,
    changeFilterOptionValues,
  } = useSearchResultContext();

  const debouncedFilterOptions = useDebounce(filterOptions, 100);

  const keyword = useMemo(() => {
    return searchParams.get("keyword") || "";
  }, [searchParams]);

  const form = useForm({
    defaultValues: useMemo(() => filterOptions, [filterOptions]),
  });

  useEffect(() => {
    const subscription = form.watch((value) => changeFilterOptionValues(value));
    return () => subscription.unsubscribe();
  }, [changeFilterOptionValues, form]);

  useEffect(() => {
    (async () => {
      dispatch({ type: "SET_LOADING" });
      const phones = await findPhoneAndFilter(
        searchParams.get("keyword") || "",
        debouncedFilterOptions,
        sortBy
      );
      addSearchResult(phones);
    })();
  }, [addSearchResult, debouncedFilterOptions, dispatch, searchParams, sortBy]);

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
            my: 2,
          }}
        >
          Search results for {'"'}
          <b>{keyword}</b>
          {'"'}{" "}
          {!isLoading && (
            <>
              {" "}
              {` - ${phones.length}`}{" "}
              {`${phones.length === 1 ? "result" : "results"}`} found
            </>
          )}
        </Typography>

        <Box
          width={1}
          justifyContent="end"
          display={{ xs: "flex", lg: "none" }}
          pb={2.5}
        >
          <FormProvider {...form}>
            <FilterDialog />
          </FormProvider>
        </Box>

        <Grid container>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ zIndex: 10 }}
            pr={{ md: 1, lg: 1.25 }}
            display={{ xs: "none", lg: "flex" }}
          >
            <FormProvider {...form}>
              <FilterColumn />
            </FormProvider>
          </Grid>

          <Grid item xs={12} lg={9} pl={{ md: 1, lg: 1.25 }}>
            <SearchResultSection />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PhoneSearchResult;

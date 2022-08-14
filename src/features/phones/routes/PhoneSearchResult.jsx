import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Head } from "components/Head/Head";
import { findPhoneAndFilter } from "features/phones/api";
import { categories } from "features/phones/assets";
import FilterDialog from "features/phones/components/SearchResultSection/FilterDialog";
import SearchResultSection from "features/phones/components/SearchResultSection/SearchResultSection";
import {
  SearchResultContextProvider,
  useSearchResultContext,
} from "features/phones/context/SearchResultContext";
import { useDebounce } from "hooks";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  useSearchParams,
  useParams,
  Link as RouterLink,
} from "react-router-dom";
import { Router } from "routes";
import FilterColumn from "../components/SearchResultSection/FilterColumn";

const PhoneSearchResult = ({ categoryPage }) => {
  const { brand } = useParams();

  return (
    <SearchResultContextProvider
      showBrandFilterOption={!categoryPage}
      initialBrand={brand}
    >
      <PhoneSearchResultBody />
    </SearchResultContextProvider>
  );
};

const PhoneSearchResultBody = () => {
  const [searchParams] = useSearchParams();
  const { brand } = useParams();

  const {
    state: { allResults: phones, filterOptions, isLoading, sortBy },
    addSearchResult,
    dispatch,
    changeFilterOptionValues,
    showBrandFilterOption,
  } = useSearchResultContext();

  const debouncedFilterOptions = useDebounce(filterOptions, 100);

  const keyword = useMemo(() => {
    return searchParams.get("keyword") || "";
  }, [searchParams]);

  const category = useMemo(() => {
    return categories.find((item) => item.key === brand);
  }, [brand]);

  const displayCategory = useMemo(() => {
    return categories.find((item) =>
      brand
        ? item.key === brand
        : phones?.length && item.key === phones[0].category
    );
  }, [brand, phones]);

  const brandName = useMemo(() => {
    return category?.name ?? "category";
  }, [category?.name]);

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
      if (!showBrandFilterOption && !brand) {
        addSearchResult([]);
        return;
      }
      const phones = await findPhoneAndFilter(
        searchParams.get("keyword") || "",
        debouncedFilterOptions,
        sortBy
      );
      addSearchResult(phones);
    })();
  }, [
    addSearchResult,
    brand,
    debouncedFilterOptions,
    dispatch,
    searchParams,
    showBrandFilterOption,
    sortBy,
  ]);

  return (
    <>
      <Head title={`Search results for "${keyword}"`} />

      <Container>
        {showBrandFilterOption && (
          <DefaultBreadcrumb currentPage={`Search results for "${keyword}"`} />
        )}
        {!showBrandFilterOption && (
          <DefaultBreadcrumb currentPage={brandName} />
        )}

        {displayCategory?.banner && (
          <Link
            component={RouterLink}
            to={Router.getPhoneDetailsPage(displayCategory?.bannerPhoneId, "")}
          >
            <Box
              width={1}
              component="img"
              src={displayCategory?.banner}
              sx={{
                objectFit: "cover",
              }}
            />
          </Link>
        )}

        {showBrandFilterOption && (
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
        )}

        {!showBrandFilterOption && (
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              my: 2,
            }}
          >
            {brandName}
          </Typography>
        )}

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

PhoneSearchResult.defaultProps = {
  categoryPage: false,
};

PhoneSearchResult.propTypes = {
  categoryPage: PropTypes.bool,
};

export default PhoneSearchResult;

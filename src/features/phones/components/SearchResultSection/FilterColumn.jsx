import { Stack } from "@mui/material";
import FilterHeader from "./FilterHeader";
import FilterOptions from "./FilterOptions";
import PriceSliderSection from "./PriceSliderSection";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchResultContext } from "features/phones/context";
import { useEffect, useMemo } from "react";

const FilterColumn = () => {
  const {
    state: { filterOptions },
    changeFilterOptionValues,
  } = useSearchResultContext();

  const form = useForm({
    defaultValues: useMemo(() => filterOptions, [filterOptions]),
  });

  useEffect(() => {
    const subscription = form.watch((value) => changeFilterOptionValues(value));
    return () => subscription.unsubscribe();
  }, [changeFilterOptionValues, form]);

  // console.log(filterOptions)

  return (
    <Stack direction="column" spacing={1} alignItems="center" width={1}>
      <FormProvider {...form}>
        <FilterHeader />
        <PriceSliderSection />
        <FilterOptions />
      </FormProvider>
    </Stack>
  );
};

export default FilterColumn;

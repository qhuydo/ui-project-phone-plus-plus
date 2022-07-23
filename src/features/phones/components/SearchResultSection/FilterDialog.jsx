import { useSearchResultContext } from "features/phones/context";
import { useCallback, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Stack } from "@mui/material";
import PriceSliderSection from "features/phones/components/SearchResultSection/PriceSliderSection";
import FilterOptions from "features/phones/components/SearchResultSection/FilterOptions";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useFormContext } from "react-hook-form";

const FilterDialog = () => {
  const { clearAllFilterOptions } = useSearchResultContext();

  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const form = useFormContext();

  const clearAll = useCallback(() => {
    form.reset();
    clearAllFilterOptions();
    setOpen(false);
  }, [clearAllFilterOptions, form]);

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        startIcon={<FilterAltOutlinedIcon />}
      >
        Filter
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={1} alignItems="center" width={1}>
            <PriceSliderSection />
            <FilterOptions />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearAll}>Clear all</Button>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterDialog;

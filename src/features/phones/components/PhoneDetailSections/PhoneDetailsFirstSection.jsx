import { Grid } from "@mui/material";
import PhoneDetailsImage from "features/phones/components/PhoneDetailSections/PhoneDetailsImage";
import PhoneDetailsHeader from "features/phones/components/PhoneDetailSections/PhoneDetailsHeader";

const PhoneDetailsFirstSection = () => {
  return (
    <Grid container alignItems="flex-start" py={2}>
      <Grid item container xs={12} md={6} p={2}>
        <PhoneDetailsImage />
      </Grid>

      <Grid item container xs={12} md={6} p={2}>
        <PhoneDetailsHeader />
      </Grid>
    </Grid>
  );
};

export default PhoneDetailsFirstSection;

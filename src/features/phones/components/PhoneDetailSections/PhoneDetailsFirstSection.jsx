import { Grid, Paper } from "@mui/material";
import PhoneDetailsImage from "features/phones/components/PhoneDetailSections/PhoneDetailsImage";

const PhoneDetailsFirstSection = () => {
  return (
    <Grid container alignItems="flex-start" py={2}>
      <Grid
        item
        container
        xs={12}
        md={6}
        component={Paper}
        variant="outlined"
        p={2}
      >
        <PhoneDetailsImage />
      </Grid>
    </Grid>
  );
};

export default PhoneDetailsFirstSection;

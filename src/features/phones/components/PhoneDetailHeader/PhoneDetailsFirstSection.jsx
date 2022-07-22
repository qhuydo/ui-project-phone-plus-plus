import { Grid } from "@mui/material";
import PhoneDetailsImage from "features/phones/components/PhoneDetailHeader/PhoneDetailsImage";
import PhoneDetailsHeader from "features/phones/components/PhoneDetailHeader/PhoneDetailsHeader";

const PhoneDetailsFirstSection = () => {
  return (
    <Grid
      container
      alignItems="flex-start"
      pt={2}
      pb={0}
      flexDirection={{
        xs: "column-reverse",
        md: "row",
      }}
    >
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

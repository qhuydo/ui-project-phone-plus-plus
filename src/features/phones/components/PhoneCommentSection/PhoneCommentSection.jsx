import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import TotalRatings from "features/phones/components/PhoneCommentSection/TotalRatings";
import { usePhoneDetailsContext } from "features/phones/context";

const PhoneCommentSection = () => {
  const {
    state: { phoneDetails, ratingCount },
  } = usePhoneDetailsContext();

  return (
    <Stack
      component={Paper}
      direction="column"
      spacing={1}
      alignItems="center"
      justifyContent="center"
      variant="outlined"
      p={2}
      my={2}
    >
      <Typography variant="h4" textAlign="center">
        User reviews & ratings
      </Typography>

      <Box width={1}>
        <Divider sx={{ mb: 2 }} />
      </Box>

      <Grid container>
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justifyContent="center"
        >
          <TotalRatings
            avgRating={phoneDetails.ratingPoints}
            ratingCount={ratingCount}
            totalRating={phoneDetails.ratings ? phoneDetails.ratings.length : 0}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PhoneCommentSection;

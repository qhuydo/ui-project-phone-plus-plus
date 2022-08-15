import { Box, Typography } from "@mui/material";
import { FormExchangeAndRefund } from "../Step1/index";

const RefundExchangeStep1 = () => {
  return (
    <>
      <Box
        justifyContent="center"
        sx={{
          border: 1,
          borderColor: "primary.main",
          borderRadius: "8px",
          width: 1000,
        }}
      >
        <Typography variant={"h3"} textAlign="center" my={4} color="secondary">
          Form Exchange - Refund
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center">
          <FormExchangeAndRefund />
        </Box>
      </Box>
    </>
  );
};

export default RefundExchangeStep1;

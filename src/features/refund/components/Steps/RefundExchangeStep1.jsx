import { Box, Typography } from "@mui/material";
import { FormExchangeAndRefund } from "../Step1/index";

const RefundExchangeStep1 = () => {
  return (
    <>
      <Box
        justifyContent="center"
        sx={{ border: 1, borderColor: "primary.main", width: 1000 }}
      >
        <Typography variant={"h3"} textAlign="center" my={4} color="secondary">
          Form Exchange - Refund
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <FormExchangeAndRefund />
        </Box>
        {/* <RefundExchangeStep3></RefundExchangeStep3> */}
      </Box>
    </>
  );
};

export default RefundExchangeStep1;

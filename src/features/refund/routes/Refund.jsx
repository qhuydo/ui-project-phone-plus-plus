import { Box, Container, Typography } from "@mui/material";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Head } from "components/Head/Head";
import Placeholder from "components/Placeholder/Placeholder";
import {
  RefundExchangeStep0,
  RefundExchangeStep1,
  RefundExchangeStep2,
  RefundExchangeStep3,
} from "features/refund/components/Steps";

const Refund = () => {
  return (
    <>
      <Head title={"Refund/Exchange"} />

      <Container sx={{ mb: 3 }}>
        <DefaultBreadcrumb currentPage={"Refunds And Exchanges"} />

        <Typography
          variant={"h3"}
          textAlign="center"
          fontWeight="bold"
          my={5}
          sx={{ textTransform: "uppercase" }}
        >
          Refunds And Exchanges
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <RefundExchangeStep1></RefundExchangeStep1>
        </Box>
        {/* <RefundExchangeStep3></RefundExchangeStep3> */}
      </Container>
    </>
  );
};

export default Refund;

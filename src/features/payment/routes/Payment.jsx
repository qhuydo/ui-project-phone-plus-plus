import { Container, Typography } from "@mui/material";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Head } from "components/Head/Head";
import Placeholder from "components/Placeholder/Placeholder";

const Payment = () => {
  return (
    <>
      <Head title={"Checkout"} />

      <Container sx={{ mb: 3 }}>
        <DefaultBreadcrumb currentPage={"Checkout"} />

        <Typography variant={"h3"} textAlign="center" my={1}>
          Checkout
        </Typography>

        <Placeholder />
      </Container>
    </>
  );
};

export default Payment;

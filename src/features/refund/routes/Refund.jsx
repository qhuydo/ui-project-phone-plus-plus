import { Container, Typography } from "@mui/material";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Head } from "components/Head/Head";
import Placeholder from "components/Placeholder/Placeholder";

const Refund = () => {
  return (
    <>
      <Head title={"Refund/Exchange"} />

      <Container sx={{ mb: 3 }}>
        <DefaultBreadcrumb currentPage={"Refunds And Exchanges"} />

        <Typography variant={"h3"} textAlign="center" my={1}>
          Refunds And Exchanges
        </Typography>

        <Placeholder />
      </Container>
    </>
  );
};

export default Refund;

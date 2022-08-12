import { Box, Button, Stack, Typography, Link } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { RefundSucceed } from "features/refund/assets/index";
import { Link as RouterLink } from "react-router-dom";
import { Router } from "routes";

const FormCompleteRefund = () => {
  return (
    <Stack direction="column" spacing={1}>
      <Stack
        display="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component="img"
          src={RefundSucceed}
          width={{ xs: "100%", sm: 300, md: 450 }}
        />
        <Typography variant="h5">
          The exchange/refunded process is completed. We’re sorry for this
          inconvenience.
        </Typography>
        <Link
          component={RouterLink}
          underline="none"
          color="inherit"
          to={Router.HOME}
        >
          <Button
            startIcon={<NavigateBeforeIcon />}
            sx={{
              marginTop: 2,
            }}
            variant="contained"
          >
            Go Back Home
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default FormCompleteRefund;

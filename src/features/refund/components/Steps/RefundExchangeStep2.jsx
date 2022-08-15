import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Stack, Button } from "@mui/material";
import { RefundProcess } from "../Step2/index";

const RefundExchangeStep2 = () => {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Box
        p={2}
        py={4}
        sx={{
          display: "flex",
          width: 800,
          border: 1,
          borderColor: "primary.main",
          borderRadius: "8px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RefundProcess />
      </Box>

      <Box>
        <Button startIcon={<NavigateNextIcon />} variant="contained" disabled>
          Next step
        </Button>
      </Box>
    </Stack>
  );
};

export default RefundExchangeStep2;

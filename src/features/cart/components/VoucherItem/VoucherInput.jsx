import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";

const voucherInputContainer = {
  display: "flex",
  overflow: "hidden",
  width: "100%",
  maxWidth: { xs: "100%", md: 574 },
  borderRadius: "8px",
};

const voucherInput = {
  bgcolor: (theme) =>
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[200],
  px: 1,
  py: 0.5,
  typography: "body2",
  flexGrow: 1,
  minWidth: 200,
  "&:hover": {
    bgcolor: (theme) =>
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[300],
  },
};

const confirmButton = {
  bgcolor: "secondary.main",
  py: 1,
  px: 2,
  color: "secondary.contrastText",
  borderRadius: "0px",
  "&:hover": {
    bgcolor: (theme) => theme.palette.secondary.dark,
  },
};

export default function VoucherInput() {
  return (
    <Box sx={voucherInputContainer}>
      <InputBase
        id="voucher-input"
        name="voucher"
        type="text"
        placeholder="ENTER YOUR VOUCHER (UPPERCASE ONLY)"
        inputProps={{ required: true }}
        sx={voucherInput}
      />
      <Button type="submit" variant="contained" sx={confirmButton}>
        Confirm
      </Button>
    </Box>
  );
}

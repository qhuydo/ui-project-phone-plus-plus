import {
  Stack,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { ReasonRefund } from "features/refund/assets";
import { useState, useCallback } from "react";

const FormExchangeAndRefund = () => {
  const [reasonId, setReasonId] = useState(1);

  return (
    <Stack direction="column" spacing={5}>
      <TextField
        variant="outlined"
        required
        label="Full name"
        placeholder="Nguyen Duc Huy"
      />
      <TextField
        variant="outlined"
        required
        label="Email"
        placeholder="huycbd@gmail.com"
      />
      <TextField
        variant="outlined"
        required
        label="Phone number"
        placeholder="0901257031"
      />
      <TextField
        variant="outlined"
        required
        label="Content"
        placeholder="My phone is broken during the delivery process" 
      />
      <TextField
        variant="outlined"
        required
        label="Address"
        placeholder="123 Nguyen Van Cu District 5" 
      />
      <TextField
        variant="outlined"
        required
        label="Order ID"
        placeholder="#956897232" 
      />
      <TextField
        variant="outlined"
        required
        label="Choose the problem you want to support"
        placeholder="Product is broken/scratched" 
      />
      <TextField
        variant="outlined"
        required
        label="Choose policy"
        placeholder="Exchange product" 
      />
    </Stack>
  );
};
export default FormExchangeAndRefund;

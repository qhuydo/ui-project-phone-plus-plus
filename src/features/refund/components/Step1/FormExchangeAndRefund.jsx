import {
  Stack,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Link,
} from "@mui/material";
import { ReasonRefund, Policy } from "features/refund/assets";
import { useState, useCallback } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import DropzoneAreaExample from "./DropzoneAreaExample";

const FormExchangeAndRefund = () => {
  const [reasonId, setReasonId] = useState(1);
  const [policyId, setPolicyId] = useState(1);
  const handleReasonChange = useCallback((event) => {
    setReasonId(event.target.value);
  }, []);
  const handlePolicyChange = useCallback((event) => {
    setPolicyId(event.target.value);
  }, []);
  return (
    <Stack direction="column" spacing={3} sx={{ width: 800, pb: 3 }}>
      <TextField
        variant="outlined"
        required
        label="Full name"
        defaultValue="Nguyen Duc Huy"
        placeholder="Enter your full name here"
      />
      <TextField
        variant="outlined"
        required
        label="Email"
        defaultValue="huycbd@gmail.com"
        placeholder="Enter your email here"
      />
      <TextField
        variant="outlined"
        required
        label="Phone number"
        defaultValue="0901257031"
        placeholder="Enter your phone number here"
      />
      <TextField
        variant="outlined"
        required
        label="Content"
        defaultValue="I want to exchange my product"
        placeholder="Enter your content here"
      />
      <TextField
        variant="outlined"
        required
        label="Address"
        defaultValue="227 Nguyen Van Cu District 5 HCMC"
        placeholder="Enter your address here"
      />
      <TextField
        //id="outlined-disabled"
        //disabled
        variant="outlined"
        required
        label="Order ID"
        defaultValue="#956897232"
      />
      <FormControl required fullWidth>
        <InputLabel id="reason-support-id-label" shrink={true}>
          Choose the problem you want to support
        </InputLabel>
        <Select
          labelId="reason-support-id-label"
          id="reason-support-id-select"
          value={reasonId}
          label="Choose the problem you want to support"
          onChange={handleReasonChange}
        >
          {Object.values(ReasonRefund).map((r) => (
            <MenuItem value={r.id} key={r.id}>
              <Typography> {r.reason}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required fullWidth>
        <InputLabel id="policy-id-label" shrink={true}>
          Choose policy
        </InputLabel>
        <Select
          labelId="policy-id-label"
          id="policy-id-select"
          value={policyId}
          label="Choose policy"
          onChange={handlePolicyChange}
        >
          {Object.values(Policy).map((r) => (
            <MenuItem value={r.id} key={r.id}>
              <Typography> {r.type}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Receive 24/7 Support"
        />
      </FormGroup>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
        }}
      >
        <FormGroup sx={{ width: 1000 }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="By checking the boxes, you acknowledge that you have read and agree to the Refund And Exchanges Policy"
          />
        </FormGroup>
        {/* <Link
            href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7"
            target={"_blank"}
          >
            Refund And Exchanges Policy
          </Link> */}
      </Box>
      <h4>Attach Files</h4>
      <DropzoneAreaExample></DropzoneAreaExample>
      <Stack
        width={1}
        direction="row"
        spacing={2}
        justifyContent="center"
        marginTop={4}
      >
        <Button startIcon={<NavigateBeforeIcon />} variant="outlined">
          Go Back
        </Button>
        <Button variant="contained">Submit Form</Button>
      </Stack>
    </Stack>
  );
};
export default FormExchangeAndRefund;

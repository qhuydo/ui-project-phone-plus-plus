import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {
  Stack,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Link,
} from "@mui/material";
import { useAuth } from "features/auth";
import { ReasonRefund, Policy } from "features/refund/assets";
import UserAddressFormSection from "features/refund/components/Step1/UserAddressFormSection";
import UserInfoFormSection from "features/refund/components/Step1/UserInfoFormSection";
import { useRefundContext } from "features/refund/context";
import { getRefundInfoDetailsFromUser } from "features/refund/utils";
import { useCallback, useMemo, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import DropzoneAreaExample from "./DropzoneAreaExample";

const FormExchangeAndRefund = () => {
  const { user } = useAuth();
  const {
    state: { refundInfo, autoFill, selectedOrder },
    dispatch,
  } = useRefundContext();

  const form = useForm({
    defaultValues: useMemo(() => refundInfo, [refundInfo]),
    mode: "onTouched",
  });

  const {
    trigger,
    formState: { isValid },
    reset,
  } = form;

  useEffect(() => {
    if (user && !autoFill) {
      const refundInfo2 = getRefundInfoDetailsFromUser(user, refundInfo);
      dispatch({ type: "SET_REFUND_INFO", payload: refundInfo2 });
      dispatch({ type: "SET_AUTO_FILL_FLAG", payload: true });
      reset(refundInfo2);
    }
  }, [autoFill, dispatch, refundInfo, reset, user]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      dispatch({ type: "SET_REFUND_INFO", payload: value });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, form]);

  const onNextPageButtonClicked = useCallback(async () => {
    await trigger();
    if (isValid) {
      dispatch({ type: "SET_CURRENT_STEP", payload: 2 });
    }
  }, [dispatch, isValid, trigger]);

  const { control, setValue } = form;

  const onTermsAndConditionsChecked = useCallback(
    async (e) => {
      setValue("termsAndConditionsChecked", e.target.checked, {
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const moveBack = useCallback(() => {
    dispatch({ type: "SET_CURRENT_STEP", payload: 0 });
  }, [dispatch]);

  return (
    <FormProvider {...form}>
      <Stack
        direction="column"
        spacing={2}
        sx={{ width: 800, pb: 3, borderRadius: "8px" }}
      >
        <UserInfoFormSection />
        <UserAddressFormSection />

        <TextField
          //id="outlined-disabled"
          //disabled
          InputProps={{ readOnly: true }}
          variant="outlined"
          required
          label="Order ID"
          defaultValue={selectedOrder?.id}
        />

        <FormControl required fullWidth>
          <InputLabel id="reason-support-id-label" shrink={true}>
            Choose the problem you want to support
          </InputLabel>

          <Controller
            control={control}
            name="reasonToRefund"
            render={({ field }) => (
              <Select
                {...field}
                labelId="reason-support-id-label"
                id="reason-support-id-select"
                label="Choose the problem you want to support"
              >
                {Object.values(ReasonRefund).map((r) => (
                  <MenuItem value={r.id} key={r.id}>
                    <Typography> {r.reason}</Typography>
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl required fullWidth>
          <InputLabel id="policy-id-label" shrink={true}>
            Choose policy
          </InputLabel>

          <Controller
            control={control}
            name="policy"
            render={({ field }) => (
              <Select
                {...field}
                labelId="policy-id-label"
                id="policy-id-select"
                label="Choose policy"
              >
                {Object.values(Policy).map((r) => (
                  <MenuItem value={r.id} key={r.id}>
                    <Typography> {r.type}</Typography>
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Stack direction="column">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Receive 24/7 Support"
            />
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              label={
                <Typography>
                  I have read and accept the{" "}
                  <Link
                    href={"https://mui.com/material-ui/react-link/"}
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Refund And Exchanges Policy
                  </Link>
                </Typography>
              }
              color="inherit"
              sx={{ px: 0, width: 1 }}
              control={
                <Controller
                  name="termsAndConditionsChecked"
                  defaultValue={false}
                  control={control}
                  rules={{
                    required:
                      "You need to read the terms and conditions before processing the refund",
                  }}
                  render={({ field: props }) => (
                    <Checkbox
                      {...props}
                      // eslint-disable-next-line react/prop-types
                      value={props.value}
                      //eslint-disable-next-line react/prop-types
                      checked={props.value}
                      //eslint-disable-next-line react/prop-types
                      onChange={onTermsAndConditionsChecked}
                    />
                  )}
                />
              }
            />
          </FormGroup>
        </Stack>

        <h4>Attach Files</h4>

        <DropzoneAreaExample />

        <Stack
          width={1}
          direction="row"
          spacing={2}
          justifyContent="center"
          marginTop={4}
        >
          <Button
            startIcon={<NavigateBeforeIcon />}
            variant="outlined"
            onClick={moveBack}
          >
            Go Back
          </Button>

          <Button
            variant="contained"
            disabled={!isValid}
            onClick={onNextPageButtonClicked}
          >
            Submit Form
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};
export default FormExchangeAndRefund;

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { DeliveryInfo } from "features/payment/components/Info";
import { usePaymentContext } from "features/payment/context";
import { useAccordion } from "hooks";
import { useCallback } from "react";

const DeliveryInfoAccordion = () => {
  const { isOpen, handleChange } = useAccordion();
  const {
    state: { contactDetails },
    dispatch,
  } = usePaymentContext();

  const onEditPageButtonClicked = useCallback(async () => {
    dispatch({ type: "SET_CURRENT_STEP", payload: 0 });
  }, [dispatch]);

  return (
    <Accordion expanded={isOpen} onChange={handleChange} elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        sx={{
          "&:hover": {
            bgcolor: "primary.50",
            color: "primary.main",
          },
          py: 0,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="inherit">
          Contact information & Delivery address
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <DeliveryInfo
          showEditButton
          onEditButtonClicked={onEditPageButtonClicked}
          contactDetails={contactDetails}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default DeliveryInfoAccordion;

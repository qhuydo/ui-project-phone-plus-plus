import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { DeliveryInfo } from "features/payment/components/Info";
import { useAccordion } from "hooks";

const DeliveryInfoAccordion = () => {
  const { isOpen, handleChange } = useAccordion();

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
        <DeliveryInfo showEditButton />
      </AccordionDetails>
    </Accordion>
  );
};

export default DeliveryInfoAccordion;

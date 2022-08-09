import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { OrderInfo } from "features/order/components/OrderInfo";
import { orderType } from "features/order/types";
import { useAccordion } from "hooks";

const OrderAccordion = ({ order }) => {
  const { isOpen, handleChange } = useAccordion();

  return (
    <Accordion expanded={isOpen} onChange={handleChange} elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
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
          Order info
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <OrderInfo order={order} hideTitle />
      </AccordionDetails>
    </Accordion>
  );
};

OrderAccordion.propTypes = {
  order: orderType.isRequired,
};

export default OrderAccordion;

import { Stack } from "@mui/material";
import ShipmentStatusOverview from "features/order/components/ShipmentStatus/ShipmentStatusOverview";
import ShipmentStatusTable from "features/order/components/ShipmentStatus/ShipmentStatusTable";

const ShipmentStatus = () => {
  return (
    <Stack direction="column" spacing={1}>
      <ShipmentStatusOverview />
      <ShipmentStatusTable />
    </Stack>
  );
};

export default ShipmentStatus;

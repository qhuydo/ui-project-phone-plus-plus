import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import PendingIcon from "@mui/icons-material/Pending";
import {
  Paper,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  Stack,
  Link,
} from "@mui/material";
import {
  SpecsTableRow,
  BorderlessTableCell,
  BorderlessTableRow,
} from "components/Table";
import { useOrderTrackingContext } from "features/order/context";
import { ORDER_STEP_STATUS } from "features/order/utils";
import { STORES } from "features/stores/assets";

// TODO refactor this file
const ShipmentStatusTable = () => {
  const {
    state: { order },
  } = useOrderTrackingContext();

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <SpecsTableRow>
            <BorderlessTableCell
              sx={{
                width: 400,
                maxWidth: 400,
              }}
            >
              <Typography variant="h6">Status</Typography>
            </BorderlessTableCell>

            <BorderlessTableCell
              sx={{
                width: 300,
                maxWidth: 300,
              }}
            >
              <Typography variant="h6">Date</Typography>
            </BorderlessTableCell>

            <BorderlessTableCell
              sx={{
                width: 400,
                maxWidth: 400,
              }}
            >
              <Typography variant="h6">Location</Typography>
            </BorderlessTableCell>

            <BorderlessTableCell sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Activity</Typography>
            </BorderlessTableCell>
          </SpecsTableRow>
        </TableHead>

        <TableBody>
          {order.status.reduce((row, status, rowIdx) => {
            return [
              ...row,
              ...(status.date ?? ["123"]).map((_, idx) => (
                <BorderlessTableRow key={`${rowIdx}-${idx}`} sx={{ width: 1 }}>
                  <BorderlessTableCell sx={{ verticalAlign: "top" }}>
                    {idx === 0 && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        {status.status === ORDER_STEP_STATUS.pending && (
                          <CircleIcon color="disabled" />
                        )}
                        {status.status === ORDER_STEP_STATUS.loading && (
                          <PendingIcon color="primary" />
                        )}
                        {status.status === ORDER_STEP_STATUS.done && (
                          <CheckCircleIcon color="primary" />
                        )}

                        <Typography>{status.statusLabel}</Typography>
                      </Stack>
                    )}
                  </BorderlessTableCell>

                  <BorderlessTableCell sx={{ verticalAlign: "top" }}>
                    {status.date && (
                      <Typography>{status.date[idx] ?? "-"}</Typography>
                    )}
                  </BorderlessTableCell>

                  <BorderlessTableCell sx={{ verticalAlign: "top" }}>
                    {status.fromStore && (
                      <Typography>
                        {status.fromStore[idx] ? (
                          <>
                            <Link>{STORES[status.fromStore[idx]].name}</Link>
                            {", "}
                            {STORES[status.fromStore[idx]].shortAddress}
                          </>
                        ) : (
                          status.location[idx]
                        )}
                      </Typography>
                    )}
                  </BorderlessTableCell>

                  <BorderlessTableCell sx={{ verticalAlign: "top" }}>
                    {status.activity && (
                      <Typography key={idx}>{status.activity[idx]}</Typography>
                    )}
                  </BorderlessTableCell>
                </BorderlessTableRow>
              )),
            ];
          }, [])}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShipmentStatusTable;

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

        <TableBody
        // sx={{ display: "flex", flexDirection: "column-reverse", width: 1 }}
        >
          {order.status.map((status, idx) => (
            <BorderlessTableRow key={idx} sx={{ width: 1 }}>
              <BorderlessTableCell sx={{ verticalAlign: "top" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {status.status === "pending" && (
                    <CircleIcon color="disabled" />
                  )}
                  {status.status === "loading" && (
                    <PendingIcon color="primary" />
                  )}
                  {status.status === "done" && (
                    <CheckCircleIcon color="primary" />
                  )}

                  <Typography>{status.statusLabel}</Typography>
                </Stack>
              </BorderlessTableCell>

              <BorderlessTableCell sx={{ verticalAlign: "top" }}>
                {status.date?.map((date, idx) => (
                  <Typography key={idx}>{date ?? "-"}</Typography>
                ))}
              </BorderlessTableCell>

              <BorderlessTableCell sx={{ verticalAlign: "top" }}>
                {status.fromStore &&
                  status.fromStore.map((store, idx) => (
                    <Typography key={idx}>
                      {store ? (
                        <>
                          <Link>{store.name}</Link>
                          {", "}
                          {store.shortAddress[idx]}
                        </>
                      ) : (
                        status.location[idx]
                      )}
                    </Typography>
                  ))}
              </BorderlessTableCell>

              <BorderlessTableCell sx={{ verticalAlign: "top" }}>
                {status.activity?.map((activity, idx) => (
                  <Typography key={idx}>{activity}</Typography>
                ))}
              </BorderlessTableCell>
            </BorderlessTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShipmentStatusTable;

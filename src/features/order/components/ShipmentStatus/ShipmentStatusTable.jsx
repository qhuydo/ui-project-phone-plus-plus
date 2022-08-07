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
import dayjs from "dayjs";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
import { STORES } from "features/stores/assets";

dayjs.extend(localizedFormat);

const shipmentStatus = [
  {
    status: "pending",
    statusLabel: "Delivery",
    date: null,
    fromStore: null,
    location: null,
    activity: null,
  },
  {
    status: "pending",
    statusLabel: "In transit",
    date: null,
    fromStore: null,
    location: null,
    activity: null,
  },
  {
    status: "pending",
    statusLabel: "Out for delivery",
    date: null,
    fromStore: null,
    location: null,
    activity: null,
  },
  {
    status: "loading",
    statusLabel: "Order packed",
    date: dayjs("2022/08/07 12:12:00", "yyyy/MM/dd hh:mm:ss").format("LLLL"),
    fromStore: "0",
    location: "",
    activity: "Start packing your order",
  },
  {
    // loading, pending, done
    status: "done",
    statusLabel: "Order created",
    date: dayjs("2022/08/07 10:12:00", "yyyy/MM/dd hh:mm:ss").format("LLLL"),
    fromStore: null,
    location: "",
    activity: "",
  },
];

const ShipmentStatusTable = () => {
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
          {shipmentStatus.map((status, idx) => (
            <BorderlessTableRow key={idx} sx={{ width: 1 }}>
              <BorderlessTableCell>
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

              <BorderlessTableCell>
                <Typography>{status.date ? status.date : "-"}</Typography>
              </BorderlessTableCell>

              <BorderlessTableCell>
                <Typography>
                  {status.fromStore ? (
                    <>
                      <Link>{STORES[status.fromStore].name}</Link>
                      {", "}
                      {STORES[status.fromStore].shortAddress}
                    </>
                  ) : (
                    status.location
                  )}
                </Typography>
              </BorderlessTableCell>

              <BorderlessTableCell>
                <Typography>{status.activity}</Typography>
              </BorderlessTableCell>
            </BorderlessTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShipmentStatusTable;

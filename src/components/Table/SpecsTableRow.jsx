import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

export const SpecsTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: theme.palette.background.paper,
  },
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const BorderlessTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: theme.palette.background.paper,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "td, th": {
    border: "none",
  },
}));

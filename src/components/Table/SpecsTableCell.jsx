import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const SpecsTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    typography: "h6",
    fontWeight: "bold",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export const BorderlessTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    typography: "h6",
    fontWeight: "bold",
    borderRight: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRight: "none",
  },
}));

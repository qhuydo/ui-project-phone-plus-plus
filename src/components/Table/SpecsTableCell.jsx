import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const SpecsTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default SpecsTableCell;

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { SpecsTableRow, SpecsTableCell } from "components/Table";
import { TABLE_HEADER_WIDTH, VIEW_MODES } from "features/comparison/utils";
import PropTypes from "prop-types";
import React, { useState, useCallback, useMemo } from "react";

function renderRowData(tableData, viewMode) {
  return (
    <>
      {Object.entries(tableData).map(([key, columnData]) => {
        const columns = columnData.data;
        return viewMode === "SHOW_ONLY_DIFFERENCES" &&
          !columnData.hasDifferences ? (
          <></>
        ) : (
          <SpecsTableRow key={key}>
            <SpecsTableCell
              sx={{
                minWidth: TABLE_HEADER_WIDTH,
                width: TABLE_HEADER_WIDTH,
                maxWidth: TABLE_HEADER_WIDTH,
              }}
            >
              <b>{key}</b>
            </SpecsTableCell>
            {renderColumnData(columns, columnData.hasDifferences, viewMode)}
          </SpecsTableRow>
        );
      })}
    </>
  );
}

function renderColumnData(columns, hasDifferences, viewMode) {
  return (
    <>
      {columns.map((column, idx) => (
        <SpecsTableCell
          sx={{
            verticalAlign: "top",
            width: `${100 / columns.length}%`,
            maxWidth: `${100 / columns.length}%`,
          }}
          key={idx}
        >
          {hasDifferences && viewMode === "HIGHLIGHT_DIFFERENCES" ? (
            <b>{column}</b>
          ) : (
            column
          )}
        </SpecsTableCell>
      ))}
    </>
  );
}

const ComparisonTable = ({ sectionName, tableData, viewMode }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = useCallback((event, isExpanded) => {
    setIsOpen(isExpanded);
  }, []);

  const displaySectionName = useMemo(
    () => sectionName.replaceAll("&amp;", "&"),
    [sectionName]
  );

  // console.log(tableData);

  return (
    <Stack direction="column" spacing={0.5}>
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
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="inherit">
            {displaySectionName}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableBody>{renderRowData(tableData, viewMode)}</TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/*<Divider sx={{ width: 1 }} />*/}
    </Stack>
  );
};

ComparisonTable.propTypes = {
  sectionName: PropTypes.string,
  tableData: PropTypes.shape({
    data: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    hasDifferences: PropTypes.bool,
  }),
  viewMode: PropTypes.oneOf(VIEW_MODES),
};

export default ComparisonTable;

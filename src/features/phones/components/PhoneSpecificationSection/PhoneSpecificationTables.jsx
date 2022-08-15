import { usePhoneDetailsContext } from "features/phones/context";
import PropTypes from "prop-types";
import {
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { SpecsTableCell, SpecsTableRow } from "components/Table";

const PhoneSpecificationTable = ({ spec }) => {
  return (
    <Stack direction="column" spacing={1} width={1} p={1}>
      <Typography variant="h6">
        {spec.section.replaceAll("&amp;", "&")}
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ width: "100%" }}>
          <TableBody>
            {Object.entries(spec.data).map(([key, value]) => {
              return (
                <SpecsTableRow key={key}>
                  <SpecsTableCell>
                    <b>{key}</b>
                  </SpecsTableCell>
                  <SpecsTableCell>{value}</SpecsTableCell>
                </SpecsTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

PhoneSpecificationTable.propTypes = {
  spec: PropTypes.shape({
    section: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  }),
};

const PhoneSpecificationTables = () => {
  const {
    state: {
      phoneDetails: { specs },
    },
  } = usePhoneDetailsContext();

  return (
    <Grid container>
      {specs.map((item, idx) => (
        <Grid item xs={12} md={6} key={idx}>
          <PhoneSpecificationTable spec={item} key={idx} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PhoneSpecificationTables;

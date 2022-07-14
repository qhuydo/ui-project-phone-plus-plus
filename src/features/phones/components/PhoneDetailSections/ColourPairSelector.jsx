import PropTypes from "prop-types";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

const ColourPairSelector = ({ value, onChange, colours }) => {
  return (
    <Stack direction="row" spacing={2} width={1}>
      {colours.map((colour, idx) => (
        <Stack direction="column" spacing={1} key={idx} alignItems="center">
          <Paper
            variant="outlined"
            sx={(theme) => ({
              width: 80,
              height: 80,
              borderWidth: 2,
              borderColor: value === colour ? theme.palette.primary.main : null,
              boxShadow: value === colour ? theme.shadows[3] : null,
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
            })}
            onClick={() => onChange(colour)}
          >
            <Box
              width={0.5}
              height={1}
              sx={{
                bgcolor: colour.colour,
              }}
            />

            <Divider orientation="vertical" sx={{ width: 2 }} flexItem />

            <Box
              width={0.5}
              height={1}
              sx={{
                bgcolor: colour.secondaryColour,
              }}
            />
          </Paper>

          <Typography
            variant="subtitle1"
            color={value === colour ? "primary" : null}
          >
            {colour.colourName}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

ColourPairSelector.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  colours: PropTypes.array,
};

export default ColourPairSelector;

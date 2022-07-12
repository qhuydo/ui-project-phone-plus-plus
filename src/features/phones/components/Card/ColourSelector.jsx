import { Box } from "@mui/material";
import PropTypes from "prop-types";

const ColourSelector = ({
  colours,
  selectedColour: selectedColourObj,
  onColourSelected,
}) => {
  return (
    <Box display="flex" flexDirection="row" height="40px" flexWrap="wrap">
      {colours.map((colourObj) => {
        const colour = colourObj.colour;
        return (
          <Box
            key={colour}
            component="button"
            sx={(theme) => ({
              borderRadius: "50%",
              bgcolor: "transparent",
              border: `2px solid ${
                colour === selectedColourObj.colour
                  ? colour
                  : "rgba(0, 0, 0, 0)"
              }`,
              boxShadow: `${
                colour === selectedColourObj.colour
                  ? theme.shadows[3]
                  : undefined
              }`,
              margin: 0.25,
              padding: 0.5,
              height: "30px",
              width: "30px",
              outlineStyle: "dash",
              "&:hover": {
                cursor: "pointer",
                border: `2px solid ${colour}`,
                boxShadow: theme.shadows[3],
              },
            })}
            onClick={(e) => {
              e.preventDefault();
              return onColourSelected ? onColourSelected(colourObj) : null;
            }}
          >
            <Box
              sx={{
                bgcolor: colour,
                borderRadius: "50%",
                width: "100%",
                paddingBottom: "100%",
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

ColourSelector.defaultProps = {
  colours: [],
  selectedColour: {},
};

ColourSelector.propTypes = {
  colours: PropTypes.arrayOf(PropTypes.object),
  selectedColour: PropTypes.object,
  onColourSelected: PropTypes.func,
};

export default ColourSelector;

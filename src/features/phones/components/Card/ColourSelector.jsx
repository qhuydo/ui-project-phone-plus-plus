import PropTypes from "prop-types";
import { Box } from "@mui/material";

const ColourSelector = ({ colours, selectedColour, onColourSelected }) => {
  return (
    <Box display="flex" flexDirection="row" height="40px" flexWrap="wrap">
      {colours.map((colour) => (
        <Box
          key={colour}
          sx={(theme) => ({
            borderRadius: "50%",
            border: `2px solid ${
              colour === selectedColour ? colour : "rgba(0, 0, 0, 0)"
            }`,
            boxShadow: `${
              colour === selectedColour ? theme.shadows[3] : undefined
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
            return onColourSelected ? onColourSelected(colour) : null;
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
      ))}
    </Box>
  );
};

ColourSelector.defaultProps = {
  colours: [],
  selectedColour: "",
};

ColourSelector.propTypes = {
  colours: PropTypes.arrayOf(PropTypes.string),
  selectedColour: PropTypes.string,
  onColourSelected: PropTypes.func,
};

export default ColourSelector;

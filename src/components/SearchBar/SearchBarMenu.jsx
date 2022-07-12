import {
  Box,
  Button,
  Grow,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { GOLDEN_RATIO } from "utils/constants";
import { useMemo } from "react";

const N_ITEMS = 5;

const searchBarMenu = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  left: "24px",
  width: 1,
  p: 1,
  position: "absolute",
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: "50%",
    left: "50%",
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

const SearchBarMenu = ({ searchResults, shouldShowSearchMenu }) => {
  const result = useMemo(
    () => searchResults.slice(0, N_ITEMS),
    [searchResults]
  );
  return (
    <Grow
      in={shouldShowSearchMenu && searchResults.length !== 0}
      style={{
        transformOrigin: { horizontal: "right", vertical: "top" },
      }}
    >
      <Stack
        direction="column"
        spacing={1}
        component={Paper}
        elevation={0}
        sx={searchBarMenu}
        alignItems="center"
      >
        {result.map((phone, idx) => (
          <ListItemButton
            key={idx}
            disableGutters
            divider
            sx={{
              py: 1,
              px: 1.25,
              mt: "1px",
              width: 1,
            }}
          >
            <Stack spacing={1} direction="row">
              <Box
                component={"img"}
                src={phone.colours[0].thumbnail}
                style={{
                  height: 54,
                  aspectRatio: `${GOLDEN_RATIO}`,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              />

              <ListItemText
                primaryTypographyProps={{
                  variant: "body1",
                }}
                primary={phone.name}
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                      display: "flex",
                      alignItems: "center",
                      color: "text.disabled",
                      alignContent: "center",
                    }}
                  >
                    {phone.versions[0].displaySalePrice}
                  </Typography>
                }
              />
            </Stack>
          </ListItemButton>
        ))}

        {searchResults.length > N_ITEMS && (
          <Button variant="text" sx={{ width: 1 }}>
            Show more results
          </Button>
        )}
      </Stack>
    </Grow>
  );
};

SearchBarMenu.defaultProps = {
  searchResults: [],
};

SearchBarMenu.propTypes = {
  searchResults: PropTypes.array,
  shouldShowSearchMenu: PropTypes.bool,
};

export default SearchBarMenu;

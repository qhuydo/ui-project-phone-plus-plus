import PropTypes from "prop-types";
import { useMemo } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Grid,
  Grow,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { usePhoneComparisonContext } from "features/comparison/context";
import { GOLDEN_RATIO } from "utils/constants";

const N_ITEMS = 8;

const searchBarMenuStyle = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: "60px",
  width: 1,
  p: 1,
  position: "absolute",
  zIndex: 50,
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
  },
  background: "background.paper",
};

const SearchResultsMenu = ({ searchResults, shouldShowSearchMenu }) => {
  const {
    state: { recommendations },
    addPhone,
  } = usePhoneComparisonContext();

  const result = useMemo(
    () => searchResults.slice(0, N_ITEMS),
    [searchResults]
  );

  return (
    <Grow
      in={shouldShowSearchMenu}
      style={{
        transformOrigin: { horizontal: "right", vertical: "top" },
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        component={Paper}
        elevation={0}
        sx={searchBarMenuStyle}
        bgcolor="background.paper"
      >
        <Stack
          direction="column"
          flex={1}
          spacing={1}
          alignItems="start"
          py={1}
          px={1}
        >
          {result.map((item) => (
            <Stack
              direction="row"
              spacing={1.5}
              py={0.5}
              px={0.5}
              key={item.id}
              alignItems="center"
            >
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => addPhone(item.id)}
              >
                Add
              </Button>

              <Typography>{item.name}</Typography>
            </Stack>
          ))}
        </Stack>
        <Divider orientation="vertical" flexItem />

        <Stack
          direction="column"
          flex={1}
          spacing={1}
          alignItems="start"
          py={1}
          px={1}
        >
          <Typography variant="h6">People also search for</Typography>

          <Grid container>
            {recommendations.map((phone) => (
              <Grid
                item
                component={ButtonBase}
                key={phone.id}
                alignItems="start"
                xs={6}
                onClick={() => addPhone(phone.id)}
                sx={{
                  "&:hover": {
                    bgcolor: "primary.50",
                    borderRadius: "8px",
                    color: "primary.main",
                  },
                  color: "text.primary",
                }}
              >
                <Stack p={1} spacing={1} alignItems="center" direction="column">
                  <Box
                    component="img"
                    src={phone.thumbnail}
                    sx={{
                      aspectRatio: `${GOLDEN_RATIO}`,
                      width: 150,
                      objectFit: "cover",
                      border: `1px solid`,
                      borderColor: "divider",
                      borderRadius: "8px",
                    }}
                  />

                  <Typography m={0.5} textAlign="center" color="inherit">
                    {phone.name}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Grow>
  );
};

SearchResultsMenu.defaultProps = {
  searchResults: [],
};

SearchResultsMenu.propTypes = {
  searchResults: PropTypes.array,
  shouldShowSearchMenu: PropTypes.bool,
  onAddButtonPressed: PropTypes.func,
};

export default SearchResultsMenu;

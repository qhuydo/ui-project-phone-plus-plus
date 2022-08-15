import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  ButtonBase,
  Divider,
  Grid,
  Grow,
  Paper,
  Stack,
  Typography,
  ListItemButton,
  ListItemText,
  Button,
  List,
} from "@mui/material";
import { usePhoneComparisonContext } from "features/comparison/context";
import PropTypes from "prop-types";
import { useMemo } from "react";
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
    state: { recommendations, phoneDetails },
    addPhone,
  } = usePhoneComparisonContext();

  const result = useMemo(
    () =>
      searchResults
        .filter((result) => {
          return (
            phoneDetails?.findIndex((phone) => phone.id === result.id) === -1
          );
        })
        .slice(0, N_ITEMS),
    [phoneDetails, searchResults]
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
        <List direction="column" py={1} px={1} sx={{ flex: 1 }}>
          {result.map((item) => (
            <ListItemButton
              key={item.id}
              disableGutters
              divider
              dense
              sx={{
                width: 1,
                display: "flex",
                flexDirection: "row",
              }}
              onClick={() => addPhone(item.id)}
            >
              <Stack spacing={1} direction="row" flexGrow={1}>
                <Box
                  component={"img"}
                  src={item.colours[0].thumbnail}
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
                  primary={item.name}
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
                      {item.versions[0].displaySalePrice}
                    </Typography>
                  }
                />
              </Stack>

              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => addPhone(item.id)}
              >
                Add
              </Button>
            </ListItemButton>
          ))}
        </List>
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

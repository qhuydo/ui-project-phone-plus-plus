import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { NearbyStoresMap } from "features/stores/components";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NearbyStoresMapImg } from "features/stores/assets";

const stores = [
  "Veilstone PHONE++",
  "Pastoria PHONE++",
  "Hearthome PHONE++",
  "Sunshine PHONE++",
  "Eterna PHONE++",
];

const NearbyStoreList = ({ sx }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container px={4}>
      <Grid
        container
        overflow="hidden"
        sx={(theme) => ({
          border: `2px solid rgba(0, 0, 0, 0.12)`,
          borderRadius: `${theme.shape.borderRadius}px`,
          py: 1,
          ...sx,
        })}
      >
        <Grid item xs={12} sm={6}>
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={1}
            height={isSmallScreen ? "200px" : 1}
          >
            <NearbyStoresMap
              srcMap={NearbyStoresMapImg}
              sx={(theme) => ({
                aspectRatio: null,
                width: "95%",
                height: "95%",
                [theme.breakpoints.only("lg")]: {
                  height: "80%",
                },
              })}
              iconSx={{
                width: "40px",
                height: "40px",
              }}
              typographySx={{
                typography: "h6",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack direction="column" spacing={1}>
            <List>
              {stores.map((store) => (
                <ListItem
                  disablePadding
                  key={store}
                  dense={isSmallScreen}
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary={store} />
                    <NavigateNextIcon edge="end" />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Divider />

            <Button>See more</Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

NearbyStoreList.propTypes = {
  sx: PropTypes.any,
};

export default NearbyStoreList;

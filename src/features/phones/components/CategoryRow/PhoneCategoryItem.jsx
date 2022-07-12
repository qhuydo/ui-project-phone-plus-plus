import { Box, Button, Link, Stack, Typography, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import PropTypes from "prop-types";

const PhoneCategoryItem = ({ category }) => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        color: "text.primary",
        "&:hover": {
          color: "primary.main",
        },
      }}
    >
      <Link component={RouterLink} underline="none" to="/" color="inherit">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          height="40px"
          spacing={2}
        >
          <Box
            component="img"
            src={
              theme.palette.mode === "dark"
                ? category.darkModeLogo
                : category.logo
            }
            height="100%"
            width="auto"
            maxWidth="90px"
            style={{
              objectFit: "contain",
            }}
          />

          <Typography fontWeight="bold" color="inherit">
            {category.name}
          </Typography>
        </Stack>
      </Link>
    </Button>
  );
};

PhoneCategoryItem.propTypes = {
  category: PropTypes.object,
};

export default PhoneCategoryItem;

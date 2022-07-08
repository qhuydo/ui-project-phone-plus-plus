import { Box, Card, Link, Stack, SvgIcon } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { GOLDEN_RATIO } from "utils/constants";
import { useCallback, useState } from "react";

const cardStyle = (theme) => ({
  alignItems: "center",
  aspectRatio: `${GOLDEN_RATIO}`,
  borderWidth: `2px`,
  // color: "secondary.main",
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  typography: "caption",
  [theme.breakpoints.up("sm")]: {
    typography: "body1",
    fontWeight: "bold",
  },
  [theme.breakpoints.up("md")]: {
    typography: "h6",
  },
  [theme.breakpoints.up("lg")]: {
    aspectRatio: "auto",
    typography: "body1",
    fontWeight: "bold",
    py: 2,
  },
  "&:hover": {
    // backgroundColor: theme.palette.primary.dark,
    // textDecoration: "underline",
    boxShadow: 5,
    borderColor: "primary.main",
    color: "primary.dark",
    ".start-color": {
      "--color-start": theme.palette.primary.main,
    },
    ".end-color": {
      "--color-stop": theme.palette.secondary.main,
    },
  },
  ".start-color": {
    "--color-start": theme.palette.getContrastText(
      theme.palette.background.default
    ),
  },
  ".end-color": {
    "--color-stop": theme.palette.getContrastText(
      theme.palette.background.default
    ),
  },
});

const iconStyle = (theme) => ({
  width: "40px",
  height: "40px",
  [theme.breakpoints.up("sm")]: {
    width: "52px",
    height: "52px",
  },
  [theme.breakpoints.only("md")]: {
    width: "88px",
    height: "88px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "80px",
    height: "80px",
  },
});

function ServiceCard({
  iconImage: IconImage,
  filledIconImage: FilledIconImage,
  name: serviceName,
}) {
  const [isSelected, setSelected] = useState(false);

  const onMouseOver = useCallback(() => {
    setSelected(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setSelected(false);
  }, []);

  return (
    <Card
      variant="outlined"
      sx={cardStyle}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className="service-card"
    >
      <Link
        color="inherit"
        underline="none"
        fontWeight="inherit"
        fontSize="inherit"
        fontStyle="inherit"
        lineHeight="inherit"
        letterSpacing="inherit"
        component={RouterLink}
        to={`/phones/`}
        style={{ textDecoration: "inherit" }}
      >
        <Stack
          spacing={1}
          direction="column"
          sx={{ py: { xs: 2, sm: 0 } }}
          alignItems="center"
        >
          <SvgIcon
            component={isSelected ? FilledIconImage : IconImage}
            sx={iconStyle}
            className="svg-gradient-wrapper"
            inheritViewBox
          />
          <Box>{serviceName}</Box>
        </Stack>
      </Link>
    </Card>
  );
}

ServiceCard.propTypes = {
  iconImage: PropTypes.elementType,
  filledIconImage: PropTypes.elementType,
  name: PropTypes.string,
};

export default ServiceCard;

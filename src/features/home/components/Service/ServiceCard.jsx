import { Box, Card, CardMedia, Link, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { GOLDEN_RATIO } from "utils/constants";

const cardStyle = (theme) => ({
  alignItems: "center",
  aspectRatio: `${GOLDEN_RATIO}`,
  borderWidth: `2px`,
  background: "#eeeeee",
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
const boxSx = {
  overflow: "hidden",
  cursor: "pointer",
};
function ServiceCard({ image: linkImage, name: serviceName }) {
  const [isSelected, setSelected] = useState(false);

  const onMouseOver = useCallback(() => {
    setSelected(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setSelected(false);
  }, []);
  const cardMediaStyle = useMemo(() => {
    return {
      aspectRatio: 1,
      transition: `transform .3s`,
      transform: `scale(${isSelected ? 1.1 : 1.0})`,
      my: 2,
    };
  }, [isSelected]);

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
          <Box sx={boxSx} position="relative">
            <CardMedia component="img" sx={cardMediaStyle} image={linkImage} />
          </Box>
          <Typography variant="h5" color="primary">
            {serviceName}
          </Typography>
          <Typography variant="body2" sx={{ my: 1, px: 8 }} color="secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Typography>
        </Stack>
      </Link>
    </Card>
  );
}

ServiceCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
};

export default ServiceCard;

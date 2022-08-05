import { Box, Card, CardMedia, Link, Stack, Typography } from "@mui/material";
import { PRIMARY, SECONDARY } from "features/misc/theme/palette";
import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const cardStyle = (theme) => ({
  alignItems: "center",
  borderWidth: `2px`,
  background: "#eeeeee",
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
    // aspectRatio: `${GOLDEN_RATIO}`,
  },
  [theme.breakpoints.up("lg")]: {
    aspectRatio: "auto",
    typography: "body1",
    fontWeight: "bold",
    py: 2,
  },
  "&:hover": {
    boxShadow: 5,
    borderColor: "primary.main",
    color: PRIMARY.dark,
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
          sx={{ pb: 2 }}
          alignItems="center"
        >
          <Box sx={boxSx} position="relative">
            <CardMedia component="img" sx={cardMediaStyle} image={linkImage} />
          </Box>
          <Typography variant="h5" color={PRIMARY.main}>
            {serviceName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ my: 1, px: 8 }}
            color={SECONDARY.main}
          >
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

import PropTypes from "prop-types";
import { useMemo } from "react";
import { Box, CardMedia } from "@mui/material";

const PhoneCardThumbnail = ({ isSelected, boxSx, imageSx }) => {
  const cardMediaStyle = useMemo(() => {
    return {
      width: "inherit",
      height: "inherit",
      transition: `transform .3s`,
      transform: `scale(${isSelected ? 1.1 : 1.0})`,
      ...imageSx,
    };
  }, [imageSx, isSelected]);

  return (
    <Box sx={boxSx} position="relative">
      {/*<CardMedia component="img" image={logo} sx={cardMediaStyle} />*/}
      <CardMedia
        component="img"
        sx={cardMediaStyle}
        image="https://images.unsplash.com/photo-1634403665481-74948d815f03?&fit=crop&w=512&h=512"
      />
    </Box>
  );
};

PhoneCardThumbnail.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  boxSx: PropTypes.any.isRequired,
  imageSx: PropTypes.any,
};

export default PhoneCardThumbnail;

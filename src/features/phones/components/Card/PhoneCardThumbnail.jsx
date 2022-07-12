import { Box, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { GOLDEN_RATIO } from "utils/constants";
import { usePhoneCardContext } from "features/phones/context";

const fallbackImg =
  "https://images.unsplash.com/photo-1629494893504-d41e26a02631?fit=crop&w=828&h=512";

const PhoneCardThumbnail = ({ isSelected, boxSx, imageSx }) => {
  const cardMediaStyle = useMemo(() => {
    return {
      width: "inherit",
      aspectRatio: `${GOLDEN_RATIO}`,
      transition: `transform .3s`,
      transform: `scale(${isSelected ? 1.1 : 1.0})`,
      ...imageSx,
    };
  }, [imageSx, isSelected]);

  const { selectedThumbnail } = usePhoneCardContext();

  return (
    <Box sx={boxSx} position="relative">
      <CardMedia
        component="img"
        sx={cardMediaStyle}
        image={selectedThumbnail ?? fallbackImg}
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

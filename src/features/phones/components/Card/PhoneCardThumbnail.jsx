import { Box, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { FALLBACK_IMG, GOLDEN_RATIO } from "utils/constants";
import { usePhoneCardContext } from "features/phones/context";

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
        image={selectedThumbnail ?? FALLBACK_IMG}
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

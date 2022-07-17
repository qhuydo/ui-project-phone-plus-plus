import { Box, CardMedia, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FALLBACK_IMG, GOLDEN_RATIO } from "utils/constants";
import { usePhoneCardContext } from "features/phones/context";

const skeletonStyle = {
  width: "100%",
  aspectRatio: `${GOLDEN_RATIO}`,
  height: "100%",
};

const PhoneCardThumbnail = ({ isSelected, boxSx, imageSx }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastLoadedImg, setLastLoadedImg] = useState(null);
  const { selectedThumbnail } = usePhoneCardContext();

  const cardMediaStyle = useMemo(() => {
    return {
      width: "inherit",
      aspectRatio: `${GOLDEN_RATIO}`,
      transition: `transform .3s`,
      transform: `scale(${isSelected ? 1.1 : 1.0})`,
      ...imageSx,
    };
  }, [imageSx, isSelected]);

  const cardMediaStyleWhenLoading = useMemo(() => {
    return {
      ...imageSx,
      width: 0,
      height: 0,
    };
  }, [imageSx]);

  const imageLoaded = useCallback(() => {
    setIsLoading(false);
    setLastLoadedImg(selectedThumbnail);
  }, [selectedThumbnail]);

  useEffect(() => {
    if (lastLoadedImg !== selectedThumbnail) {
      setIsLoading(true);
    }
  }, [lastLoadedImg, selectedThumbnail]);

  return (
    <Box sx={boxSx} position="relative">
      {isLoading && <Skeleton variant="rectangular" sx={skeletonStyle} />}

      <CardMedia
        component="img"
        sx={isLoading ? cardMediaStyleWhenLoading : cardMediaStyle}
        image={selectedThumbnail ?? FALLBACK_IMG}
        onLoad={imageLoaded}
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

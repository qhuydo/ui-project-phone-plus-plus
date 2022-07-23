import { alpha, Box, CardMedia, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FALLBACK_IMG, GOLDEN_RATIO } from "utils/constants";
import { usePhoneCardContext } from "features/phones/context";
import BorderIconButton from "components/Button/BorderIconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const skeletonStyle = {
  width: "100%",
  aspectRatio: `${GOLDEN_RATIO}`,
  height: "100%",
};

const PhoneCardThumbnail = ({
  isSelected,
  boxSx,
  imageSx,
  isFavourite,
  toggleFavourite,
}) => {
  const [isLoading, setIsLoading] = useState(false);
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

  const onFavouriteButtonClicked = useCallback(
    (e) => {
      e.preventDefault();
      toggleFavourite && toggleFavourite();
    },
    [toggleFavourite]
  );

  useEffect(() => {
    if (lastLoadedImg !== null && lastLoadedImg !== selectedThumbnail) {
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

      <BorderIconButton
        size="large"
        isSelected={isFavourite}
        onClick={onFavouriteButtonClicked}
        color="error"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          backgroundColor: alpha(`#FFFFFF`, 0.5),
        }}
      >
        {isFavourite ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </BorderIconButton>
    </Box>
  );
};

PhoneCardThumbnail.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  boxSx: PropTypes.any.isRequired,
  imageSx: PropTypes.any,
  isFavourite: PropTypes.bool,
  toggleFavourite: PropTypes.func,
};

export default PhoneCardThumbnail;

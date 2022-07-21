import { Card, CardHeader, Link } from "@mui/material";
import PhoneCardContent from "features/phones/components/Card/PhoneCardContent";
import PhoneCardThumbnail from "features/phones/components/Card/PhoneCardThumbnail";
import PhoneCardTitle from "features/phones/components/Card/PhoneCardTitle";
import { useCallback, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  useFavouritePhoneMap,
  usePhoneCardContext,
} from "features/phones/context";
import { Router } from "routes";

const cardStyle = (theme) => ({
  borderWidth: `2px`,
  transition: theme.transitions.create("border-color"),
  "&:hover": {
    borderColor: theme.palette.primary.main,
    boxShadow: 5,
  },
});

const imageBoxStyle = {
  overflow: "hidden",
  cursor: "pointer",
};

const imageThumbnailStyle = {
  width: 1,
  height: 1,
};

// const cardAreaStyle = {
//   ".MuiCardActionArea-focusHighlight": {
//     bgcolor: "transparent",
//   },
//   cursor: "default",
// };

function PhoneCard() {
  const [isSelected, setSelected] = useState(false);
  const { phone } = usePhoneCardContext();
  const [favourites, toggleFavourite] = useFavouritePhoneMap();

  const onMouseOver = useCallback(() => {
    setSelected(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setSelected(false);
  }, []);

  const isFavourite = useMemo(() => {
    return favourites[phone.id];
  }, [favourites, phone.id]);

  const toggleFavouriteCb = useCallback(() => {
    toggleFavourite(phone.id);
  }, [phone.id, toggleFavourite]);

  return (
    <Card
      variant="outlined"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      sx={cardStyle}
    >
      <Link
        color="inherit"
        underline="none"
        component={RouterLink}
        to={`${Router.getPhoneDetailsPage(phone.id, phone.name)}`}
      >
        {/*<CardActionArea component="div" sx={cardAreaStyle}>*/}
        <PhoneCardThumbnail
          isSelected={isSelected}
          boxSx={imageBoxStyle}
          imageSx={imageThumbnailStyle}
          isFavourite={isFavourite}
          toggleFavourite={toggleFavouriteCb}
        />
        <CardHeader
          sx={{ pb: 0 }}
          title={<PhoneCardTitle isSelected={isSelected} />}
        />
        <PhoneCardContent
          sx={{
            py: 1,
            "&:last-child": {
              py: 1.5,
            },
          }}
          isSelected={isSelected}
        />
        {/*</CardActionArea>*/}
      </Link>
    </Card>
  );
}

export default PhoneCard;

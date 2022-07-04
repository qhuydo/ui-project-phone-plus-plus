import { useCallback, useState } from "react";
import { Card, CardHeader, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PhoneCardThumbnail from "features/phones/components/Card/PhoneCardThumbnail";
import PhoneCardTitle from "features/phones/components/Card/PhoneCardTitle";
import PhoneCardContent from "features/phones/components/Card/PhoneCardContent";

const cardStyle = (theme) => ({
  borderWidth: `2.25px`,
  "&:hover": {
    borderColor: theme.palette.primary.dark,
    boxShadow: 5,
  },
});

const imageBoxStyle = (theme) => ({
  [theme.breakpoints.up("xs")]: {
    height: 200,
  },
  [theme.breakpoints.up("md")]: {
    height: 240,
  },
  [theme.breakpoints.up("lg")]: {
    height: 256,
  },
  overflow: "hidden",
  cursor: "pointer",
});

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

  const onMouseOver = useCallback(() => {
    setSelected(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setSelected(false);
  }, []);

  return (
    <Card
      variant="outlined"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      sx={cardStyle}
    >
      {/*TODO navigate to product details page*/}
      <Link
        color="inherit"
        underline="none"
        component={RouterLink}
        to={`/phones/`}
      >
        {/*<CardActionArea component="div" sx={cardAreaStyle}>*/}
        <PhoneCardThumbnail
          isSelected={isSelected}
          boxSx={imageBoxStyle}
          imageSx={imageThumbnailStyle}
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

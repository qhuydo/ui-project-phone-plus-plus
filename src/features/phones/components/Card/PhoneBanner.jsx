import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Link,
    Typography
} from "@mui/material";
import PhoneCardTitle from "features/phones/components/Card/PhoneCardTitle";
import { useCallback, useState } from "react";
import PhoneCardThumbnail from "./PhoneCardThumbnail";

const cardStyle = {
  borderWidth: `2px`,
};

const cardActionArea = {
  ".MuiCardActionArea-focusHighlight": {
    bgcolor: "transparent",
  },
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gridAutoColumns: "1fr",
  gap: 4,
  cursor: "unset",
};

const imageBoxStyle = (theme) => ({
  [theme.breakpoints.up("xs")]: {
    width: 120,
    height: 120,
    overflow: "visible",
  },
  [theme.breakpoints.up("sm")]: {
    width: 175,
    height: 175,
  },
  [theme.breakpoints.up("lg")]: {
    width: 200,
    height: 200,
  },
  width: 250,
  height: 250,
  overflow: "hidden",
  cursor: "pointer",
});

const imageThumbnailStyle = {
  width: 1,
  height: 1,
};

const cardBoxContainer = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
};

const cardImageBoxContainer = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  alignItems: "center",
};

const buyNowButton = {
  bgcolor: "secondary.main",
  py: 1,
  px: 6,
  mx: 4,
  color: "secondary.contrastText",
  borderRadius: "0px",
  "&:hover": {
    bgcolor: (theme) => theme.palette.secondary.dark,
  },
};

function PhoneBanner() {
  const [isSelected, setSelected] = useState(false);

  const onMouseOver = useCallback(() => {
    setSelected(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setSelected(false);
  }, []);

  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardActionArea sx={cardActionArea} component="div">
        <Box
          sx={cardImageBoxContainer}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          <PhoneCardThumbnail
            isSelected={isSelected}
            boxSx={imageBoxStyle}
            imageSx={imageThumbnailStyle}
          />
        </Box>

        <Box sx={cardBoxContainer}>
          <CardContent component={Box} display="flex" flexDirection="column">
            <Grid container flexDirection="row" columnSpacing={1}>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="start"
                sx={{ pb: 1 }}
              >
                <Typography
                  variant="h6"
                  color="primary.dark"
                  fontWeight="bold"
                  textAlign="center"
                >
                  #OpenUp
                </Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="start"
                sx={{ py: 1 }}
              >
                <Typography
                  variant="h6"
                  color="primary.dark"
                  textAlign="center"
                >
                  To the next generation of
                </Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="start"
                sx={{ py: 1 }}
              >
                <PhoneCardTitle />
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="start"
                sx={{ pt: 1 }}
              >
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to={`/phones/`}
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1.5, cursor: "pointer" }}
                >
                  Learn more
                </Link>
                <Button type="submit" variant="contained" sx={buyNowButton}>
                  Buy now
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default PhoneBanner;

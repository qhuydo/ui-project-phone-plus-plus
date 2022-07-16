import { Box, Rating, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const TotalRatings = ({ ratingCount, avgRating, totalRating }) => {
  return (
    <Stack direction="column" spacing={1} width={0.45}>
      <Stack direction="row" spacing={1} alignItems="center" width={1}>
        <Rating
          size="large"
          value={avgRating}
          precision={0.5}
          sx={{
            mr: 0.5,
            fontSize: "2rem",
          }}
          readOnly
        />

        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography variant="h4">{avgRating}</Typography>
          <Typography
            variant="body1"
            color="text.secondary"
          >{`(${totalRating} ${
            totalRating === 1 ? "rating" : "ratings"
          })`}</Typography>
        </Stack>
      </Stack>

      <Stack direction="column-reverse" width={1}>
        {Object.entries(ratingCount).map(([key, value]) => (
          <Stack direction="row" key={key} spacing={1} alignItems="center">
            <Rating
              size="large"
              value={+key}
              precision={1}
              sx={{
                mr: 0.5,
                fontSize: "1.5rem",
              }}
              readOnly
            />

            <Box display="flex" direction="row" flexGrow={1}>
              <Box
                height={8}
                bgcolor="primary.main"
                sx={{
                  width: `${(value / totalRating) * 100}%`,
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  borderTopRightRadius: value === totalRating ? "8px" : null,
                  borderBottomRightRadius: value === totalRating ? "8px" : null,
                }}
              />
              <Box
                height={8}
                bgcolor="grey.400"
                sx={{
                  width: `${
                    value === 0 ? 100 : (1 - value / totalRating) * 100
                  }%`,
                  borderTopLeftRadius: value === 0 ? "8px" : null,
                  borderBottomLeftRadius: value === 0 ? "8px" : null,
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              />
            </Box>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ width: "100px" }}
            >{`${value} ${value === 1 ? "rating" : "ratings"}`}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

TotalRatings.propTypes = {
  ratingCount: PropTypes.object,
  avgRating: PropTypes.number,
  totalRating: PropTypes.number,
};

export default TotalRatings;

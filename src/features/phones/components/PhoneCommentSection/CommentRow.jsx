import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CommentRow = ({ comment, phone }) => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container py={2} alignItems="start">
      <Grid
        item
        md={2.5}
        px={{ xs: 0, md: 1 }}
        display={{ xs: "none", md: "flex" }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack direction="column" alignItems="center">
          <Avatar
            src={comment.avatar}
            variant="circular"
            sx={{
              justifyContent: "center",
              width: 1,
              height: 1,
              maxWidth: 200,
              aspectRatio: "1",
              objectFit: "cover",
              border: `2px solid ${theme.palette.divider}`,
            }}
          />

          <Typography variant="h6" textAlign="center">
            {comment.by}
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="text.secondary"
          >
            {comment.memberRank}
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12} md={9.5}>
        <Stack
          direction="column"
          spacing={1}
          justifyContent="center"
          px={{ xs: 0, md: 1 }}
        >
          <Stack direction="row" spacing={{ xs: 1, md: 0 }} alignItems="center">
            <Avatar
              src={comment.avatar}
              variant="circular"
              sx={{
                display: smScreen ? "flex" : "none",
                justifyContent: "center",
                width: 1,
                height: 1,
                maxWidth: 80,
                aspectRatio: "1",
                objectFit: "cover",
                border: `1px solid ${theme.palette.divider}`,
              }}
            />

            <Stack
              direction="column"
              spacing={0.5}
              display={{ xs: "flex", md: "none" }}
            >
              <Stack
                direction="row"
                flexWrap="wrap"
                spacing={1}
                alignItems="baseline"
              >
                <Typography variant="h6" textAlign="center">
                  {comment.by}
                </Typography>
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  color="text.secondary"
                >
                  {comment.memberRank}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Rating
                  size={smScreen ? "small" : "large"}
                  value={comment.points}
                  precision={0.5}
                  readOnly
                />
                <Typography
                  variant={smScreen ? "body1" : "h6"}
                  fontWeight="bold"
                >
                  {comment.title}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            spacing={{ xs: 1.5, md: 2 }}
            justifyContent="baseline"
            flexWrap="wrap"
          >
            {comment.isVerifiedPurchase && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CheckCircleIcon color="success" />
                <Typography sx={{ color: theme.palette.success.main }}>
                  Verified Purchased
                </Typography>
              </Stack>
            )}

            {comment.location && (
              <Typography color="text.secondary">{`Reviewed in ${comment.location}`}</Typography>
            )}

            {comment.displayTimestamp && (
              <Typography color="text.secondary">{`at ${comment.displayTimestamp}`}</Typography>
            )}
          </Stack>

          <Stack direction="row" flexWrap="wrap" spacing={1}>
            <Typography color="info.main">{phone.name}</Typography>
            {comment.version && (
              <>
                <Divider orientation="vertical" flexItem />
                <Typography color="info.main">
                  {comment.version.name}
                </Typography>
              </>
            )}

            {comment.colour && (
              <>
                <Divider orientation="vertical" flexItem />
                <Typography color="info.main">
                  {comment.colour.colourName}
                </Typography>
              </>
            )}
          </Stack>

          {comment.comment.split("\n").map((i, key) => {
            return <Typography key={key}>{i}</Typography>;
          })}
          {comment.nHelpful && (
            <Typography variant="caption">{`${comment.nHelpful} ${
              comment.nHelpful === 1 ? "person" : "people"
            } found this helpful`}</Typography>
          )}

          <Stack direction="row" spacing={1}>
            <Button variant="outlined">Helpful</Button>
            <Button sx={{ color: "text.primary" }}>Report abuse</Button>
          </Stack>

          <Stack direction="row" spacing={1} overflow="auto">
            {comment.images.map((image, idx) => (
              <Box
                pt={2}
                key={idx}
                component="img"
                src={image}
                maxHeight={160}
                sx={{
                  objectFit: "cover",
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

CommentRow.propTypes = {
  comment: PropTypes.object,
  phone: PropTypes.object,
};
export default CommentRow;

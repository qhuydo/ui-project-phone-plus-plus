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
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CommentRow = ({ comment, phone }) => {
  return (
    <Grid container py={2} alignItems="center">
      <Grid item xs={3} justifyContent="center" alignItems="center">
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
              border: (theme) => `2px solid ${theme.palette.divider}`,
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

      <Grid item xs={9}>
        <Stack direction="column" spacing={1} justifyContent="center">
          <Stack direction="row" spacing={1}>
            <Rating
              size="large"
              value={comment.points}
              precision={0.5}
              readOnly
            />
            <Typography variant="h6">{comment.title}</Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            {comment.isVerifiedPurchase && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CheckCircleIcon color="success" />
                <Typography
                  sx={{ color: (theme) => theme.palette.success.main }}
                >
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

          <Stack direction="row" spacing={1}>
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
                // sx={{
                //   aspectRatio: "1",
                // }}
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

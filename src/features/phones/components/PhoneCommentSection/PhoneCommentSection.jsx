import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import TotalRatings from "features/phones/components/PhoneCommentSection/TotalRatings";
import { usePhoneDetailsContext } from "features/phones/context";
import CommentFilterGroups from "features/phones/components/PhoneCommentSection/CommentFilterGroup";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CommentRow from "features/phones/components/PhoneCommentSection/CommentRow";

const PhoneCommentSection = () => {
  const {
    state: { phoneDetails, ratingCount, comments },
  } = usePhoneDetailsContext();

  return (
    <Stack
      component={Paper}
      direction="column"
      spacing={1}
      alignItems="center"
      justifyContent="center"
      variant="outlined"
      p={2}
      my={2}
    >
      <Typography variant="h4" textAlign="center">
        User reviews & ratings
      </Typography>

      <Box width={1}>
        <Divider sx={{ mb: 2 }} />
      </Box>

      <TotalRatings
        avgRating={phoneDetails.ratingPoints}
        ratingCount={ratingCount}
        totalRating={phoneDetails.comments ? phoneDetails.comments.length : 0}
      />

      <Box width={0.8}>
        <Divider sx={{ my: 1 }} />
      </Box>

      <Stack direction="column" spacing={1} width={0.8}>
        <CommentFilterGroups />
        {/*TODO add pagination*/}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="end"
        >
          <Typography>
            Page No. <b>1</b>/1.
          </Typography>

          <IconButton disabled>
            <NavigateBeforeIcon />
          </IconButton>

          <IconButton disabled>
            <NavigateNextIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Box width={0.8}>
        {comments.map((item) => (
          <Box display="flex" flexDirection="column" key={item.id}>
            <Divider />
            <CommentRow comment={item} phone={phoneDetails} />
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default PhoneCommentSection;

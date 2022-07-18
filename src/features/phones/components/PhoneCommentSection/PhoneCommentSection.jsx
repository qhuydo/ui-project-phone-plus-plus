import {
  Box,
  Divider,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import TotalRatings from "features/phones/components/PhoneCommentSection/TotalRatings";
import { usePhoneDetailsContext } from "features/phones/context";
import CommentFilterGroups from "features/phones/components/PhoneCommentSection/CommentFilterGroup";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CommentRow from "features/phones/components/PhoneCommentSection/CommentRow";
import { useCallback, useMemo, useRef } from "react";
import { paginate } from "features/phones/utils";
import { APPBAR_LARGE } from "components/AppBar/AppBar";

const PhoneCommentSection = () => {
  const {
    state: {
      phoneDetails,
      ratingCount,
      comments,
      commentPageLimit,
      currentCommentPage,
      totalCommentPages,
    },
    changeCommentPage,
  } = usePhoneDetailsContext();

  const currentComments = useMemo(
    () => paginate(comments, commentPageLimit, currentCommentPage),
    [commentPageLimit, comments, currentCommentPage]
  );

  const canNavigateToPreviousPage = useMemo(
    () => currentCommentPage !== 1,
    [currentCommentPage]
  );

  const navigateToPreviousPage = useCallback(
    () => changeCommentPage(currentCommentPage - 1),
    [changeCommentPage, currentCommentPage]
  );

  const canNavigateToNextPage = useMemo(
    () => currentComments !== totalCommentPages,
    [currentComments, totalCommentPages]
  );

  const navigateToNextPage = useCallback(
    () => changeCommentPage(currentCommentPage + 1),
    [changeCommentPage, currentCommentPage]
  );

  const changePage2 = useCallback(
    (event, value) => {
      changeCommentPage(value);
    },
    [changeCommentPage]
  );

  const topListRef = useRef(null);

  const executeScroll = useCallback(
    () => window.scrollTo(0, topListRef.current.offsetTop - APPBAR_LARGE),
    []
  );

  return (
    <Stack
      // component={Paper}
      direction="column"
      spacing={1}
      alignItems="center"
      justifyContent="center"
      // variant="outlined"
      p={2}
      my={2}
      ref={topListRef}
    >
      <Typography variant="h3" textAlign="center">
        User reviews & ratings
      </Typography>

      <Box width={1}>
        <Divider sx={{ mb: 2 }} />
      </Box>

      <TotalRatings
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
            Page No. <b>{currentCommentPage}</b>/{totalCommentPages}.
          </Typography>

          <IconButton
            disabled={!canNavigateToPreviousPage}
            onClick={navigateToPreviousPage}
          >
            <NavigateBeforeIcon />
          </IconButton>

          <IconButton
            disabled={!canNavigateToNextPage}
            onClick={navigateToNextPage}
          >
            <NavigateNextIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Box width={0.8}>
        {currentComments.map((item) => (
          <Box display="flex" flexDirection="column" key={item.id}>
            <Divider />
            <CommentRow comment={item} phone={phoneDetails} />
          </Box>
        ))}
      </Box>

      {totalCommentPages > 1 && (
        <Box
          width={0.8}
          display="flex"
          alignItem="center"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            onChange={changePage2}
            count={totalCommentPages}
            page={currentCommentPage}
            onClick={executeScroll}
          />
        </Box>
      )}
    </Stack>
  );
};

export default PhoneCommentSection;

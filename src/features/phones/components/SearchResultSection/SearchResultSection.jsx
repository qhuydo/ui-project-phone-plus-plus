import { Box, IconButton, Pagination, Stack, Typography } from "@mui/material";
import { useSearchResultContext } from "features/phones/context";
import SortByDropdown from "features/phones/components/SearchResultSection/SortByDropdown";
import PageLimitDropdown from "features/phones/components/SearchResultSection/PageLimitDropdown";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useCallback, useMemo, useRef } from "react";
import ResultList from "features/phones/components/SearchResultSection/ResultList";
import { APPBAR_LARGE } from "components/AppBar/AppBar";

const SearchResultSection = () => {
  const {
    changeSortMethod,
    changePageLimit,
    changePage,
    state: { sortBy, pageLimit, currentPage, nPages },
  } = useSearchResultContext();

  const canNavigateToPreviousPage = useMemo(
    () => currentPage !== 1,
    [currentPage]
  );

  const navigateToPreviousPage = useCallback(
    () => changePage(currentPage - 1),
    [changePage, currentPage]
  );

  const canNavigateToNextPage = useMemo(
    () => currentPage !== nPages,
    [currentPage, nPages]
  );

  const navigateToNextPage = useCallback(
    () => changePage(currentPage + 1),
    [changePage, currentPage]
  );

  const changePage2 = useCallback(
    (event, value) => {
      changePage(value);
    },
    [changePage]
  );
  const topListRef = useRef(null);

  const executeScroll = useCallback(
    () => window.scrollTo(0, topListRef.current.offsetTop - APPBAR_LARGE),
    []
  );

  return (
    <Stack direction="column" spacing={2} p={1} ref={topListRef}>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <SortByDropdown value={sortBy} onChange={changeSortMethod} />
        <Stack direction="row" spacing={1} alignItems="center">
          <PageLimitDropdown value={pageLimit} onChange={changePageLimit} />
          <Typography>
            Page No. <b>{currentPage}</b>/{nPages}.
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

      <ResultList />

      {nPages > 1 && (
        <Box
          width={1}
          display="flex"
          alignItem="center"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            onChange={changePage2}
            count={nPages}
            page={currentPage}
            onClick={executeScroll}
          />
        </Box>
      )}
    </Stack>
  );
};

export default SearchResultSection;

import { Stack, Box, Typography } from "@mui/material";
import { ItemNotFoundImg } from "assets";

const SearchResultNotFound = () => {
  return (
    <Stack width={1} spacing={1} justifyContent="center" alignItems="center">
      <Box component="img" src={ItemNotFoundImg} />
      <Typography variant="h4" color="primary.dark">
        We cannot find any results you want
      </Typography>
    </Stack>
  );
};

export default SearchResultNotFound;

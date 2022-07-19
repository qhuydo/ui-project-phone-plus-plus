import { Box, Button, Stack, Typography } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const FilterHeaderContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: 1,
  pt: 1,
};

const iconStyle = () => ({
  mr: 1,
  width: "40px",
  height: "40px",
});

const FilterHeader = () => {
  return (
    <Box sx={FilterHeaderContainer}>
      <Stack direction="row">
        <FilterAltOutlinedIcon sx={iconStyle} />
        <Typography variant={"h4"}>Filter</Typography>
      </Stack>
      <Button variant="text">CLEAR ALL</Button>
    </Box>
  );
};

export default FilterHeader;

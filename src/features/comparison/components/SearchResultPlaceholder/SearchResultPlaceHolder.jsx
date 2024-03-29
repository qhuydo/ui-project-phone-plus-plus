import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { GOLDEN_RATIO } from "utils/constants";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { usePhoneComparisonContext } from "features/comparison/context";

const SearchResultPlaceholder = ({ recommendations, width }) => {
  const { addPhone, dispatch } = usePhoneComparisonContext();

  return (
    <Stack
      direction="column"
      spacing={2}
      px={1}
      pb={2}
      width={width}
      sx={{
        border: "2px dashed rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
      }}
    >
      <Stack
        direction="column"
        py={1}
        spacing={1}
        justifyContent="center"
        alignItems="center"
        color="text.secondary"
      >
        <Box
          sx={{
            aspectRatio: `${GOLDEN_RATIO}`,
            width: 161.8,
            bgcolor: "action.focus",
            borderRadius: "8px",
          }}
        />

        <Typography variant="body2" fontWeight="bold" color="inherit">
          Add a phone to compare
        </Typography>
        <Typography
          variant="body2"
          fontSize="11px"
          color="inherit"
          minHeight={22}
        >
          Click “ADD A PHONE” button or find a phone from the search bar
        </Typography>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ borderColor: "divider", width: 1 }}
          onClick={useCallback(() => {
            dispatch({ type: "SET_FORCE_FOCUS_SEARCH_BAR", payload: true });
          }, [dispatch])}
        >
          Add a phone
        </Button>
      </Stack>
      <Divider flexItem />

      <Typography variant="h6" px={1}>
        Recommendations
      </Typography>

      {recommendations.map((phone) => (
        <Stack
          direction="column"
          alignItems="center"
          spacing={1}
          key={`recommendations-${phone.id}`}
        >
          <Box
            component="img"
            src={phone.thumbnail}
            sx={{
              aspectRatio: `${GOLDEN_RATIO}`,
              width: 161.8,
              objectFit: "cover",
              border: "1px solid",
              borderRadius: "8px",
              borderColor: "divider",
            }}
          />

          <Typography variant="body2" fontWeight="bold">
            {phone.name}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" fontWeight="bold">
              {phone.versions[0].displaySalePrice}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "line-through",
              }}
              fontWeight="bold"
            >
              {phone.versions[0].displayOriginalPrice}
            </Typography>
          </Stack>

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ borderColor: "divider", width: 1 }}
            onClick={() => addPhone(phone.id)}
          >
            Compare
          </Button>
          <Divider key={`divider-${phone.id}`} sx={{ py: 1 }} flexItem />
        </Stack>
      ))}
    </Stack>
  );
};

SearchResultPlaceholder.defaultProps = {
  recommendations: [],
};

SearchResultPlaceholder.propTypes = {
  recommendations: PropTypes.array,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
};

export default SearchResultPlaceholder;

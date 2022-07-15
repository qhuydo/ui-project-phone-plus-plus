import PropTypes from "prop-types";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ItemQuantityInput = ({
  value,
  onQuantityIncremented,
  onQuantityDecremented,
}) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${theme.shape.borderRadius}px`,
      })}
      display="inline-flex"
      alignItems="center"
      width="auto"
    >
      <IconButton onClick={onQuantityDecremented} disabled={value === 1}>
        <RemoveIcon />
      </IconButton>

      <Divider orientation="vertical" flexItem />

      <Typography variant="button" minWidth={32} textAlign="center">
        {value}
      </Typography>

      <Divider orientation="vertical" flexItem />

      <IconButton onClick={onQuantityIncremented}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
};

ItemQuantityInput.propTypes = {
  value: PropTypes.number,
  onQuantityIncremented: PropTypes.func,
  onQuantityDecremented: PropTypes.func,
};

export default ItemQuantityInput;

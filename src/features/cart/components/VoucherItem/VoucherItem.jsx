import { Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const VoucherItem = ({ voucherItem }) => {
  return (
    <Stack
      direction="row"
      display="inline-flex"
      spacing={0.75}
      p={1}
      alignItems="center"
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${theme.shape.borderRadius}px`,
      })}
    >
      <Typography variant="button">{voucherItem.name}</Typography>

      <Divider orientation="vertical" flexItem />

      <Tooltip title={voucherItem.description}>
        <IconButton>
          <InfoOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

VoucherItem.propTypes = {
  voucherItem: PropTypes.object,
};

export default VoucherItem;

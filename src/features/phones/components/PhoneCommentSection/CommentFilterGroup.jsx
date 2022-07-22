import { Stack, ToggleButton, Typography } from "@mui/material";
import { usePhoneDetailsContext } from "features/phones/context";
import { useCallback } from "react";
import BorderlessToggleButtonGroup from "components/Button/BorderlessToggleButtonGroup";
import { filterOptions } from "features/phones/utils";

const CommentFilterGroups = () => {
  const {
    state: { filterCommentBy },
    changeCommentFilter,
  } = usePhoneDetailsContext();

  const onFilterValueChanged = useCallback(
    (e, value) => {
      changeCommentFilter(value);
    },
    [changeCommentFilter]
  );

  return (
    <Stack direction="row" spacing={2} alignItems="center" width={1}>
      <Typography variant="h5">Filter by</Typography>

      <BorderlessToggleButtonGroup
        exclusive
        color="primary"
        value={filterCommentBy}
        onChange={onFilterValueChanged}
      >
        {filterOptions.map((item) => (
          <ToggleButton value={item.key} key={item.key}>
            {item.value}
          </ToggleButton>
        ))}
      </BorderlessToggleButtonGroup>
    </Stack>
  );
};

export default CommentFilterGroups;

import { Stack, ToggleButton, Typography } from "@mui/material";
import { usePhoneDetailsContext } from "features/phones/context";
import { useCallback } from "react";
import { BorderlessToggleButtonGroup } from "components/Button";
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
    <Stack
      direction="row"
      alignItems="center"
      width={1}
      spacing={2}
      flexWrap="wrap"
    >
      <Typography variant="h5" sx={{ whiteSpace: "noWrap" }}>
        Filter by
      </Typography>

      <BorderlessToggleButtonGroup
        exclusive
        color="primary"
        value={filterCommentBy}
        onChange={onFilterValueChanged}
        sx={{ flexWrap: "wrap" }}
      >
        {filterOptions.map((item) => (
          <ToggleButton
            value={item.key}
            key={item.key}
            sx={{ whiteSpace: "noWrap", mr: 1 }}
          >
            {item.value}
          </ToggleButton>
        ))}
      </BorderlessToggleButtonGroup>
    </Stack>
  );
};

export default CommentFilterGroups;

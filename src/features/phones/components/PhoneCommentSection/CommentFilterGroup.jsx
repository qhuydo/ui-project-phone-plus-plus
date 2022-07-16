import { Stack, Typography } from "@mui/material";
import { usePhoneDetailsContext } from "features/phones/context";
import SelectableChip from "components/Chip/SelectableChip";
import { useCallback, useMemo } from "react";

const CommentFilterGroups = () => {
  const {
    state: { filterCommentBy },
    addCommentFilter,
    removeCommentFilter,
  } = usePhoneDetailsContext();

  const onFilterValueChanged = useCallback(
    (value, isSelected) => {
      console.log(value, isSelected);
      if (isSelected) {
        addCommentFilter(value);
      } else {
        removeCommentFilter(value);
      }
    },
    [addCommentFilter, removeCommentFilter]
  );

  const isNewestChipSelected = useMemo(() => {
    return filterCommentBy.findIndex((value) => value === "newest") !== -1;
  }, [filterCommentBy]);

  const isTopHelpfulChipSelected = useMemo(() => {
    return filterCommentBy.findIndex((value) => value === "top-helpful") !== -1;
  }, [filterCommentBy]);

  const is5StarChipSelected = useMemo(() => {
    return filterCommentBy.findIndex((value) => value === "5-star") !== -1;
  }, [filterCommentBy]);

  const is4StarChipSelected = useMemo(() => {
    return filterCommentBy.findIndex((value) => value === "4-star") !== -1;
  }, [filterCommentBy]);

  const is3StarChipSelected = useMemo(() => {
    return filterCommentBy.findIndex((value) => value === "3-star") !== -1;
  }, [filterCommentBy]);

  const is2StarChipSelected = useMemo(() => {
    return filterCommentBy.findIndex((value) => value === "2-star") !== -1;
  }, [filterCommentBy]);

  const is1StarChipSelected = useMemo(() => {
    return filterCommentBy.findIndex((value) => value === "1-star") !== -1;
  }, [filterCommentBy]);

  return (
    <Stack direction="row" spacing={1} alignItems="center" width={1}>
      <Typography variant="h5">Filter by</Typography>

      <SelectableChip
        value={"newest"}
        onChange={onFilterValueChanged}
        isSelected={isNewestChipSelected}
        label={"Newest"}
      />

      <SelectableChip
        value={"top-helpful"}
        onChange={onFilterValueChanged}
        isSelected={isTopHelpfulChipSelected}
        label={"Top helpful"}
      />

      <SelectableChip
        value={"5-star"}
        onChange={onFilterValueChanged}
        isSelected={is5StarChipSelected}
        label={"5 star"}
      />

      <SelectableChip
        value={"4-star"}
        onChange={onFilterValueChanged}
        isSelected={is4StarChipSelected}
        label={"4 star"}
      />

      <SelectableChip
        value={"3-star"}
        onChange={onFilterValueChanged}
        isSelected={is3StarChipSelected}
        label={"3 star"}
      />

      <SelectableChip
        value={"2-star"}
        onChange={onFilterValueChanged}
        isSelected={is2StarChipSelected}
        label={"2 star"}
      />

      <SelectableChip
        value={"1-star"}
        onChange={onFilterValueChanged}
        isSelected={is1StarChipSelected}
        label={"1 star"}
      />
    </Stack>
  );
};

export default CommentFilterGroups;

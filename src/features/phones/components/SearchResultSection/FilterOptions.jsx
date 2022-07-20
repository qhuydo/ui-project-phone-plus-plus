import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useMemo } from "react";
import { useSearchResultContext } from "features/phones/context";
import { useForm, Controller } from "react-hook-form";

// filter options
const filterOptionsList = [
  {
    key: "brand",
    name: "Brand",
    items: [
      { key: "apple", name: "Apple" },
      { key: "samsung", name: "Samsung" },
      {
        key: "nokia",
        name: "Nokia",
      },
      { key: "google", name: "Google Pixel" },
      { key: "sony", name: "Sony" },
      { key: "xiaomi", name: "Xiaomi" },
    ],
  },
  {
    key: "screenSize",
    name: "Screen size",
    items: [
      { key: "below4", name: "Below 4 inch" },
      { key: "from4To49", name: "4 - 4.9 inch" },
      { key: "from5To59", name: "5 - 5.9 inch" },
      { key: "from6To69", name: "6 - 6.9 inch" },
      { key: "above7", name: "7 inch or above" },
    ],
  },
  {
    key: "ram",
    name: "RAM",
    items: [
      { key: "below1gb", name: "1GB or below" },
      { key: "from1gbTo2gb", name: "From 1GB to below 2GB" },
      { key: "from2gbTo4gb", name: "From 2GB to below 4GB" },
      { key: "from4gbTo6gb", name: "From 4GB to below 6GB" },
      { key: "from8gbTo12gb", name: "From 8GB to below 12GB" },
      { key: "from12gbTo16gb", name: "From 12GB to below 16GB" },
      { key: "above16gb", name: "16GB or above" },
    ],
  },
  {
    key: "memory",
    name: "Memory (ROM)",
    items: [
      { key: "below4gb", name: "4GB or below" },
      { key: "from8gb", name: "8GB" },
      { key: "from16gb", name: "16GB" },
      { key: "from32gb", name: "32GB" },
      { key: "from128gb", name: "128GB" },
      { key: "from256gb", name: "256GB" },
      { key: "from512gbOrAbove", name: "512GB or above" },
    ],
  },
  {
    key: "ratings",
    name: "Rating",
    items: [
      { key: "all", name: "All" },
      { key: "from5Stars", name: "From 5 Stars" },
      { key: "from4Stars", name: "From 4 Stars" },
      { key: "from3Stars", name: "From 3 Stars" },
    ],
  },
];

const FilterOptions = () => {
  const {
    state: { collapsedFilterPanels, filterOptions },
    changeFilterPanelCollapseState,
    changeFilterOptionValues,
  } = useSearchResultContext();

  const { control, watch } = useForm({ defaultValues: filterOptions });

  const expansionState = useMemo(() => {
    return filterOptionsList.reduce((map, item) => {
      map[item.name] =
        collapsedFilterPanels.findIndex((key) => key === item.name) === -1;
      return map;
    }, {});
  }, [collapsedFilterPanels]);

  // console.log(filterOptions);

  useEffect(() => {
    const subscription = watch((value) => changeFilterOptionValues(value));
    return () => subscription.unsubscribe();
  }, [changeFilterOptionValues, watch]);

  return (
    <Stack direction="column" spacing={0.5} width={1}>
      {filterOptionsList.map((option, idx) => {
        return (
          <Stack direction="column" spacing={0.5} key={option.name}>
            <Accordion
              key={option.name}
              expanded={expansionState[option.name]}
              onChange={changeFilterPanelCollapseState(option)}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography variant="h6" fontWeight="bold">
                  {option.name}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <FormGroup>
                  {option.items.map((item) => {
                    return (
                      <FormControlLabel
                        control={
                          <Controller
                            control={control}
                            name={`${option.key}.${item.key}`}
                            render={({ field: props }) => (
                              <Checkbox
                                {...props}
                                //eslint-disable-next-line react/prop-types
                                checked={props.value}
                                onChange={(e) =>
                                  //eslint-disable-next-line react/prop-types
                                  props.onChange(e.target.checked)
                                }
                              />
                            )}
                          />
                        }
                        label={item.name}
                        key={item.key}
                      />
                    );
                  })}
                </FormGroup>
              </AccordionDetails>
            </Accordion>

            <Divider sx={{ width: 1 }} key={idx} />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default FilterOptions;

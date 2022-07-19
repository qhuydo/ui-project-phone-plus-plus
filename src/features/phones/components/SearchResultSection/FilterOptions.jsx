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
import React from "react";

// filter options
const filterOptions = [
  {
    name: "Brand",
    items: ["Apple", "Samsung", "Nokia", "Google Pixel", "Sony", "Xiaomi"],
    expand: true,
  },
  {
    name: "Screen size",
    items: [
      "Below 4 inch",
      "4 - 4.9 inch",
      "5 - 5.9 inch",
      "6 - 6.9 inch",
      "7 inch or above",
    ],
    expand: true,
  },
  {
    name: "RAM",
    items: [
      "1GB or below",
      "From 1GB to below 2GB",
      "From 2GB to below 4GB",
      "From 4GB to below 6GB",
      "From 8GB to below 12GB",
      "From 12GB to below 16GB",
      "16GB or above",
    ],
    expand: true,
  },
  {
    name: "Memory (ROM)",
    items: [
      "4GB or below",
      "8GB",
      "16GB",
      "32GB",
      "64GB",
      "128GB",
      "256GB",
      "512GB or above",
    ],
    expand: true,
  },
  {
    name: "Rating",
    items: ["All", "From 5 stars", "From 4 stars", "From 3 stars"],
    expand: true,
  },
];

const handleChange = (option) => (event, newExpanded) => {
  option.expand = newExpanded;
};

const FilterOptions = () => {
  return (
    <Stack direction="column" spacing={0.5} width={1}>
      {filterOptions.map((option, idx) => {
        return (
          <Stack direction="column" spacing={0.5} key={option.name}>
            <Accordion
              key={option.name}
              expanded={option.expand}
              onChange={handleChange(option)}
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
                        control={<Checkbox />}
                        label={item}
                        key={item}
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

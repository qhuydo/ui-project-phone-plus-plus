import GTranslateIcon from "@mui/icons-material/GTranslate";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import * as React from "react";

const languageOptions = [
  {
    value: "eng",
    label: "English",
  },
  {
    value: "vie",
    label: "Vietnamese",
  },
];
const itemContainer = {
  display: "flex",
  alignItems: "center",
};
export default function LanguageSelection() {
  const [language, setLanguage] = React.useState("eng");
  const handleChange = (event) => {
    setLanguage(event.target.value);
    console.log(language);
  };
  return (
    <FormControl>
      <Select
        inputProps={{ style: { fontFamily: "Jetbrains Mono" } }}
        onChange={handleChange}
        value={language}
      >
        {languageOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box sx={itemContainer}>
              <GTranslateIcon />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {option.label}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

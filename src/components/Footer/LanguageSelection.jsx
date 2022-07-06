import GTranslateIcon from "@mui/icons-material/GTranslate";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import * as React from "react";
import { useCallback } from "react";

const languageOptions = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "vi",
    label: "Vietnamese",
  },
];
const itemContainer = {
  display: "flex",
  alignItems: "center",
};

export default function LanguageSelection() {
  const [language, setLanguage] = React.useState("en");

  const handleChange = useCallback((event) => {
    setLanguage(event.target.value);
    // console.log(language);
  }, []);

  return (
    <FormControl>
      <Select onChange={handleChange} value={language} size="small">
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

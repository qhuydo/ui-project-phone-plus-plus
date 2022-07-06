import { Box, Link, styled, Typography } from "@mui/material";
import logo from "assets/logo/logo.svg";

const RotatingImg = styled("img")({
  pointerEvents: "none",
  ["@media (prefers-reduced-motion: no-preference)"]: {
    "@keyframes App-logo-spin": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
    animation: "App-logo-spin infinite 20s linear",
  },
});

const Placeholder = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <RotatingImg
        src={logo}
        className="App-logo"
        alt="logo"
        sx={{ height: "40vmin", pointerEvents: "none", padding: 4 }}
      />
      <Typography variant="h5" fontWeight="bold">
        Placeholder
      </Typography>
      <Link
        color="secondary"
        href="https://mui.com/material-ui/getting-started/overview/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Material UI
      </Link>
    </Box>
  );
};

export default Placeholder;

import { Box, Link, styled, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as logo } from "assets/logo/logo.svg";

const RotatingImg = styled(SvgIcon)({
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
        component={logo}
        inheritViewBox
        className="app-logo"
        alt="logo"
        sx={(theme) => ({
          height: "40vmin",
          width: "40vmin",
          pointerEvents: "none",
          padding: 4,
          ".logo-start-color": {
            "--logo-color-start": theme.palette.primary.main,
          },
          ".logo-end-color": {
            "--logo-color-stop": theme.palette.primary.main,
          },
        })}
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

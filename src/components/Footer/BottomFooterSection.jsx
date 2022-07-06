import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";
import LanguageSelection from "components/Footer/LanguageSelection";

//footer link content
const bottomFooterLinks = [
  {
    title: "Accessibility Help",
    links: "/",
  },
  {
    title: "Terms And Conditions",
    links: "/",
  },
  {
    title: "Cookies",
    links: "/",
  },
  {
    title: "Legals",
    links: "/",
  },
];

const bottomFooterContainer = {
  my: 3,
  display: { xs: "block", sm: "flex" },
  alignItems: { sm: "center" },
  justifyContent: { sm: "space-between" },
};

const BottomFooterSection = () => {
  return (
    <Box sx={bottomFooterContainer}>
      <LanguageSelection />

      <Stack spacing={6} direction="row">
        {bottomFooterLinks.map((item) => {
          return (
            <Link
              underline="none"
              target="_blank"
              rel="noopener noreferrer"
              href={item.links}
              variant="body2"
              color="text.secondary"
              sx={{
                textDecorationColor: "transparent",
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "underline",
                  transition: "text-decoration-color 300ms",
                },
              }}
              key={item.title}
            >
              {item.title}
            </Link>
          );
        })}
      </Stack>

      <Stack
        spacing={1}
        direction="row"
        sx={{ py: { xs: 2, sm: 0 } }}
        alignItems="center"
      >
        <Typography color="text.secondary" variant="body2">
          Stay in the loop?
        </Typography>

        <IconButton
          color="secondary"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/groups/1089774231587514"
          aria-label="facebook"
          title="Facebook"
        >
          <FacebookIcon />
        </IconButton>

        <IconButton
          color="secondary"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/groups/1089774231587514"
          aria-label="twitter"
          title="Twitter"
        >
          <TwitterIcon />
        </IconButton>

        <IconButton
          color="secondary"
          target="_blank"
          rel="noopener noreferrer"
          href="https://youtu.be/dQw4w9WgXcQ"
          aria-label="youtube"
          title="Youtube"
        >
          <YouTubeIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default BottomFooterSection;

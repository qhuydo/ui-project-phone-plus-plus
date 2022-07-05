import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography
} from "@mui/material";
import AppBarLogo from "components/AppBar/AppBarLogo";
import React from "react";
import EmailSubscriber from "./EmailSubcriber";
import LanguageSelection from "./LanguageSelection";

const footerStyle = {
  pt: 3,
  px: 3,
};

//footer link content
const footerLinks = [
  {
    title: "Stores",
    links: ["All Offers", "Online Policy", "Make Your Order"],
  },
  {
    title: "Support",
    links: [
      "Book A Repair",
      "Warranty Info",
      "Tracking Repair",
      "Give Feedback",
      "Privacy Policy",
      "Delivery & Renewing",
    ],
  },
  {
    title: "About us",
    links: ["Our info", "News", "Careers", "Policies", "Contact Us"],
  },
  { title: "Our Stores", links: ["< Nearby Stores >", "IMG"] },
];

//footer link content
const bottomfooterLinks = [
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
  {
    title: "Stay in the loop?",
    links: "/",
  },
];

//footer style background color
const footerBoxContainer = {
  display: "grid",
  gridAutoColumns: "1fr",
  justifyContent: "space-between",
  gap: 4,
  gridTemplateColumns: {
    xs: "1fr",
    sm: "1fr",
    md: "1fr 1.75fr",
    lg: "1fr 2.5fr",
  },
  gridTemplateRows: "auto",
  "& a:not(.MuiIconButton-root)": {
    mt: 1,
    color: "text.secondary",
    typography: "body2",
    "&:hover": {
      color: "text.primary",
    },
  },
};

const copyrightContainer = {
  py: 3,
  display: { xs: "block", sm: "flex" },
  alignItems: { sm: "center" },
  justifyContent: { sm: "space-between" },
};

const footerLinkContainer = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 2fr" },
  gridAutoColumns: "1fr",
  gap: 4,
};

const footerLinkInnerContainer = {
  display: "flex",
  flexDirection: "column",
  color: "text.primary",
};
const bottomFooterContainer = {
  py: 3,
  display: { xs: "block", sm: "flex" },
  alignItems: { sm: "center" },
  justifyContent: { sm: "space-between" },
};

function FooterLinks() {
  return (
    <Box sx={footerLinkContainer}>
      {footerLinks.map((column) => {
        return (
          <Box sx={footerLinkInnerContainer} key={column.title}>
            <Typography fontWeight="bold" variant="body2">
              {column.title}
            </Typography>

            {column.title !== "Our Stores" ? (
              column.links.map((links) => {
                return (
                  <Link
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://youtu.be/dQw4w9WgXcQ"
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1.5 }}
                    key={links}
                  >
                    {links}
                  </Link>
                );
              })
            ) : (
              <>
                <Typography color="blue" variant="body2">
                  {column.links[0]}
                </Typography>
                <Typography variant="h1">{column.links[1]}</Typography>
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default function AppFooter() {
  return (
    <Container component="footer">
      <Divider />
      <Box sx={footerStyle}>
        <Box sx={footerBoxContainer}>
          <div>
            <AppBarLogo />
            <Typography
              variant="subtitle2"
              color="text.primary"
              fontWeight="bold"
              sx={{ mt: 1.5 }}
            >
              Subscribe to our special deals, latest offers
            </Typography>
          </div>

          <FooterLinks />
        </Box>

        <EmailSubscriber />

        <Box sx={copyrightContainer}>
          <Typography color="text.secondary" variant="body2">
            Copyright © {new Date().getFullYear()} HCMUS. All rights reserved.
          </Typography>
        </Box>
        <Box sx={bottomFooterContainer}>
          <LanguageSelection />
          <Box>
            <Stack spacing={6} direction="row">
              {bottomfooterLinks.map((item) => {
                return (
                  <Link
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.links}
                    variant="body1"
                    color="text.secondary"
                    key={item.title}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </Stack>
          </Box>
          <Box sx={{ py: { xs: 2, sm: 0 } }}>
            <Stack spacing={1} direction="row">
              <IconButton
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/groups/1089774231587514"
                aria-label="github"
                title="Reddit"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/groups/1089774231587514"
                aria-label="github"
                title="Reddit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                target="_blank"
                rel="noopener noreferrer"
                href="https://youtu.be/dQw4w9WgXcQ"
                aria-label="github"
                title="GitHub"
              >
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

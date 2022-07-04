import { Box, Container, Divider, Link, Typography } from "@mui/material";
import AppBarLogo from "components/AppBar/AppBarLogo";
import React from "react";
import EmailSubscriber from "./EmailSubcriber";

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

const bottomFooterContainer = {
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

        <Box sx={bottomFooterContainer}>
          <Typography color="text.secondary" variant="body2">
            Copyright © {new Date().getFullYear()} HCMUS. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

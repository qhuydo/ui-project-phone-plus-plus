import { Box, Link, Typography } from "@mui/material";
import { NearbyStoresMap } from "features/stores/components";
import { GOLDEN_RATIO } from "utils/constants";

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
  { title: "Our Stores", links: ["Velstone PHONE++"] },
];

const footerLinkContainer = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 2fr" },
  gridAutoColumns: "1fr",
  gap: 1,
};

const footerLinkInnerContainer = {
  display: "flex",
  flexDirection: "column",
  color: "text.primary",
};

export function FooterLinks() {
  return (
    <Box sx={footerLinkContainer}>
      {footerLinks.map((column) => {
        return (
          <Box sx={footerLinkInnerContainer} key={column.title}>
            <Typography variant="h6" fontWeight="bold" color="secondary">
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
                <Link
                  underline="none"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://youtu.be/dQw4w9WgXcQ"
                  color="text.primary"
                  style={{ fontWeight: "bold" }}
                >
                  {column.links[0]}
                </Link>

                <NearbyStoresMap
                  sx={(theme) => ({
                    width: "120px",
                    aspectRatio: `${GOLDEN_RATIO}`,
                    [theme.breakpoints.up("sm")]: {
                      width: "160px",
                    },
                    [theme.breakpoints.up("md")]: {
                      width: "200px",
                    },
                    [theme.breakpoints.up("lg")]: {
                      width: "280px",
                    },
                  })}
                />
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

import { Box, Link, Typography } from "@mui/material";

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
                <Typography variant="body2">{column.links[0]}</Typography>
                <Typography variant="h1">{column.links[1]}</Typography>
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

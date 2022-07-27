import { Box, Container, Divider, Typography, useTheme } from "@mui/material";
import AppBarLogo from "components/AppBar/AppBarLogo";
import BottomFooterSection from "components/Footer/BottomFooterSection";
import { FooterLinks } from "components/Footer/FooterLinks";
import EmailSubscriber from "./EmailSubcriber";

const footerStyle = {
  pt: 3,
  px: 3,
};

//footer style background color
const footerBoxContainer = {
  display: "grid",
  gridAutoColumns: "1fr",
  justifyContent: "space-between",
  gap: 1.5,
  gridTemplateColumns: {
    xs: "1fr",
    sm: "1fr",
    // md: "1fr 1.75fr",
    lg: "1.25fr 2.5fr",
  },
  gridTemplateRows: "auto",
  "& a:not(.MuiIconButton-root)": {
    position: "relative",
    mt: 1,
    color: "text.secondary",
    typography: "body2",
    textDecorationColor: "transparent",
    "&:hover": {
      color: "primary.main",
      textDecoration: "underline",
      transition: "text-decoration-color 300ms",
    },
  },
};

const copyrightContainer = {
  py: 3,
  display: { xs: "block", sm: "flex" },
  alignItems: { sm: "center" },
  justifyContent: { sm: "space-between" },
};

export default function AppFooter() {
  const theme = useTheme();
  return (
    <Container component="footer">
      <Divider />

      <Box sx={footerStyle}>
        <Box sx={footerBoxContainer}>
          <Box my={1.5}>
            <AppBarLogo
              size={200}
              sx={{
                position: "relative",
                top: "-15%",
                [theme.breakpoints.down("lg")]: {
                  top: "0%",
                },
              }}
            />
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight="bold"
              mt={0.5}
            >
              Subscribe to our special deals, latest offers
            </Typography>

            <EmailSubscriber />
          </Box>

          <FooterLinks />
        </Box>

        <Box sx={copyrightContainer}>
          <Typography color="secondary" variant="body2">
            Copyright © {new Date().getFullYear()} HCMUS. All rights reserved.
          </Typography>
        </Box>

        <BottomFooterSection />
      </Box>
    </Container>
  );
}

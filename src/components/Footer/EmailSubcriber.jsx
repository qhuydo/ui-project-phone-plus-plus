import { Box, FormLabel, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

const Form = styled("form")({});

const emailTitle = {
  mb: 0.5,
  color: "text.secondary",
  fontWeight: "bold",
};

const subscribeInputContainer = {
  display: "flex",
  overflow: "hidden",
  width: { xs: "100%", md: 360 },
  borderRadius: "8px",
};

const subscribeInput = {
  bgcolor: (theme) =>
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[200],
  px: 1,
  py: 0.5,
  typography: "body2",
  flexGrow: 1,
  minWidth: 200,
  "&:hover": {
    bgcolor: (theme) =>
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[300],
  },
};

const subscribeButton = {
  bgcolor: "secondary.main",
  py: 1,
  px: 2,
  color: "secondary.contrastText",
  borderRadius: "0px",
  "&:hover": {
    bgcolor: (theme) => theme.palette.secondary.dark,
  },
};

export default function EmailSubscriber() {
  return (
    <Form>
      <FormLabel htmlFor="email-subscribe" sx={emailTitle}>
        <Typography component={Typography} variant="body2">
          Enter your email to receive news
        </Typography>
      </FormLabel>

      <Box sx={subscribeInputContainer}>
        <InputBase
          id="email-subscribe"
          name="email"
          type="email"
          placeholder="example@email.com"
          inputProps={{ required: true }}
          sx={subscribeInput}
        />
        <Button type="submit" variant="contained" sx={subscribeButton}>
          Subscribe
        </Button>
      </Box>
    </Form>
  );
}

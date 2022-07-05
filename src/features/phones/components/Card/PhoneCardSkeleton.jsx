import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from "@mui/material";
import { GOLDEN_RATIO } from "utils/constants";

const PhoneCardSkeleton = () => {
  return (
    <Card variant="outlined" style={{ borderWidth: "2px", width: "100%" }}>
      <Box width="100%">
        <Skeleton
          style={{
            aspectRatio: `${GOLDEN_RATIO}`,
            width: "100%",
            height: "auto",
          }}
          variant="rectangular"
        />

        <CardHeader
          style={{ paddingBottom: 0 }}
          title={
            <Typography variant="h6" component="div">
              <Skeleton variant="rectangular" />
            </Typography>
          }
        />

        <CardContent
          component={Box}
          display="flex"
          flexDirection="column"
          sx={{
            py: 1,
            "&:last-child": {
              py: 1.5,
            },
          }}
        >
          <Skeleton height="36.5px" variant="rectangular" sx={{ my: 0.5 }} />
          <Skeleton height="36.5px" variant="rectangular" sx={{ my: 0.5 }} />
          <Skeleton height="32.5px" variant="rectangular" sx={{ my: 0.25 }} />
          <Skeleton height="24.5px" sx={{ my: 0.25 }} />
          <Skeleton height="40.5px" variant="rectangular" sx={{ my: 0.25 }} />
          <Skeleton height="40.5px" variant="rectangular" sx={{ my: 0.25 }} />
          <Skeleton height="40.5px" variant="rectangular" sx={{ my: 0.25 }} />
        </CardContent>
      </Box>
    </Card>
  );
};

export default PhoneCardSkeleton;

import { Container, Typography, Stack, Divider } from "@mui/material";
import dayjs from "dayjs";
import { useMemo } from "react";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Head } from "components/Head/Head";
import {
  OrderTrackingContextProvider,
  useOrderTrackingContext,
} from "features/order/context";
import { useSearchParams } from "react-router-dom";
import Router from "routes/router";

const TrackMyOrder = () => {
  const [searchParams] = useSearchParams();

  const id = useMemo(() => {
    return searchParams.get("id") || "";
  }, [searchParams]);

  return (
    <OrderTrackingContextProvider id={id}>
      <TrackMyOrderBody />
    </OrderTrackingContextProvider>
  );
};

const TrackMyOrderBody = () => {
  const {
    state: { order },
  } = useOrderTrackingContext();

  const date = useMemo(
    () => dayjs(order?.timeStamp ?? undefined).format("LLLL"),
    [order?.timeStamp]
  );

  return (
    <>
      <Head title={"Track my order"} />

      <Container sx={{ mb: 3 }}>
        <DefaultBreadcrumb
          currentPage={`Track my order`}
          links={[
            {
              to: Router.ORDERS,
              page: "My orders",
            },
          ]}
        />

        <Typography variant={"h3"} textAlign="center" my={1}>
          Track my order
        </Typography>

        {order && (
          <>
            <Stack direction="column" spacing={1}>
              <Stack direction="row" spacing={1} alignItems="baseline" px={2}>
                <Typography variant="h5" flexWrap="wrap">
                  Order No. <b>#{order.id}</b>
                </Typography>
                <Typography color="text.secondary">({date})</Typography>
              </Stack>
              {/*<Divider flexItem />*/}{" "}
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default TrackMyOrder;

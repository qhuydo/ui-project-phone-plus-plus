import { Container, Typography, Stack, Box } from "@mui/material";
import { SearchAutoComplete } from "components/Autocomplete";
import { DefaultBreadcrumb } from "components/Breadcrumb";
import { Head } from "components/Head/Head";
import { SearchResultsNotFound } from "components/Info";
import dayjs from "dayjs";
import { OrderAccordion } from "features/order/components/Accordion";
import { ShipmentStatus } from "features/order/components/ShipmentStatus";
import {
  OrderTrackingContextProvider,
  useOrderTrackingContext,
} from "features/order/context";
import { useMemo, useCallback } from "react";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    state: { order, orderIds, searchId },
  } = useOrderTrackingContext();

  const date = useMemo(
    () => dayjs(order?.timeStamp ?? undefined).format("LLLL"),
    [order?.timeStamp]
  );

  const onSearchValueChanged = useCallback(
    (e, newValue) => {
      if (newValue) {
        searchParams.set("id", newValue);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams]
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

        <Typography variant={"h3"} textAlign="center" mt={1} mb={2}>
          Track my order
        </Typography>

        <Box width={1} px={2}>
          <SearchAutoComplete
            sx={{ my: 2 }}
            freeSolo
            value={searchId}
            onChange={onSearchValueChanged}
            options={orderIds}
            label="Order ID"
            placeholder="Please enter your Order ID"
          />
        </Box>

        {!order && searchId && <SearchResultsNotFound />}

        {order && (
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={1} alignItems="baseline" px={2}>
              <Typography variant="h5" flexWrap="wrap">
                Order No. <b>#{order.id}</b>
              </Typography>
              <Typography color="text.secondary">({date})</Typography>
            </Stack>
            <OrderAccordion order={order} />
            <ShipmentStatus />
          </Stack>
        )}
      </Container>
    </>
  );
};

export default TrackMyOrder;

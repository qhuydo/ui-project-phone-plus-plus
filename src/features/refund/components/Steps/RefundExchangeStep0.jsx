import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Stack,
  Typography,
  RadioGroup,
  IconButton,
  Box,
  Pagination,
  Button,
} from "@mui/material";
import { SearchAutoComplete } from "components/Autocomplete";
import SearchResultNotFound from "components/Info/SearchResultNotFound";
import { getTotalPages } from "features/phones/utils";
import OrderItem from "features/refund/components/Step0/OrderItem";
import { useRefundContext } from "features/refund/context";
import { useState, useMemo, useEffect, useCallback } from "react";

const RefundExchangeStep0 = () => {
  const [searchId, setSearchId] = useState("");
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    state: { orderIds, allOrders, selectedCartItem, selectedOrder },
    dispatch,
  } = useRefundContext();

  const displayOrders = useMemo(() => {
    setCurrentPage(1);
    const flattenOrders = (allOrders ?? []).reduce((list, order) => {
      return [
        ...list,
        ...order.cartItems.map((item) => ({ order, cartItem: item })),
      ];
    }, []);

    if (searchId?.length === 0) return flattenOrders;
    if (!searchId) return flattenOrders;

    return (
      flattenOrders?.filter(({ order }) =>
        order.id.toLowerCase().includes(searchId.toLowerCase().trim())
      ) ?? []
    );
  }, [allOrders, searchId]);

  const nPages = useMemo(
    () => getTotalPages(displayOrders.length, 100),
    [displayOrders.length]
  );

  const canNavigateToPreviousPage = useMemo(
    () => currentPage !== 1,
    [currentPage]
  );

  const navigateToPreviousPage = useCallback(
    () => setCurrentPage(currentPage - 1),
    [setCurrentPage, currentPage]
  );

  const canNavigateToNextPage = useMemo(
    () => currentPage !== nPages && currentPage > 0 && nPages !== 0,
    [currentPage, nPages]
  );

  const navigateToNextPage = useCallback(
    () => setCurrentPage(currentPage + 1),
    [setCurrentPage, currentPage]
  );

  const setCurrentPage2 = useCallback(
    (event, value) => {
      setCurrentPage(value);
    },
    [setCurrentPage]
  );

  useEffect(() => {
    if (displayOrders.length !== 0) {
      if (value >= displayOrders.length) {
        setValue(0);
        return;
      }
      dispatch({
        type: "SET_SELECTED_ORDER",
        payload: displayOrders[value],
      });
    }
  }, [dispatch, displayOrders, value]);

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const changeSearchId = useCallback((e, newValue) => {
    setSearchId(newValue);
  }, []);

  const canMoveToNextStep = useCallback(() => {
    return !!selectedOrder && !!selectedCartItem;
  }, [selectedCartItem, selectedOrder]);

  const moveToNext = useCallback(() => {
    dispatch({ type: "SET_CURRENT_STEP", payload: 1 });
  }, [dispatch]);

  return (
    <Stack direction="column" spacing={2} width={1}>
      <Typography variant="h6">
        Search the order you want to exchange or refund{" "}
      </Typography>

      <SearchAutoComplete
        sx={{ my: 2 }}
        freeSolo
        value={searchId}
        onChange={changeSearchId}
        options={orderIds}
        label="Find the order by Order ID, Phone Name or Phone Brand...."
        placeholder="Please enter your Order ID"
      />

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        pt={1}
        justifyContent="end"
      >
        <Typography>
          Page No. <b>{currentPage}</b>/{nPages}.
        </Typography>

        <IconButton
          disabled={!canNavigateToPreviousPage}
          onClick={navigateToPreviousPage}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <IconButton
          disabled={!canNavigateToNextPage}
          onClick={navigateToNextPage}
        >
          <NavigateNextIcon />
        </IconButton>
      </Stack>

      {displayOrders.length === 0 && <SearchResultNotFound />}
      {displayOrders.length !== 0 && (
        <RadioGroup value={value} onChange={handleChange}>
          <Stack spacing={2}>
            {displayOrders.map((item, idx) => (
              <OrderItem
                key={idx}
                order={item.order}
                cartItem={item.cartItem}
                value={idx}
              />
            ))}
          </Stack>
        </RadioGroup>
      )}

      {nPages > 1 && (
        <Box
          width={{ xs: 1, md: 0.8 }}
          display="flex"
          alignItem="center"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            onChange={setCurrentPage2}
            count={nPages}
            page={currentPage}
          />
        </Box>
      )}

      <Box alignSelf="center">
        <Button
          startIcon={<NavigateNextIcon />}
          variant="contained"
          disabled={!canMoveToNextStep}
          onClick={moveToNext}
        >
          Next step
        </Button>
      </Box>
    </Stack>
  );
};

export default RefundExchangeStep0;

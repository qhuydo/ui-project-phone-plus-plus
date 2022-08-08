export const initialOrderTrackingState = {
  order: null,
  searchId: null,
  orderIds: [],
};

export const orderTrackingReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDER_DATA": {
      return {
        ...state,
        order: action.payload || null,
      };
    }
    case "SET_SEARCH_ID": {
      return {
        ...state,
        searchId: action.payload,
      };
    }
    case "SET_ORDER_IDS": {
      return {
        ...state,
        orderIds: action.payload || state.orderIds,
      };
    }
  }
};

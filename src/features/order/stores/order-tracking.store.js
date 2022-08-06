export const initialOrderTrackingState = {
  order: null,
};

export const orderTrackingReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDER_DATA": {
      return {
        ...state,
        order: action.payload || null,
      };
    }
  }
};

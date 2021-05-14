import { SET_CHANNEL_ID } from "../actions/appAction";

const initialState = {
  roomId: null
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNEL_ID:
      return {
        ...state,
        roomId: action.payload
      };

    default:
      return state;
  }
};

export default appReducer;

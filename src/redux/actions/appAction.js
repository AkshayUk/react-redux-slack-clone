export const SET_CHANNEL_ID = "SET_CHANNEL_ID";

export const setChannelId = (id) => {
  return async (dispatch) => {
    dispatch({
      type: SET_CHANNEL_ID,
      payload: id
    });
  };
};

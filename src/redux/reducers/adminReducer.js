const adminReducer = (state = {}, action) => {
  if (action.type ==='SET_DASHBOARD'){
    return action.payload;
  }
  return state;
};
//adminReducer holds an object with three keys, and the values are arrays
//holding unpublished events, published events, and user info
export default adminReducer;

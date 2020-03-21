const adminReducer = (state = {}, action) => {
  if (action.type ==='SET_DASHBOARD'){
    console.log('action.payload in adminReducer is:', action.payload)
    return action.payload;
  }
  return state;
};

export default adminReducer;

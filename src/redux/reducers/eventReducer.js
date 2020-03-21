const eventReducer = (state = {}, action) => {
  if (action.type==='SET_EVENTS'){
    return action.payload;
  }
  return state;
};

// user will be on the redux state at:
// state.user
export default eventReducer;

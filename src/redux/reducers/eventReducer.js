const eventReducer = (state = {}, action) => {
  if (action.type==='SET_EVENTS'){
    return action.payload;
  }
  return state;
};//eventReducer holds an array of all published events
  //that any user will be able to see

export default eventReducer;

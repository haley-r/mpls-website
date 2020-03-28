const detailsReducer = (state = {}, action) => {
  if (action.type==='SET_DETAILS'){
    if (action.payload){return action.payload;}
    else {return state}
  }
  return state;
};//eventReducer holds an array of all published events
  //that any user will be able to see

export default detailsReducer;

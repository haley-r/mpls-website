const tempEventReducer = (state = {}, action) => {
  if (action.type==='STAGE_EVENT'){
    return action.payload;
  }
  return state;
};//eventReducer holds an array of all published events
  //that any user will be able to see

export default tempEventReducer;

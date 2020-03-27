const tempEventReducer = (state = {}, action) => {
  if (action.type==='STAGE_EVENT'){
    return action.payload;
  }
  else if (action.type==='UNSTAGE_EVENT'){
    console.log('returning empty object');
    return {};
  }
  return state;
};//eventReducer holds an array of all published events
  //that any user will be able to see

export default tempEventReducer;

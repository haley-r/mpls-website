const notesReducer = (state = [], action) => {
  if (action.type==='SET_NOTES'){
    if (action.payload){return action.payload;}
    else {return state}
  }
  return state;
};//notes reducer holds note objects in an array by date

export default notesReducer;

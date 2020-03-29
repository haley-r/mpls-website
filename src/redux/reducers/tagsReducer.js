const tagsReducer = (state = [], action) => {
  if (action.type==='SET_TAGS'){
    if (action.payload){return action.payload;}
    else {return state}
  }
  return state;
};//tags reducer holds tags (eventually maybe do in order chosen? or random?)

export default tagsReducer;

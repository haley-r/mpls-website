const confirmationReducer = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_POST_MESSAGE':
      return '';
    case 'SUCCESS_POST_MESSAGE':
      return 'Post successfully added to database. It will be reviewed soon!';
    case 'UNSUCCESSFUL_POST_MESSAGE':
      return 'There was a problem adding the post. Try again!';
    default: return state;
  }
};//eventReducer holds an array of all published events
  //that any user will be able to see

export default confirmationReducer;




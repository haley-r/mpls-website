import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEvents() {
  //use event router to get data
  const response = yield axios.get('/api/events');
  //then send what comes back to the event reducer with SET_EVENTS
  yield put ({ type: 'SET_EVENTS', payload: response.data});
}

function* fetchDetails(action) {
  //use event router to get data- the action.payload is the id of event you want details for
  const response = yield axios.get(`/api/events/${action.payload}`);
  //then send what comes back to the event reducer with SET_DETAILS
  yield put({ type: 'SET_DETAILS', payload: response.data[0] });
}

// function* postEvent(action) {
//   //attempt post from server, if it doesn't work console log the error
//   try {yield axios.post('/api/events', action.payload);}
//   catch (error) {console.log('Error with posting event:', error);}
//   //yield put({response.data.json})
//   //console log the response
//   //your event has been added reducer
// }//^david call


function* postEvent(action) {
  // if there's a post success message, clear it
  yield put({ type: 'CLEAR_POST_MESSAGE' });
  // post the action.payload (event object) to the database
  const response = yield axios.post('/api/events', action.payload);
  console.log('response in postEvent is:', response);
  //after the post, make the post message a good one to show on next screen
  if (response.status===201){yield put({ type: 'SUCCESS_POST_MESSAGE' });}
  else {yield put({ type: 'UNSUCCESSFUL_POST_MESSAGE' });};
}


//FETCH_EVENTS comes from EventDashboard loading
function* eventSaga() {
  yield takeLatest('FETCH_EVENTS', fetchEvents);
  yield takeLatest('FETCH_DETAILS', fetchDetails);
  yield takeLatest('POST_EVENT', postEvent);
}

export default eventSaga;



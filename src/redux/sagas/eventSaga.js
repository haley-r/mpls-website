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

// function* stageEvent (action) {
//   //put the entered event data into a reducer so user can review
//   yield put({ type: 'SET_STAGED_EVENT', payload: action.payload });
// }

function* postEvent(action) {
  //attempt post from server, if it doesn't work console log the error
  try {yield axios.post('/api/events', action.payload);}
  catch (error) {console.log('Error with posting event:', error);}
}

//FETCH_EVENTS comes from EventDashboard loading
function* eventSaga() {
  yield takeLatest('FETCH_EVENTS', fetchEvents);
  yield takeLatest('FETCH_DETAILS', fetchDetails);
  // yield takeLatest('STAGE_EVENT', stageEvent);
  yield takeLatest('POST_EVENT', postEvent);
}

export default eventSaga;



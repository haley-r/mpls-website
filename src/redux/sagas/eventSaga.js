import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEvents() {
  //use event router to get data
  const response = yield axios.get('/api/events');
  //then send what comes back to the event reducer with SET_EVENTS
  yield put ({ type: 'SET_EVENTS', payload: response.data});
}

function* postEvent(action) {
  //attempt post from server, if it doesn't work console log the error
  try {yield axios.post('/api/events', action.payload);}
  catch (error) {console.log('Error with posting event:', error);}
}

//FETCH_EVENTS comes from EventDashboard loading
function* eventSaga() {
  yield takeLatest('FETCH_EVENTS', fetchEvents);
  yield takeLatest('POST_EVENT', postEvent);

}

export default eventSaga;



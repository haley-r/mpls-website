import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchEvents() {
  //use event router to get data
  const response = yield axios.get('/api/events');
  //then send what comes back to the event reducer with SET_EVENTS
  yield put ({ type: 'SET_EVENTS', payload: response.data});
}

//FETCH_EVENTS comes from EventDashboard loading
function* eventSaga() {
  yield takeLatest('FETCH_EVENTS', fetchEvents);
}

export default eventSaga;



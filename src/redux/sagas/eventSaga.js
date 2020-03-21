import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchEvents() {
  const response = yield axios.get('/api/events');
  console.log('the response.data from running the get in fetchEvents is:', response.data);
  yield put ({ type: 'SET_EVENTS', payload: response.data});
}

function* eventSaga() {
  yield takeLatest('FETCH_EVENTS', fetchEvents);
}

export default eventSaga;



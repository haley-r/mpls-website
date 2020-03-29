import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEvents() {
  //use event router to get data
  const response = yield axios.get('/api/events');
  //then send what comes back to the event reducer with SET_EVENTS
  yield put ({ type: 'SET_EVENTS', payload: response.data});
}

function* fetchDetails(action) {
  //if there's a user, do a protected get in admin router
  if (action.payload.user){
    const response = yield axios.get(`/api/admin/details/${action.payload.eventId}`);
    //then send what comes back to the event reducer with SET_DETAILS
    yield put({ type: 'SET_DETAILS', payload: response.data[0] });
  }
  //if there's not a user, do an unprotected get in events router
  else{ 
    const response = yield axios.get(`/api/events/${action.payload.eventId}`);
    //then send what comes back to the event reducer with SET_DETAILS
    yield put({ type: 'SET_DETAILS', payload: response.data[0] });
   }
}

function* fetchIds(action){
  let thisId = Number(action.payload.eventId);
  const allPublishedIds = yield axios.get(`/api/events/ids`);
  let indexOfThisId = allPublishedIds.data.indexOf(thisId)
  yield put({type: 'SET_IDS', payload:{idArray: allPublishedIds.data, currentIndex: indexOfThisId}})
}

function* fetchTags(action) {
  let thisId = Number(action.payload.eventId);
  const response = yield axios.get(`/api/events/tags/${thisId}`);
  console.log('response from doing a get, in eventSaga fetchTags', response.data);
  yield put({ type: 'SET_TAGS', payload: response.data })
}

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
  yield takeLatest('FETCH_IDS' , fetchIds);
  yield takeLatest('FETCH_TAGS', fetchTags);
  yield takeLatest('POST_EVENT', postEvent);
}

export default eventSaga;



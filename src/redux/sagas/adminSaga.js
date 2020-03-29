import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchDashboard(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    //create variables for what you get back from each get route
    //config is how user is OKed, I think
    const unpublishedResponse = yield axios.get('/api/admin/unpublished', config);
    const publishedResponse = yield axios.get('/api/admin/published', config);
    const usersResponse = yield axios.get('/api/admin/users', config);
    //create an object that holds all of this information
    const dashboardData = {
      unpublished: unpublishedResponse.data,
      published: publishedResponse.data,
      users: usersResponse.data
    }
    //then dispatch that object to admin dashboard reducer with SET_DASHBOARD
    yield put({ type: 'SET_DASHBOARD', payload: dashboardData});
  } 
  catch (error) {
    console.log('admin get request failed', error);
  }
}//combines 3 get requests to send bundled in an object to eventReducer

function* publishEvent(action){
  try { yield axios.put(`/api/admin/publish/${action.payload.id}`, action.payload); }
  catch (error) { console.log('Error with updating event:', error); }
}

function* flagEvent(action) {
  try { yield axios.put(`/api/admin/flag/${action.payload.id}`, action.payload); }
  catch (error) { console.log('Error with updating event:', error); }
}

function* updateEvent(action){
  try { yield axios.put(`/api/admin/update/${action.payload.id}`, action.payload); }
  catch (error) { console.log('Error with updating event:', error); }
}

function* deleteEvent(action) {
  try { yield axios.delete(`/api/admin/delete/${action.payload.id}`); }
  catch (error) { console.log('Error with posting event:', error); }
}

function * addNote(action) {
  console.log('action.payload in addNote adminSaga is:', action.payload )
  try { yield axios.post(`/api/admin/notes/${action.payload.id}`, action.payload); }
  catch (error) { console.log('Error with posting event:', error); }
}

function* fetchNotes(action) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
  try {
    const response = yield axios.get(`/api/admin/notes/${action.payload.eventId}`, config);
    yield put({ type: 'SET_NOTES', payload: response.data });
  }
  catch (error) {console.log('notes get request failed', error);}
}//combines 3 get requests to send bundled in an object to eventReducer


//FETCH_DASHBOARD is dispatched from AdminDashboard upon mounting
function* adminSaga() {
  yield takeLatest('FETCH_DASHBOARD', fetchDashboard);
  yield takeLatest('SET_PUBLISHED', publishEvent);
  yield takeLatest('SET_FLAGGED', flagEvent);
  yield takeLatest('UPDATE_EVENT', updateEvent);
  yield takeLatest('DELETE_SELECTED', deleteEvent);
  yield takeLatest('ADD_NOTE', addNote);
  yield takeLatest('FETCH_NOTES', fetchNotes);
}

export default adminSaga;


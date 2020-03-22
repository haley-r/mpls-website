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
  console.log('action.payload in published is', action.payload)
  try { yield axios.put(`/api/admin/publish/${action.payload.id}`); }
  catch (error) { console.log('Error with posting event:', error); }
}

//FETCH_DASHBOARD is dispatched from AdminDashboard upon mounting
function* adminSaga() {
  yield takeLatest('FETCH_DASHBOARD', fetchDashboard);
  yield takeLatest('SET_PUBLISHED', publishEvent);
}

export default adminSaga;


import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* fetchDashboard(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

  const unpublishedResponse = yield axios.get('/api/admin/unpublished', config);
  const publishedResponse = yield axios.get('/api/admin/published', config);
  const usersResponse = yield axios.get('/api/admin/users', config);

  console.log(unpublishedResponse.data);
  // console.log(publishedResponse.data);
  // console.log(usersResponse.data);

  const dashboardData = {
    unpublished: unpublishedResponse.data,
    published: publishedResponse.data,
    users: usersResponse.data
  }
  
  yield put({ type: 'SET_DASHBOARD', payload: dashboardData});


  } catch (error) {
    console.log('admin get request failed', error);
  }
}



function* adminSaga() {
  yield takeLatest('FETCH_DASHBOARD', fetchDashboard);
}

export default adminSaga;

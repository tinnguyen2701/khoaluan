import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, logger, createReducer } from 'dorothy/utils';

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_RESPONSE = 'GET_CURRENT_USER_RESPONSE';
export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR';

export const UPDATE_FRAME_REQUEST = 'UPDATE_FRAME_REQUEST';
export const UPDATE_FRAME_RESPONSE = 'UPDATE_FRAME_RESPONSE';
export const UPDATE_FRAME_ERROR = 'UPDATE_FRAME_ERROR';

/* handler state for get current user */
function* requestCurrentUser(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/auth/currentUser`,
      action.payload,
    );
    if (response.status === 200) {
      yield put(createAction(GET_CURRENT_USER_RESPONSE, response));
    }
  } catch (error) {
    logger.logError('invalid token');
    window.location.href = `${process.env.REACT_APP_MAIN_URL}login`;
  }
}
function* watchCurrentUserRequest() {
  yield takeLatest(GET_CURRENT_USER_REQUEST, requestCurrentUser);
}
export const currentUserSaga = [fork(watchCurrentUserRequest)];

/* update frame */
const initModal = { tabVisible: 0 };
const modalActionHandler = {
  [UPDATE_FRAME_REQUEST]: (state, action) => ({
    tabVisible: action.payload,
  }),
};
export const modalReducer = createReducer(initModal, modalActionHandler);

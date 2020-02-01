import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, logger } from 'dorothy/utils';

export const GET_ALL_POST_NAVIGATION_REQUEST = 'GET_ALL_POST_NAVIGATION_REQUEST';
export const GET_ALL_POST_ABOUT_NAVIGATION_RESPONSE = 'GET_ALL_POST_ABOUT_NAVIGATION_RESPONSE';
export const GET_ALL_POST_ABOUT_NAVIGATION_ERROR = 'GET_ALL_POST_ABOUT_NAVIGATION_ERROR';
export const GET_ALL_POST_DOCUMENT_NAVIGATION_RESPONSE =
  'GET_ALL_POST_DOCUMENT_NAVIGATION_RESPONSE';
export const GET_ALL_POST_DOCUMENT_NAVIGATION_ERROR = 'GET_ALL_POST_DOCUMENT_NAVIGATION_ERROR';

export const GET_POST_REQUEST = 'GET_POST_REQUEST';
export const GET_POST_RESPONSE = 'GET_POST_RESPONSE';
export const GET_POST_ERROR = 'GET_POST_ERROR';

export const VISIBLE_LOADING = 'VISIBLE_LOADING';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_RESPONSE = 'SEARCH_RESPONSE';
export const SEARCH_ERROR = 'SEARCH_ERROR';

/* all post navigation */
function* requestGetAllPostNavigation(action) {
  try {
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_MAIN_URL}api/postsNavigation?item=${action.payload}`,
      action.payload,
    );
    if (response.status === 200) {
      if (action.payload === 'About')
        yield put(createAction(GET_ALL_POST_ABOUT_NAVIGATION_RESPONSE, response.data));
      else yield put(createAction(GET_ALL_POST_DOCUMENT_NAVIGATION_RESPONSE, response.data));
    }
  } catch (error) {
    logger.logError('khong the lay tat ca bai post navigation');
  }
}
function* watchAllPostNavigationRequest() {
  yield takeLatest(GET_ALL_POST_NAVIGATION_REQUEST, requestGetAllPostNavigation);
}
export const allPostNavigationSaga = [fork(watchAllPostNavigationRequest)];

/* get post */
function* requestGetPost(action) {
  try {
    yield put(createAction(VISIBLE_LOADING));
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_MAIN_URL}api/posts/post?item=${action.payload.page}&&name=${action.payload.name}`,
      action.payload,
    );
    if (response.status === 200) {
      yield put(createAction(VISIBLE_LOADING));
      yield put(createAction(GET_POST_RESPONSE, response.data));
    }
  } catch (error) {
    yield put(createAction(VISIBLE_LOADING));
    logger.logError('khong the lay bai post');
  }
}
function* watchPostRequest() {
  yield takeLatest(GET_POST_REQUEST, requestGetPost);
}
export const postSaga = [fork(watchPostRequest)];

/* search post */
function* requestSearchPost(action) {
  try {
    yield put(createAction(SEARCH_RESPONSE, null));
    yield put(createAction(VISIBLE_LOADING));
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_MAIN_URL}api/posts/search?name=${action.payload}`,
    );
    if (response.status === 200) {
      yield put(createAction(VISIBLE_LOADING));
      yield put(createAction(SEARCH_RESPONSE, response.data));
    }
  } catch (error) {
    yield put(createAction(VISIBLE_LOADING));
    logger.logError('khong the search bai post');
  }
}
function* watchSearchPostRequest() {
  yield takeLatest(SEARCH_REQUEST, requestSearchPost);
}
export const searchPostSaga = [fork(watchSearchPostRequest)];

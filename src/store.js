import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import {
  modalReducer as modal,
  postAboutReducer as listAbout,
  postDocumentReducer as listDocument,
  ListPostAboutNavigationReducer as ListPostAboutNavigation,
  ListPostDocumentNavigationReducer as ListPostDocumentNavigation,
  isVisibleLoadingReducer as isVisibleLoading,
  PostReducer as post,
} from 'ducks';
import { loginSaga, loginReducer as login } from './components/Login/ducks';
import {
  currentUserSaga,
  addPostSaga,
  allPostSaga,
  removePostSaga,
  updatePostSaga,
} from './components/Admin/ducks';
import { allPostNavigationSaga, postSaga } from './components/Home/ducks';

export const rootReducer = combineReducers({
  login,
  modal,
  listAbout,
  listDocument,
  ListPostAboutNavigation,
  ListPostDocumentNavigation,
  post,
  isVisibleLoading,
});

const rootSaga = function* rootSaga() {
  yield all([
    ...loginSaga,
    ...currentUserSaga,
    ...addPostSaga,
    ...removePostSaga,
    ...updatePostSaga,
    ...allPostSaga,
    ...allPostNavigationSaga,
    ...postSaga,
  ]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;

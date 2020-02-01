import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import {
  modalReducer as modal,
  postAboutReducer as listAbout,
  postDocumentReducer as listDocument,
} from 'ducks';
import { loginSaga, loginReducer as login } from './components/Login/ducks';
import {
  currentUserSaga,
  addPostSaga,
  allPostSaga,
  removePostSaga,
  updatePostSaga,
} from './components/Admin/ducks';

export const rootReducer = combineReducers({
  login,
  modal,
  listAbout,
  listDocument,
});

const rootSaga = function* rootSaga() {
  yield all([
    ...loginSaga,
    ...currentUserSaga,
    ...addPostSaga,
    ...removePostSaga,
    ...updatePostSaga,
    ...allPostSaga,
  ]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;

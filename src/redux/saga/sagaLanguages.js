import {
  fork,
  all,
  call,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  GET_LANGUAGES_FETCH,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAILED,
} from "../action/actionLanguages/actionLanguagesType";
import axios from "axios";
import api from "./api";
import config from "./config";

// API Calling
const languagesFetch = async () => {
  return await axios.get(`${api}/languages`, config);
};

// Workers
function* workLanguagesFetch() {
  try {
    const response = yield call(languagesFetch);

    if (response.status === 200) {
      yield put({
        type: GET_LANGUAGES_SUCCESS,
        payload: response.data.languages,
      });
    }
  } catch (err) {
    yield put({ type: GET_LANGUAGES_FAILED, err });
  }
}

// Watchers
function* languages() {
  yield takeEvery(GET_LANGUAGES_FETCH, workLanguagesFetch);
}

export default languages;

import {
  fork,
  all,
  call,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  TRANSLATE_FETCH,
  TRANSLATE_SUCCESS,
  TRANSLATE_FAILED,
} from "../action/actionTranslate/actionTranslateType";
import axios from "axios";
import api from "./api";
import config from "./config";

// API Calling
const translateFetch = async (data) => {
  return await axios.post(api, data, config);
};

// Workers
function* workTranslateFetch(action) {
  try {
    const { payload } = action;
    const response = yield call(translateFetch, payload);

    if (response.status === 200) {
      yield put({
        type: TRANSLATE_SUCCESS,
        payload: response.data.data.translations.translatedText,
      });
    }
  } catch (err) {
    yield put({ type: TRANSLATE_FAILED, err });
  }
}

// Watchers
function* translate() {
  yield takeLatest(TRANSLATE_FETCH, workTranslateFetch);
}

export default translate;

import {
  fork,
  all,
  call,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  DETECT_FETCH,
  DETECT_SUCCESS,
  DETECT_FAILED,
} from "../action/actionDetect/actionDetectType";
import axios from "axios";
import api from "./api";
import config from "./config";

// API Calling
const detectFetch = async (data) => {
  return await axios.post(`${api}/detect`, data, config);
};

// Workers
function* workDetectFetch(action) {
  try {
    const { payload } = action;
    const response = yield call(detectFetch, payload);

    if (response.status === 200) {
      yield put({
        type: DETECT_SUCCESS,
        detectedLanguage: response.data.data.detections[0].language,
      });
    }
  } catch (err) {
    yield put({ type: DETECT_FAILED, err });
  }
}

// Watchers
function* detect() {
  yield takeLatest(DETECT_FETCH, workDetectFetch);
}

export default detect;

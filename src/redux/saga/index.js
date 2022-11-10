import sagaTranslate from "./sagaTranslate";
import sagaLanguages from "./sagaLanguages";
import sagaDetect from "./sagaDetect";
import { fork, all } from "redux-saga/effects";

// Root Saga
const sagas = [fork(sagaTranslate), fork(sagaLanguages), fork(sagaDetect)];

function* rootSaga() {
  yield all([...sagas]);
}

export default rootSaga;

import {
  DETECT_FETCH,
  DETECT_SUCCESS,
  DETECT_FAILED,
} from "../action/actionDetect/actionDetectType";

const initialState = {
  detection: "",
  isLoading: false,
};

const reducerDetect = (state = initialState, action) => {
  const { type, detectedLanguage } = action;

  switch (type) {
    case DETECT_SUCCESS:
      return { ...state, detection: detectedLanguage, isLoading: false };
    default:
      return state;
  }
};

export default reducerDetect;

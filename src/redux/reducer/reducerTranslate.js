import {
  TRANSLATE_FETCH,
  TRANSLATE_SUCCESS,
  TRANSLATE_FAILED,
} from "../action/actionTranslate/actionTranslateType";

const initialState = {
  translation: "",
  isLoading: false,
};

const reducerTranslate = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSLATE_SUCCESS:
      return { ...state, translation: payload, isLoading: false };
    default:
      return state;
  }
};

export default reducerTranslate;

import {
  GET_LANGUAGES_FETCH,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAILED,
} from "../action/actionLanguages/actionLanguagesType";

const initialState = {
  languages: [],
  isLoading: false,
};

const reducerLanguages = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LANGUAGES_SUCCESS:
      return { ...state, languages: payload, isLoading: false };
    default:
      return state;
  }
};

export default reducerLanguages;

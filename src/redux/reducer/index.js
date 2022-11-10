import reducerTranslate from "./reducerTranslate";
import reducerLanguages from "./reducerLanguages";
import reducerDetect from "./reducerDetect";
import { combineReducers } from "redux";

const reducer = combineReducers({
  reducerTranslate,
  reducerLanguages,
  reducerDetect,
});

export default reducer;

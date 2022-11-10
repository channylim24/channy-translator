import { DETECT_FETCH } from "./actionDetectType";

export const detectFetch = (payload) => ({
  type: DETECT_FETCH,
  payload,
});

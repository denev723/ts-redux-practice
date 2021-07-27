import { combineReducers } from "redux";
import counter from "./counter";
// Root reducer 선언
const rootReducer = combineReducers({
  counter,
});

export default rootReducer;

// Root reducer의 반환값 유추
export type RootState = ReturnType<typeof rootReducer>;

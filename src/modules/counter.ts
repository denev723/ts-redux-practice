// // 액션타입, 액션 생성 함수, 리듀서

// // 액션 타입 선언
// /* as const를 붙여줌으로서 action.type의 값을 추론하는 과정중에 string으로
// 추론되지 않고 실제 문자열 값으로 추론됨 */
// const INCREASE = "counter/INCREASE" as const;
// const DECREASE = "counter/DECREASE" as const;
// const INCREASE_BY = "counter/INCREASE_BY" as const;

// // 액션 생성 함수
// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });
// export const increaseBy = (diff: number) => ({
//   type: INCREASE_BY,
//   payload: diff, // FSA 규칙
// });

// // 액션 객체에 대한 타입
// // ReturnType<typeof ___>는 특정 함수의 반환값을 추론 -> 위에서 as const를 붙여주지 않으면 추론되지 않음
// type CounterAction =
//   | ReturnType<typeof increase>
//   | ReturnType<typeof decrease>
//   | ReturnType<typeof increaseBy>;

// // 리덕스 모듈에서 관리할 상태의 타입 설정
// type CounterState = {
//   count: number;
// };

// // 초기상태 선언
// const initialState: CounterState = {
//   count: 0,
// };

// // 리듀서
// // state와 함수의 반환값이 일치하도록 해야함
// const counter = (
//   state: CounterState = initialState,
//   action: CounterAction,
// ): CounterState => {
//   switch (action.type) {
//     case INCREASE:
//       return { count: state.count + 1 };
//     case DECREASE:
//       return { count: state.count - 1 };
//     case INCREASE_BY:
//       return { count: state.count + action.payload };
//     default:
//       return state;
//   }
// };

// export default counter;

// typesafe-actions를 사용하여 리팩토링
import { ActionType, createReducer } from "typesafe-actions";
import { createStandardAction } from "typesafe-actions/dist/deprecated/create-standard-action";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_BY = "counter/INCREASE_BY";

export const increase = createStandardAction(INCREASE)();
export const decrease = createStandardAction(DECREASE)();
export const increaseBy = createStandardAction(INCREASE_BY)<number>(); // payload 타입을 generics으로 설정

// 모든 액션 생성함수들을 actions 객체에 넣고 ActionType을 사용하여 모든 액션 객체들의 타입 준비
const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

// createReducer는 리듀서를 쉽게 만들 수 있게 해주는 함수
// Generics로 리듀서에서 관리할 상태, 리듀서에서 처리할 모든 액션 객체 타입을 넣어야 함

const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: (state) => ({ count: state.count + 1 }),
  [DECREASE]: (state) => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }),
});

export default counter;

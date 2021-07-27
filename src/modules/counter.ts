// 액션타입, 액션 생성 함수, 리듀서

// 액션 타입 선언
/* as const를 붙여줌으로서 action.type의 값을 추론하는 과정중에 string으로 
추론되지 않고 실제 문자열 값으로 추론됨 */
const INCREASE = "counter/INCREASE" as const;
const DECREASE = "counter/DECREASE" as const;
const INCREASE_BY = "counter/INCREASE_BY" as const;

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff, // FSA 규칙
});

// 액션 객체에 대한 타입
// ReturnType<typeof ___>는 특정 함수의 반환값을 추론 -> 위에서 as const를 붙여주지 않으면 추론되지 않음
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

// 리덕스 모듈에서 관리할 상태의 타입 설정
type CounterState = {
  count: number;
};

// 초기상태 선언
const initialState: CounterState = {
  count: 0,
};

// 리듀서
// state와 함수의 반환값이 일치하도록 해야함
const counter = (
  state: CounterState = initialState,
  action: CounterAction,
): CounterState => {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + action.payload };
    default:
      return state;
  }
};

export default counter;

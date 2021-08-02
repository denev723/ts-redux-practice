// // 액션 타입 선언

// const ADD_TODO = "todos/ADD_TODO" as const;
// const TOGGLE_TODO = "todos/TOGGLE_TODO" as const;
// const REMOVE_TODO = "todos/REMOVE_TODO" as const;

// // 새로운 항목의 고유 ID
// let nextId = 1;

// // 액션 생성 함수
// export const addTodo = (text: string) => ({
//   type: ADD_TODO,
//   payload: {
//     id: nextId++,
//     text,
//   },
// });

// export const toggleTodo = (id: number) => ({
//   type: TOGGLE_TODO,
//   payload: id,
// });

// export const removeTodo = (id: number) => ({
//   type: REMOVE_TODO,
//   payload: id,
// });

// // 액션 객체들에 대한 데이터 타입 정의
// type TodosAction =
//   | ReturnType<typeof addTodo>
//   | ReturnType<typeof toggleTodo>
//   | ReturnType<typeof removeTodo>;

// // 상태 항목 데이터 타입 정의
// export type Todo = {
//   id: number;
//   text: string;
//   done: boolean;
// };

// // 모듈에서 관리할 상태 타입
// export type TodosState = Todo[];

// // 초기 상태
// const initialState: TodosState = [];

// // 리듀서
// function todos(
//   state: TodosState = initialState,
//   action: TodosAction,
// ): TodosState {
//   switch (action.type) {
//     case ADD_TODO:
//       return state.concat({
//         id: action.payload.id,
//         text: action.payload.text,
//         done: false,
//       });
//     case TOGGLE_TODO:
//       return state.map((todo) =>
//         todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
//       );
//     case REMOVE_TODO:
//       return state.filter((todo) => todo.id !== action.payload);
//     default:
//       return state;
//   }
// }

// export default todos;

import { createStandardAction } from "typesafe-actions/dist/deprecated/create-standard-action";
import { createAction } from "typesafe-actions/dist/deprecated/create-action";
import { ActionType, createReducer } from "typesafe-actions";

const ADD_TODO = "todos/ADD_TODO";
const TOGGLE_TODO = "todos/TOGGLE_TODO";
const REMOVE_TODO = "todos/REMOVE_TODO";

let nextId = 1;

// 액션 생성 함수의 경우 파라미터를 기반으로 커스터마이징된 payload를 설정 -> createAction 함수 사용
export const addTodo = createAction(
  ADD_TODO,
  (action) => (text: string) => action({ id: nextId++, text }),
);
export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();
export const removeTodo = createStandardAction(REMOVE_TODO)<number>();

const actions = {
  addTodo,
  toggleTodo,
  removeTodo,
};
type TodosAction = ActionType<typeof actions>;

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type TodosState = Todo[];

const initialState: TodosState = [];

const todos = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, action) =>
    state.concat({
      ...action.payload,
      done: false,
    }),
  // 비구조화 할당으로 payload 이름을 바꿀 수 있음
  [TOGGLE_TODO]: (state, { payload: id }) =>
    state.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    ),
  [REMOVE_TODO]: (state, { payload: id }) =>
    state.filter((todo) => todo.id !== id),
});

export default todos;

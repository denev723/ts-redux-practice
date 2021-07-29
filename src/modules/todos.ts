// 액션 타입 선언

const ADD_TODO = "todos/ADD_TODO" as const;
const TOGGLE_TODO = "todos/TOGGLE_TODO" as const;
const REMOVE_TODO = "todos/REMOVE_TODO" as const;

// 새로운 항목의 고유 ID
let nextId = 1;

// 액션 생성 함수
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    id: nextId++,
    text,
  },
});

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const removeTodo = (id: number) => ({
  type: REMOVE_TODO,
  payload: id,
});

// 액션 객체들에 대한 데이터 타입 정의
type TodosAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof toggleTodo>
  | ReturnType<typeof removeTodo>;

// 상태 항목 데이터 타입 정의
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// 모듈에서 관리할 상태 타입
export type TodosState = Todo[];

// 초기 상태
const initialState: TodosState = [];

// 리듀서
function todos(
  state: TodosState = initialState,
  action: TodosAction,
): TodosState {
  switch (action.type) {
    case ADD_TODO:
      return state.concat({
        id: action.payload.id,
        text: action.payload.text,
        done: false,
      });
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
      );
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default todos;

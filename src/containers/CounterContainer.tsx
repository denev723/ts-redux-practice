import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { increase, decrease, increaseBy } from "../modules/counter";
import Counter from "../components/Counter";

const CounterContainer = () => {
  // 상태 조회 -> state 타입을 RootState로 지정
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  // 각 액션들을 디스패치하는 함수
  const onIncrease = () => {
    dispatch(increase());
  };
  const onDecrease = () => {
    dispatch(decrease());
  };
  const onIncreaseBy = (diff: number) => {
    dispatch(increaseBy(diff));
  };

  return (
    <Counter
      count={count}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onIncreaseBy={onIncreaseBy}
    />
  );
};

export default CounterContainer;

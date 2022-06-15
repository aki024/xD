import * as React from "react";

const initialState = { count: 0 };

type ACTIONTYPE =
  | { type: "INCREMENT"; payload: number }
  | { type: "DECREMENT"; payload: string };

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.payload };
    case "DECREMENT":
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
};

export const Counter = () => {
  const [changed, setChanged] = React.useState(true);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    setChanged(false);
    setChanged(true);
  }, [state.count]);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "DECREMENT", payload: "5" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "INCREMENT", payload: 5 })}>
        +
      </button>
      {changed && <h2>Timer has changed by {state.count}</h2>}
    </>
  );
};

import React, { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTaskHandler: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, addTaskHandler }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      action=""
      className="input"
      onSubmit={(e) => {
        addTaskHandler(e);
        inputRef.current?.blur();
      }}>
      <input
        type="text"
        placeholder="Enter a task"
        className="inputBox"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        ref={inputRef}
      />
      <button className="inputSubmit" type="submit">
        Add task
      </button>
    </form>
  );
};

export default InputField;

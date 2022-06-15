import React, { useEffect, useRef } from "react";

type AppProps = {
  message: string;
};

type IUser = {};

const Message = ({ message }: AppProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [refUser, setRefUser] = React.useState<string | null>(null);
  const [user, setUser] = React.useState("user");
  const [combinedName, setCombinedName] = React.useState<string | null>(null);

  const setUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const refHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef && inputRef.current) {
      setRefUser(inputRef.current.value);
    }
  };

  const req = { url: "https://example.com", method: "GET" } as const;

  const combineNameHandler = (
    obj:
      | { user?: string; refUser?: string }
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    let newCombinedName = user + " " + refUser;
    setCombinedName(newCombinedName);
  };

  useEffect(() => {
    console.log(combinedName);
  }, [combinedName]);

  return (
    <div>
      <h1>{message}</h1>
      <h2>{user}</h2>
      <h2>Ref: {refUser}</h2>
      <h2>Combined name: {combinedName}</h2>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="user">Change user</label>
        <input type="text" onChange={setUserHandler} />
        <label htmlFor="ref">Ref Stuff</label>
        <input type="text" ref={inputRef} onChange={refHandler} />
        <button onClick={combineNameHandler}>Click to combine</button>
      </form>
    </div>
  );
};
export default Message;

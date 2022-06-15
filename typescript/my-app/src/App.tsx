import React, { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/Message";
import { Counter } from "./store/Counter";

interface Address {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends Address {
  unit: string;
}

function App() {
  const [address, setAddress] = useState<AddressWithUnit | null>(null);

  const addAddressHandler = () => {
    setAddress({
      name: "Opa",
      street: "Hopa",
      city: "Joj",
      country: "Joooj",
      postalCode: "24000",
      unit: "J",
    });
  };
  const printName = (name: string) => {
    console.log(name);
  };

  useEffect(() => {
    printName("Aaaa");
  }, []);

  return (
    <div className="container">
      <h1>Cao</h1>
      {address && <h2>{address.name}</h2>}
      <button onClick={addAddressHandler}>Add address</button>
      <Message message={"eeeej"} />
      <Counter />
    </div>
  );
}

export default App;

import { useState, useCallback, FormEventHandler } from "react";
import "./App.css";
import { Input } from "./components/Input";
import { Button } from "./components/Button";

// TODO: implement the signin form
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  const customAlert = useCallback(() => {
    alert(email);
  }, []);

  //eslint-disable-next-line
  const handleSubmit = (formData: any) => {
    event?.preventDefault();
    console.log({ formData });
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Signin Form</h1>

        <form onSubmit={handleSubmit}>
          <Input
            placeholder="john@doe.com"
            ariaLabel="Enter your email"
            value={email}
            onChange={handleChange}
          ></Input>

          <Input
            placeholder="Password"
            ariaLabel="Enter your password"
            value={password}
            onChange={handleChange}
          ></Input>

          <Button type="submit">Signin</Button>
        </form>
      </div>
    </div>
  );
}

export default App;

import { useState, useCallback } from "react";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import "./App.css";

// TODO: implement the signin form
const App = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const customAlert = useCallback(() => {
    alert(JSON.stringify({ email, password }));
  }, [email, password]);

  return (
    <div className="App">
      <div className="container">
        <h2>Sign in Form</h2>
        <Input
          type="email"
          placeholder={"john@doe.com"}
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          type="password"
          placeholder={"password"}
          value={password}
          onChange={handlePasswordChange}
        />
        <Button onClick={customAlert}>Sign in</Button>
      </div>
    </div>
  );
};

export default App;

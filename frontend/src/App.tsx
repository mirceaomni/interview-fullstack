import { useState, useCallback } from 'react';
import './App.css';
import { Input } from './components/Input';
import { Button } from './components/Button';

// TODO: implement the signin form
function App() {
  const [email, setEmail] = useState('');

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const submitForm = useCallback(() => {
    alert(email);
  }, [email]);

  return (
    <div className="App">
      <h2>Signin Form</h2>
      <Input placeholder={'john@doe.com'} value={email} onChange={handleChange}></Input>
      <Button onClick={submitForm}>Signin</Button>
    </div>
  );
}

export default App;

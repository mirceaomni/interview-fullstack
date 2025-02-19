import { useState, useCallback } from 'react'
import './App.css'
import { Input } from './components/Input'
import { Button } from './components/Button'

// const useAppLogic =

// TODO: implement the signin form
function App() {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const customAlert = useCallback(() => {
    alert(email);
  }, []);

  return (
    <div className='App'>
      <h2>Sign-in Form</h2>
      <form onSubmit={customAlert}>
        <Input type={'email'} placeholder={'john@doe.com'} value={email} onChange={handleChange}></Input><br />
        <Input type={'password'} value={email} onChange={handleChange}></Input><br />
        <Button onClick={customAlert}>Signin</Button>
      </form>
    </div>
  )
}

export default App

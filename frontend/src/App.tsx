import { useState, useCallback } from 'react'
import './App.css'
import { Input } from './components/Input'
import { Button } from './components/Button'

// TODO: implement the signin form
function App() {
  const [email, setEmail] = useState('')
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const customAlert = useCallback(() => {
    alert(email);
  }, []);

  return (
    <div className='App'>
      <h2>Signin Form</h2>
      <Input placeholder={'john@doe.com'} value={email} onChange={handleChange}></Input>
      <Button onClick={customAlert}>Signin</Button>
    </div>
  )
}

export default App

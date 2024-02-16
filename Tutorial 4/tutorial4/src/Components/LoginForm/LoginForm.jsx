import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors
    setEmailError('');
    setPasswordError('');
    setLoginError('');

    // Basic email validation
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Basic password validation
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    if (email !== 'testemail@dal.ca' || password !== 'Test@123') {
      setLoginError('Incorrect email or password');
      return;
    }
    try {
      const response = await fetch(
        'https://express-t4.onrender.com/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        },
      );

      if (response.ok) {
        navigate('/profile');
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='form'>
      <Container maxWidth='sm'>
        <Typography variant='h2' gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin='normal'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          {loginError && (
            <Typography variant='body2' color='error'>
              {loginError}
            </Typography>
          )}
          <Button type='submit' variant='contained' color='primary'>
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default LoginForm;

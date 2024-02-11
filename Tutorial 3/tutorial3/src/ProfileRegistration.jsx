import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import './ProfileRegistration.css'; // Import your CSS file for styling

function ProfileRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log(formData); // For testing, you can replace this with actual submission logic
      navigate('/profile', { state: { formData } }); // Pass form data as state
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!/^[a-zA-Z]+$/.test(data.firstName)) {
      errors.firstName = 'First name should contain only letters';
    }

    if (!/^[a-zA-Z]+$/.test(data.lastName)) {
      errors.lastName = 'Last name should contain only letters';
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email address';
    }

    if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  return (
    <Grid container justify='center' maxWidth={'xs'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '200px',
          gap: '1rem',
        }}
      >
        <Typography variant='h4' gutterBottom align='center'>
          Profile Registration
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '75%' }}>
          <Box
            sx={{
              '& > :not(style) + :not(style)': {
                marginTop: '0.7rem', // Adjust the spacing as needed
              },
            }}
          >
            <TextField
              label='First Name'
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label='Last Name'
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              label='Email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label='Password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label='Confirm Password'
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <Button variant='contained' color='primary' type='submit' fullWidth>
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Grid>
  );
}

export default ProfileRegistration;

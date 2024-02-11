import React from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

function Profile() {
  const location = useLocation();
  const { formData } = location.state || {}; // Access form data from location state

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '600px',
        height: '100vh',
      }}
    >
      <Card>
        <CardContent>
          <Typography variant='h4' gutterBottom align='center'>
            Profile
          </Typography>
          <Typography variant='body1'>
            <strong>First Name:</strong> {formData.firstName}
          </Typography>
          <Typography variant='body1'>
            <strong>Last Name:</strong> {formData.lastName}
          </Typography>
          <Typography variant='body1'>
            <strong>Email:</strong> {formData.email}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;

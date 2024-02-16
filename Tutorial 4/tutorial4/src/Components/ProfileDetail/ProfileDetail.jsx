import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';

function ProfileDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://express-t4.onrender.com/api/users/${id}`,
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <Container maxWidth='md'>
      {user ? (
        <div>
          <Typography variant='h4' gutterBottom>
            {user.name}'s Profile
          </Typography>
          <Typography variant='body1'>Email: {user.email}</Typography>
          <Typography variant='body1'>Age: {user.age}</Typography>
          <Typography variant='body1'>Gender: {user.gender}</Typography>
          <Typography variant='body1'>Company: {user.company}</Typography>
          <Typography variant='body1'>Phone: {user.phone}</Typography>
          <Typography variant='body1'>Address: {user.address}</Typography>
          <Typography variant='body1'>About: {user.about}</Typography>
          <Typography variant='body1'>Registered: {user.registered}</Typography>
          {/* You can add more user details here */}
        </div>
      ) : (
        <CircularProgress style={{ marginTop: '20px' }} />
      )}
    </Container>
  );
}

export default ProfileDetail;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  TextField,
  CircularProgress,
} from '@mui/material';

function ProfileList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://express-t4.onrender.com/api/users',
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' gutterBottom>
        User Profiles
      </Typography>
      <TextField
        id='search'
        label='Search by Name'
        variant='outlined'
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        margin='normal'
      />
      {loading ? (
        <CircularProgress style={{ marginTop: '20px' }} />
      ) : (
        <Grid container spacing={6}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Link
                to={`/profile/${user._id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card>
                  <CardMedia
                    component='img'
                    height='200'
                    image={user.picture}
                    alt={user.name}
                  />
                  <Typography variant='h6' align='center'>
                    {user.name}
                  </Typography>
                  <Typography variant='body2' align='center'>
                    {user.email}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default ProfileList;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import ProfileList from './Components/ProfileList/ProfileList';
import ProfileDetail from './Components/ProfileDetail/ProfileDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LoginForm />} />
        <Route path='/profile' element={<ProfileList />} />
        <Route path='/profile/:id' element={<ProfileDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

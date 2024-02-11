// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileRegistration from './ProfileRegistration';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' exact element={<ProfileRegistration />} />
          {/* Redirect to ProfileRegistration if no matching route */}
          <Route path='/profile' exact element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

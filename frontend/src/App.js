import React, { useState } from 'react';
import SignupLogin from './components/SignupLogin';
import TaskList from './components/TaskList';

function App() {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleAuthSuccess = () => setAuthenticated(true);
  const handleLogout = () => setAuthenticated(false);

  return authenticated ? (
    <TaskList onLogout={handleLogout} />
  ) : (
    <SignupLogin onAuth={handleAuthSuccess} />
  );
}

export default App;

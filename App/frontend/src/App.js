// src/App.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, clearUser } from './features/userSlice';

function App() {
  const { currentUser, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      // Dispatch the fetchUserProfile thunk as an example on component mount
      // Replace '1' with the actual user ID you wish to fetch.
      dispatch(fetchUserProfile(1));
    }
  }, [currentUser, dispatch]);

  console.log('Current user:', currentUser);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      <h1>Welcome to WalkPaw</h1>
      {status === 'loading' && <p>Loading user profile...</p>}
      {error && <p>Error: {error}</p>}
      {currentUser && (
        <div>
          <p>User ID: {currentUser.id}</p>
          <p>User Name: {currentUser.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
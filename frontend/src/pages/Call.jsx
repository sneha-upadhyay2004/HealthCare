import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../context/AuthContext';

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState('');

  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) {
      alert('Please enter a meeting code');
      return;
    }

    try {
      await addToUserHistory(meetingCode); // Now correctly sends token + code
      navigate(`/${meetingCode}`);
    } catch (err) {
      console.error('Failed to join meeting:', err);
      alert('Could not join meeting');
    }
  };

  return (
    <>
      <div className="navBar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2>Apna Video Call</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => {
              navigate('/history');
            }}
          >
            <RestoreIcon />
          </IconButton>
          <p>History</p>

          <Button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/register');
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality Video Call Just Like Quality Education</h2>

            <div style={{ display: 'flex', gap: '10px' }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              />
              <Button onClick={handleJoinVideoCall} variant="contained">
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);

// Here's how  system works based on your code:

// 1. Landing Page and "Get Started" Button
// The landing page (src/pages/landing.jsx) shows a "Get Started" button.
// When you click "Get Started", it routes you to /auth using React Router's Link component.
// 2. What Happens at /auth?
// The /auth route renders the Authentication component.
// This component lets users register or login.
// Register: Calls handleRegister from AuthContext, which sends a POST request to your backend to create a new user.
// Login: Calls handleLogin, which sends a POST request to log in. If successful, it stores a token in localStorage and navigates to /home.
// 3. How Does a Meeting Start?
// After login, you are routed to /home, which renders HomeComponent.
// Here, you can enter a meeting code and click "Join".
// This calls addToUserHistory (adds the meeting code to your history in the backend).
// Then, it navigates to /${meetingCode} (e.g., /aljk23).
// 4. How Does the Video Call Work?
// The route /:url renders VideoMeetComponent.
// This component:
// Connects to the backend via Socket.IO.
// Handles video/audio streams, chat, screen sharing, etc.
// The meeting code in the URL is used to join the correct room.
// Summary of Flow
// Landing Page → Click "Get Started" → /auth
// /auth → Register/Login → /home
// /home → Enter meeting code & Join → /:meetingCode
// /:meetingCode → Video call starts in VideoMeetComponent
// Key files:

// landing.jsx
// authentication.jsx
// home.jsx
// VideoMeet.jsx
// AuthContext.jsx
// // If you want a meeting code to be generated automatically when clicking "Get Started", you would need to add logic to generate a code and route to that code (instead of /auth). Currently, "Get Started" only takes you to authentication.
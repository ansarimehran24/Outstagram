import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './Components/Navbar/Navbar';
import Stories from './Components/Stories/Stories';
import Feed from './Components/Feed/Feed';
import Sidebar from './Components/Sidebar/Sidebar';
import Auth from './Components/Auth/Auth';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import ExplorePage from './Components/ExplorePage/ExplorePage';
import Messages from './Components/Messages/Messages';
import Notifications from './Components/Notifications/Notifications';
import CreatePost from './Components/CreatePost/CreatePost';
import EditProfile from './Components/EditProfile/EditProfile';
import ReelsPage from './Components/ReelsPage/ReelsPage';
import StoryPage from './Components/StoryPage/StoryPage';

import './App.css';

// Home Page (Feed + Sidebar)
const HomePage = ({ currentUser }) => (
  <div className="home-page">
    <div className="home-page__content">
      <div className="home-page__main">
        <Stories />
        <Feed />
      </div>
      <Sidebar />
    </div>
  </div>
);

// Protected Route wrapper
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar currentUser={currentUser} onLogout={handleLogout} />}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Auth onLogin={handleLogin} />}
        />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HomePage currentUser={currentUser} /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ExplorePage /></ProtectedRoute>} />
        <Route path="/reels" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ReelsPage /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Messages /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Notifications /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CreatePost /></ProtectedRoute>} />
        <Route path="/profile/:username" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ProfilePage /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><EditProfile onUpdateUser={setCurrentUser} /></ProtectedRoute>} />
        <Route path="/story/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><StoryPage /></ProtectedRoute>} />

        {/* Redirect */}
        <Route path="*" element={<Navigate to={isLoggedIn ? '/' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
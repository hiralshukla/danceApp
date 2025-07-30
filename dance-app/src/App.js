import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import FolderPostsPage from './FolderPostsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/folder/:folderTitle" element={<FolderPostsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

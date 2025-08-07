import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FolderPostsPage from './FolderPostsPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/HomePage.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn 
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

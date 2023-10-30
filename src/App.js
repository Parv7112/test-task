import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ApplicationDetails from './Components/ApplicationDetails';
import ResourceDetails from './Components/ResourceDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/application/:application" element={<ApplicationDetails />} />
        <Route path="/resources/:resource" element={<ResourceDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

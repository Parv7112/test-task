import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ApplicationDetails from './Components/ApplicationDetails';
import ResourceDetails from './Components/ResourceDetails';
import RawDetails from './Components/RawDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/application/:application" element={<ApplicationDetails />} />
        <Route path="/resources/:resource" element={<ResourceDetails />} />
        <Route path="/raw-details" element={<RawDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

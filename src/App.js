import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Survey from './views/Survey';
import Results from './views/Results';

function App() {
  return (
    <div className="text-white p-4">
      <Routes>
        <Route path="/" element={<Survey />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Projects from '../pages/Projects/Projects';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/projects' replace />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}
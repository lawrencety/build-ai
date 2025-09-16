import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import {routes} from "./routes";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/projects' replace />} />
        {routes.map((route: { path: string | string[], component: React.ReactNode})  => {
          if (typeof route.path === 'string') {
            return (
              <Route path={route.path} element={route.component} />
            )
          } else {
            return route.path.map((path, idx) => (
              <Route path={path} element={route.component} />
            ))
          }
        })}
      </Routes>
    </BrowserRouter>
  );
}
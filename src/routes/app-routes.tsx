import { Route, Routes } from 'react-router-dom';
import { Home } from '@views/home';
import { Dashboard } from '@views/dashboard';

import NotFound404 from '@/views/404';
import { PrivateRoute } from './private-route';
import { Profile } from '@/views/profile';
import { Login } from '@/views/login';
import Detail from '@/views/detail';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />

      {/* Dynamic routes */}
      <Route path="/detail/:id" element={<Detail />} />

      {/* Private routes */}
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};

import { ReactNode } from 'react';

import { Login } from '@/views/login';

export const PrivateRoute = ({ element }: { element: ReactNode }) => {
  const token = localStorage.getItem('token');

  return token ? element : <Login />;
};

export default PrivateRoute;

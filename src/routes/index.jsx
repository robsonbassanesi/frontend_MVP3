import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Login } from '../components/Login/Login';
import { PrivateRoute } from './privateRoutes';
import { SalesTable } from '../components/SalesTable/SalesTable';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="/home" element={<SalesTable />} />
        </Route>
      </Routes>
    </Router>
  );
};

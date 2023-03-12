import { Route, Routes } from 'react-router-dom';

import { routePaths } from '@/app/constants';
import HomePage from '@/app/pages/Home';

import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

function App() {
  return (
    <Routes>
      <Route path={routePaths.home} element={<HomePage />} />
      <Route path={routePaths.login} element={<LoginPage />} />
      <Route path={routePaths.signup} element={<SignUpPage />} />
    </Routes>
  );
}

export default App;

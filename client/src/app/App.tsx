import { Route, Routes } from 'react-router-dom';

import { routePaths } from '@/app/constants';

import { AuthPage } from './pages/AuthPage';
import HomePage from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path={routePaths.home} element={<HomePage />} />
      <Route path={routePaths.auth} element={<AuthPage />} />
    </Routes>
  );
}

export default App;

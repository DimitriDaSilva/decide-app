import { Route, Routes } from 'react-router-dom';

import { routePaths } from './routePaths';
import { AuthPage } from './pages/AuthPage';
import { TablesPage } from './pages/tables';
import { PageNotFoundPage } from './pages/PageNotFoundPage';
import { HomePage } from './pages/home';

function App() {
  return (
    <Routes>
      <Route path={routePaths.home} element={<HomePage />} />
      <Route path={routePaths.auth} element={<AuthPage />} />
      <Route path={routePaths.tables} element={<TablesPage />} />
      <Route path="*" element={<PageNotFoundPage />} />
    </Routes>
  );
}

export default App;

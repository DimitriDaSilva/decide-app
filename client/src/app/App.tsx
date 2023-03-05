import { routePaths } from "@/app/constants";
import HomePage from "@/app/pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path={routePaths.home} element={<HomePage />} />
    </Routes>
  );
}

export default App;

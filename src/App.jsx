import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";



function App() {
  return (
    <Routes>
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    </Routes>
  );
}

export default App;

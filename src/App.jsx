import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import InfoUser from "./pages/InfoUser";
import ProtectedRoute from "./components/auth/ProtectedRoute";



function App() {
  return (
    <Routes>
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.HOME} element={<ProtectedRoute />}>
       <Route path={ROUTES.INFO_USER} element={<InfoUser />} />
      </Route>
    </Routes>
  );
}

export default App;

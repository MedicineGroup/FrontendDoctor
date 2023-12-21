import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";



function App() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.HOME} element={<ProtectedRoute />}>
       <Route path={ROUTES.APPOINTMENTS} element={<Appointments />} />
       <Route path={ROUTES.PATIENTS} element={<Patients />} />
      </Route>
    </Routes>
  );
}

export default App;
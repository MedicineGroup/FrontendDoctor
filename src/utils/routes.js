export const ROUTES = {
  HOME: "/home",
  APPOINTMENTS: "/home/appointments",
  LOGIN: "/",
  PATIENTS: "/home/patients",
  ADD_ASSISTANT:"/home/addAssistant",
  CONSULATION_DETAIL: "/home/appointments/details",
};

export const API_ROUTES = {
  Login: "/auth/login-doctor",
  Logout: "/auth/logout",
  Signup: "/auth/signupAssistant",
  GetPatientsByDoctorEmail:"/doctor/getPatientsByDoctorEmail",
  GetConsultations: "/doctor/getConsultations"
};
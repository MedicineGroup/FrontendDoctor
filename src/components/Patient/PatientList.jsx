import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../utils/routes.js";
import { useAuthContext } from "../../store/auth-context.jsx";
import axios from "axios";
import PatientCard from "./PatientCard.jsx";
import { Spinner } from "@material-tailwind/react";
import { useUserDataContext } from "../../store/user-context.jsx";

const PatientList = () => {
  const { jwtToken } = useAuthContext();
  const {userData} = useUserDataContext();

  console.log(userData.patients);

  if (userData.patients.length === 0) {
    return (
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className=" font-semibold">You have no previous patients</p>
      </div>
    );
  }


  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">    
      {userData.patients.map((user) => (
          <PatientCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default PatientList
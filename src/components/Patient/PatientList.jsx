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


  const getPatientsByDoctorEmail = () => {
      // Fetch the doctor's email from local storage

      return axios.get(
        `${import.meta.env.VITE_API_URL}${API_ROUTES.GetPatientsByDoctorEmail}?email=${userData.email}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      
    };
  

  
  const { data, isError, isLoading ,error} = useQuery({
    queryKey: ["get-patients"],
    queryFn: getPatientsByDoctorEmail,
  });



  if (isLoading) {
    return (
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner className=" h-7 w-7" />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className=" text-red-700 font-semibold">
          Something went wrong! Please refresh the page
        </p>
      </div>
    );
  }


  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">    
      {data.data.patients.map((user) => (
          <PatientCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default PatientList
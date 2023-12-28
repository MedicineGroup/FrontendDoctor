import axios from "axios";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../utils/routes.js";
import { useAuthContext } from "../../store/auth-context.jsx";
import ConsultationRow from "./ConsultationRow.jsx";

const TABLE_HEAD = ["Consultation Date", "Patient", "State", ""];


const ConsulationsList = () => {
  const { jwtToken } = useAuthContext();
  // Now, userData is an object, and you can access the email property
  const getConsultations = () => {
    return axios.get(
      `${import.meta.env.VITE_API_URL}${API_ROUTES.GetConsultations}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
  };
 
  const { data, isError, isLoading } = useQuery({
    queryKey: ["get-consultations"],
    queryFn: getConsultations,
  });
  if (isLoading) {
    return (
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner className=" h-7 w-7" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className=" text-red-700 font-semibold">
          Something went wrong! Please refresh the page
        </p>
      </div>
    );
  }

  if (data.data.consultations.length === 0) {
    return (
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className=" font-semibold">You have no previous consultations</p>
      </div>
    );
  }
  return (
    <>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.consultations.map((consultation) => {
              return (
                <ConsultationRow
                  key={consultation._id}
                  consultation={consultation}
                />
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default ConsulationsList;

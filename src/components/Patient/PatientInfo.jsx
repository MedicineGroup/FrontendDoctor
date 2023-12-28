/* eslint-disable react/prop-types */
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
import FilesInfo from "./FilesInfo";
  
  
  export default function PatientInfo({ user }) {
    // Fonction pour calculer l'âge à partir de la date de naissance
    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(user.dateOfBirth);
      
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
      
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
      
        return age;
      };
  
    return (
      <>
        <Card className="mt-6">
          <CardHeader color="blue-gray">
            <h2>{user.firstname} {user.lastname}</h2>
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Email: {user.email}
            </Typography>
            <Typography>
              Address: {user.address}
            </Typography>
            <Typography>
               Age: {user.dateOfBirth ? calculateAge(user.dateOfBirth.$date) : "N/A"}
            </Typography>
            <Typography>
              Gender: {user.gender}
            </Typography>
            <br/>
            <FilesInfo user={user}/>
          </CardBody>
          <CardFooter className="pt-0">
            {/* Ajoutez des boutons ou d'autres éléments au besoin */}
          </CardFooter>
        </Card>
      </>
    );
  }
  
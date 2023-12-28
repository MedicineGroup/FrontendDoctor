import React, { useState } from 'react';
import { Select, Option } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Textarea,
  Button,
  List,
  ListItem,
  ListItemPrefix,
  Checkbox,
  Input,
} from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';

export default function ConsultationDetail() {
  const location = useLocation();
  const { state } = location;
  console.log("Consultation Detail Props:", state);
  const [consultation, setConsultation] = useState(state.consultation || '');

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <Card className="mt-6 ">
     <CardHeader color="blue" className="text-center text-white py-6">
  <h1 className="text-3xl font-semibold">
    {consultation.patient.firstname} {consultation.patient.lastname}
  </h1>
</CardHeader>

      <CardBody>
        <Typography >
        Email:  <span className="font-normal text-base text-black">{consultation.patient.email}</span>
        </Typography>
        <br/>
        <Typography>
          Address:  <span className="font-normal text-base text-black">{consultation.patient.address}</span> 
        </Typography>
        <br/>
        <Typography>
          Age: <span className="font-normal text-base text-black">{consultation.patient.dateOfBirth ? calculateAge(consultation.patient.dateOfBirth) : "N/A"}</span>
        </Typography>
        <br/>
        <Typography>
          Gender: <span className="font-normal text-base text-black">{consultation.patient.gender}</span>
        </Typography>

        {/* Add other properties here */}
      <br/>

        <div className="flex space-x-4 items-center">
          <div className="w-96 flex-grow">
            <Textarea label="Remarque" className="w-full bg-white" />
          </div>
          <Button color="blue" className="ml-4">
            Add
          </Button>
        </div>
      <br/>
      <Typography variant="h5" color="blue-gray" className="mb-4">
      TREATMENT
  </Typography >
        <div className="flex items-center gap-4 ">
          
        <Input size="md" label="Medication " />
        <Input size="md" label="Number of times " />
        <Select label="Period ">
            <Option>After eating</Option>
            <Option>Before eating</Option>
        </Select>
        <Button color="blue" className="ml-4">Add</Button>
         </div>

         <br/>
         <br/>
         <div className="flex items-center justify-center">
       
         <Button color="blue" className="flex items-center gap-2 px-3 py-1 text-white text-xs">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
    Generate
  </Button>
</div>
<Typography variant="h5" color="blue-gray" className="mb-4">
ANALYSIS
  </Typography>
     
<br/>
      <br/>
        <List className="flex-row">
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="horizontal-list-react"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              
            24-hour proteinuria 
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="horizontal-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              CRP
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="horizontal-list-react"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              VS
            </Typography>
          </label>
        </ListItem>
        </List>
    <br/>
    <br/>
        <div className="flex items-center justify-center">
        <Button color="blue" className="flex items-center gap-2 px-3 py-1 text-white text-xs">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
    Generate
  </Button>
  </div>
  <br/>
     </CardBody>
      
  <CardFooter className="pt-0">
  <Typography variant="h5" color="blue-gray" className="mb-4">
    RADIOLOGY
  </Typography>
  <List className="flex-row">
    <ListItem className="p-0">
      <label
        htmlFor="horizontal-list-scan"
        className="flex w-full cursor-pointer items-center px-3 py-2"
      >
        <ListItemPrefix className="mr-3">
          <Checkbox
            id="horizontal-list-scan"
            ripple={false}
            className="hover:before:opacity-0"
            containerProps={{
              className: "p-0",
            }}
          />
        </ListItemPrefix>
        <Typography color="blue-gray" className="font-medium">
          SCAN
        </Typography>
      </label>
    </ListItem>
    <ListItem className="p-0">
      <label
        htmlFor="horizontal-list-irm"
        className="flex w-full cursor-pointer items-center px-3 py-2"
      >
        <ListItemPrefix className="mr-3">
          <Checkbox
            id="horizontal-list-irm"
            ripple={false}
            className="hover:before:opacity-0"
            containerProps={{
              className: "p-0",
            }}
          />
        </ListItemPrefix>
        <Typography color="blue-gray" className="font-medium">
          IRM
        </Typography>
      </label>
    </ListItem>
    <ListItem className="p-0">
      <label
        htmlFor="horizontal-list-echo"
        className="flex w-full cursor-pointer items-center px-3 py-2"
      >
        <ListItemPrefix className="mr-3">
          <Checkbox
            id="horizontal-list-echo"
            ripple={false}
            className="hover:before:opacity-0"
            containerProps={{
              className: "p-0",
            }}
          />
        </ListItemPrefix>
        <Typography color="blue-gray" className="font-medium">
          Echo
        </Typography>
      </label>
    </ListItem>
  </List>
  <br/>
  <br/>
  {/* Input for organ */}
  <div className="flex items-center">
    <Input label="Organ" className="w-full" />
  </div>

  <br/>
  <br/>
  <div className="flex items-center justify-center">
        <Button color="blue" className="flex items-center gap-2 px-3 py-1 text-white text-xs">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
    Generate
  </Button>
  <br/>

 
  </div>

  <Button variant="gradient" className="flex  gap-3 text-sm justify-center items-center h-12 w-36">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        SAVE
      </Button>
</CardFooter>

 
    </Card>
  );
}

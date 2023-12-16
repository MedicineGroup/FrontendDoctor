import { useUserDataContext } from "../../store/user-context";
import { Avatar, Button, DialogHeader } from "@material-tailwind/react";
import { GENDER } from "../../utils/constantes";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import Modal from "../shared/Modal";
import { EditProfileForm } from "./EditProfileForm";
import { XMarkIcon } from "@heroicons/react/24/solid";
import classes from "./UserData.module.css";
import EditImageProfile from "./EditImageProfile";

const UserDataComponent = () => {
  const { userData } = useUserDataContext();
  const title =
    userData.gender !== undefined
      ? userData.gender === GENDER.MALE
        ? "Mr"
        : "Mme"
      : "";
  const [formattedDate, setFormattedDate] = useState();
  const [isInfosModalOpen, setIsInfosModalOpen] = useState(false);
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);

  useEffect(() => {
    if (userData.dateOfBirth) {
      const originalDate = parseISO(userData.dateOfBirth);
      setFormattedDate(format(originalDate, "yyyy-MM-dd"));
    }
  }, [userData]);

  const handleCloseInfosModal = () => {
    setIsInfosModalOpen(!isInfosModalOpen);
  };
  const handleCloseProfileImageModal = () => {
    setIsProfileImageModalOpen(!isProfileImageModalOpen);
  };

  const infos = [
    {
      property: "Gender",
      value: userData.gender,
    },
    {
      property: "Date of birth",
      value: formattedDate || "",
    },
    {
      property: "Address",
      value: userData.address,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-6 justify-center items-center ml-24 mt-20 absolute  left-1/2 -translate-x-1/2 font-primary">
        <div
          className={classes["clickable-avatar"]}
          onClick={handleCloseProfileImageModal}
        >
          <Avatar
            className={classes.avatar}
            src={userData.profileImage || "/assets/profile-placeholder.jpg"}
            alt={`${userData.firstname} profile image`}
            size="xxl"
          />
          <img
            src="/assets/camera-icon.svg"
            className={`${classes.icon} text-white h-7  w-7`}
          />
        </div>
        <div className=" mt-6">
          <h3 className=" text-3xl">
            {`${title}. ${userData.lastname.toUpperCase()} `}
            <span className=" capitalize">{userData.firstname}</span>
          </h3>
        </div>
        <div>
          {infos.map((info) => {
            return (
              <p key={info.property} className=" text-xl mb-5 mr-4">
                <span className=" font-semibold inline-block w-32 text-left">
                  {info.property}
                </span>{" "}
                : {info.value}
              </p>
            );
          })}
        </div>
        <Button className="bg-primary mb-5" onClick={handleCloseInfosModal}>
          Edit profile
        </Button>
      </div>
      <Modal isOpen={isInfosModalOpen} handleClose={handleCloseInfosModal}>
        <DialogHeader className="flex flex-row justify-between">
          <p>Edit Infos</p>
          <XMarkIcon
            onClick={handleCloseInfosModal}
            className="h-6 w-6 cursor-pointer"
          />
        </DialogHeader>
        <EditProfileForm />
      </Modal>
      <Modal
        isOpen={isProfileImageModalOpen}
        handleClose={handleCloseProfileImageModal}
      >
        <DialogHeader className="flex flex-row justify-between">
          <p>Edit Profile Image</p>
          <XMarkIcon
            onClick={handleCloseProfileImageModal}
            className="h-6 w-6 cursor-pointer"
          />
        </DialogHeader>
        <EditImageProfile />
      </Modal>
    </>
  );
};

export default UserDataComponent;

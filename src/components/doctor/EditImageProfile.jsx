import {
  Alert,
  Avatar,
  Button,
  DialogBody,
  Spinner,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useUserDataContext } from "../../store/user-context";

const EditImageProfile = () => {
  const { userData, updateUserProfileImage, errors, loading, updateSuccess } =
    useUserDataContext();
  const inputRef = useRef(null);

  const [profileImage, setProfileImage] = useState({
    imagePath: userData.profileImage || "/assets/profile-placeholder.jpg",
    imageFile: null,
  });

  const handleProfileImageSelect = (event) => {
    if (event.target.files) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setProfileImage({
          imagePath: fileReader.result,
          imageFile: event.target.files[0],
        });
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", profileImage.imageFile);
    await updateUserProfileImage(formData);
  };

  return (
    <DialogBody className="flex flex-col justify-center items-center gap-12">
      {errors && <Alert color="red">{errors.updateProfileErrors}</Alert>}
      {updateSuccess && (
        <Alert color="green">Your Profile has been updated Successfully</Alert>
      )}
      <Avatar src={profileImage.imagePath} alt="profile Image" size="xxl" />
      <form onSubmit={handleSubmit}>
        <input
          id="profile"
          hidden
          type="file"
          accept="image/*"
          onChange={handleProfileImageSelect}
          ref={inputRef}
        />
        <div className="flex flex-row justify-between mx-5 gap-6">
          <Button
            type="button"
            className=" bg-secondary text-gray-100"
            onClick={() => inputRef.current.click()}
            disabled={loading}
          >
            Upload
          </Button>
          <Button disabled={loading} type="submit" className="bg-primary">
            {loading ? <Spinner /> : "Save"}
          </Button>
        </div>
      </form>
    </DialogBody>
  );
};

export default EditImageProfile;

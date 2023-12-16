import {
  Card,
  Input,
  Button,
  Typography,
  DialogBody,
  Alert,
  Spinner,
} from "@material-tailwind/react";
import { GENDER } from "../../utils/constantes";
import { useUserDataContext } from "../../store/user-context";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import classes from "../auth/Form-style.module.css";

export function EditProfileForm() {
  const { userData, updateInfos, loading, errors, updateSuccess } =
    useUserDataContext();
  const { register, handleSubmit, formState, setValue, control } = useForm({
    defaultValues: {
      gender: userData.gender || "",
      dateOfBirth:
        userData.dateOfBirth !== undefined
          ? new Date(userData.dateOfBirth)
          : new Date(),
      address: userData.address || "",
    },
    mode: "onTouched",
  });
  const { errors: formErrors } = formState;

  const onSubmit = async (data) => {
    await updateInfos(data);
  };

  return (
    <>
      <DialogBody>
        {errors && <Alert color="red">{errors.updateInfosErrors}</Alert>}
        {updateSuccess && (
          <Alert color="green">Your Infos have been saved successfully</Alert>
        )}
        <Card color="transparent" shadow={false}>
          <form
            className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Gender
              </Typography>
              <Controller
                name="gender"
                control={control}
                defaultValue={userData.gender || ""}
                render={({ field }) => (
                  <select {...field} className=" py-2 rounded-sm">
                    <option value={GENDER.MALE}>{GENDER.MALE}</option>
                    <option value={GENDER.FEMALE}>{GENDER.FEMALE}</option>
                  </select>
                )}
              />

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Date of Birth
              </Typography>
              <Controller
                name="dateOfBirth"
                control={control}
                defaultValue={new Date(userData.dateOfBirth) || new Date()}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) =>
                      setValue("dateOfBirth", date, { shouldValidate: true })
                    }
                    showYearDropdown
                    scrollableYearDropdown
                    showMonthDropdown
                    yearDropdownItemNumber={23}
                    dateFormat="dd-MM-yyyy"
                  />
                )}
              />

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Address
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="Some Street 125"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("address", {
                  required: "Address is a required field",
                })}
                error={formErrors.address && true}
              />
              {formErrors?.address && (
                <div className={classes["input-error"]}>
                  {formErrors.address.message}
                </div>
              )}
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="my-6 bg-primary"
            >
              {loading ? <Spinner /> : "Save"}
            </Button>
          </form>
        </Card>
      </DialogBody>
    </>
  );
}

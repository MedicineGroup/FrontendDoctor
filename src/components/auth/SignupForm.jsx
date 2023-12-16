import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
  Alert,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/auth-context";
import { ROUTES } from "../../utils/routes";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classes from "./Form-style.module.css";

const schema = yup.object({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email("Fournissez un email correcte"),
  password: yup.string().required(),
});

const SignupForm = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const { loading, onSignup, errors: signupErrors } = useAuthContext();
  const { errors } = formState;
  const onSubmit = async (data) => {
    await onSignup(data);
    reset();
  };
  return (
    <Card
      color="transparent"
      shadow={false}
      className=" mt-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-primary"
    >
      <Typography variant="h4" className=" text-primary text-center">
        Register
      </Typography>
      {signupErrors && <Alert color="red">{signupErrors.signupErrors}</Alert>}
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your First Name
          </Typography>
          <Input
            size="lg"
            placeholder="John"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("firstname")}
            error={errors.firstname && true}
          />
          {errors?.firstname && (
            <div className={classes["input-error"]}>
              {errors.firstname.message}
            </div>
          )}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Last Name
          </Typography>
          <Input
            size="lg"
            placeholder="John"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("lastname")}
            error={errors.lastname && true}
          />
          {errors?.lastname && (
            <div className={classes["input-error"]}>
              {errors.lastname.message}
            </div>
          )}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("email")}
            error={errors.email && true}
          />
          {errors?.email && (
            <div className={classes["input-error"]}>{errors.email.message}</div>
          )}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Choose a password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("password")}
            error={errors.password && true}
          />
          {errors?.password && (
            <div className={classes["input-error"]}>
              {errors.password.message}
            </div>
          )}
        </div>
        <Button
          type="submit"
          className="mt-6 bg-primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <Spinner /> : "Sign up"}
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already a user?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="font-semibold text-gray-900 underline"
          >
            Login
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default SignupForm;

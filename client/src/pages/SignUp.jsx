import React from "react";
import { useForm } from "react-hook-form";
import { corsMaker } from "../data/dummy";
import LogIni from "../data/LogIni.jpg";

//Component that gives an option to registrate regular user
const SignUp = () => {
  //form hook
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      surname: "",
      passport: "",
      password: "",
      confirmPassword: "",
      email: "",
      gender: "male",
      date_of_birth: "",
    },
  });

  const checkPassword = () => {};
  const onSubmit = (data) => {
    fetch(
      process.env.REACT_APP_CREATE_USER,
      corsMaker({
        method: "POST",
        body: data,
      })
    );
  };

  {
    /**for calendar date value */
  }
  const endDate = (args) => {
    args.isDisabled = true;
  };

  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={LogIni}
        alt="/"
      />

      <div className="flex flex-col justify-center items-center h-full opacity-100 ">
        <form
          className="flex flex-col max-w-[500px] w-full mx-auto bg-white p-8 rounded-3xl max-h-screen"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="mb-2  text-center bg-white">
            <b className=" text-center text-2xl uppercase">Sign Up</b>
          </h1>
          <div className="grid gap-6 mb-6  lg:grid-cols-2 ">
            <div>
              <input
                className="mb-2  border relative border-gray-300 rounded-lg bg-gray-200 p-2 "
                name="first_name"
                type="text"
                placeholder="Name"
                {...register("first_name", {
                  required: "*first name is required",
                })}
              />
              {errors.firstName?.type === "required" &&
                errors.firstName.message}
            </div>
            <div>
              <input
                className=" mb-2  border relative border-gray-300 rounded-lg bg-gray-200 p-2"
                name="surname"
                type="text"
                placeholder="Surname"
                {...register("surname", { required: "*surname is required" })}
              />
              {errors.surname?.type === "required" && errors.surname.message}
            </div>

            <div>
              <input
                className=" mb-2  border relative border-gray-300 rounded-lg bg-gray-200 p-2"
                name="passport"
                type="text"
                placeholder="Passport id"
                {...register("passport")}
              />
            </div>
            <div>
              <input
                className=" mb-2  border relative border-gray-300 rounded-lg bg-gray-200 p-2"
                name="email"
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red z-10">*email is required</p>
              )}
              {register.email?.includes("@") === false && (
                <p className="text-red z-10">*not correct email</p>
              )}
            </div>
            <div>
              <input
                className=" mb-2  border relative border-gray-300 rounded-lg bg-gray-200 p-2"
                name="password"
                type="password"
                placeholder="Password"
                value={register.password}
                onChange={(e) => {
                  setValue("password", e.target.value);
                }}
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="text-black z-10">*password is required</p>
              )}
            </div>
            <div>
              <input
                className=" mb-2  border relative border-gray-300 rounded-lg bg-gray-200 p-2"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => checkPassword(e)}
                {...register("confirmPassword", { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="text-black z-10">*confirm password is required</p>
              )}
            </div>
          </div>

          <div className="flex flex-col w-64">
            <select
              className="mb-6  border relative border-gray-300 rounded-lg bg-gray-200 p-2 appearance-none"
              name="gender"
              value="male"
              {...register("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="date"
              className="mb-2  border relative border-gray-300 rounded-lg bg-gray-200 p-2"
              name="date_of_birth"
              {...register("date_of_birth")}
            />
          </div>

          <button
            className="w-full py-3 mt-8  rounded-full bg-indigo-600  hover:bg-indigo-500 relative text-white opacity-80 "
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

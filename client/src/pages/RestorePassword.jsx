import React from "react";
import { useForm } from "react-hook-form";
import { corsMaker } from "../data/dummy";

import loginImg from "../data/LogIni.jpg";

//Component that gives option to restore password by email
const RestorePassword = () => {
  //form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data) => {
    fetch(
      process.env.REACT_APP_RESTORE_PASSWORD,
      corsMaker({ method: "POST", body: data })
    );
  };

  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <figure>
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={loginImg}
          alt="/"
        />
      </figure>

      <div className="flex justify-center items-center h-full">
        <form
          className="max-w-[400px] w-full mx-auto p-8 bg-none"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-white text-4xl font-bold text-center py-4">
            Restore password
          </h2>
          <div className="flex flex-col mb-4">
            <input
              className="border relative bg-gray-200 opacity-60 p-2 "
              type="text"
              name="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-white z-10 ">*email is required</p>
            )}
          </div>
          <button
            className="w-full py-3 mt-8 rounded-full bg-indigo-600  hover:bg-indigo-500 hover:border-indigo-800 relative text-white opacity-80"
            onClick={() => {}}
          >
            Send me password
          </button>
        </form>
      </div>
    </div>
  );
};
export default RestorePassword;

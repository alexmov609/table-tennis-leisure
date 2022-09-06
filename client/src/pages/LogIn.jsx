import React from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import startVideo from "../data/startVideo.mp4";
import { Link } from "react-router-dom";
import UserApp from "./userLayout/UserApp";

import { useStateContext } from "../contexts/ContextProvider";

//Start page of this project
export default function Login() {
  const { setAuthentication, setCurrentMode } = useStateContext();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    let csrfToken;
    await fetch("/form")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        csrfToken = response.csrfToken;
      });
    //убрать в другое место
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": csrfToken,
      },
      body: JSON.stringify(data),
    };
    await fetch("login", requestOptions) // was ${config.apiUrl}/users/authenticate
      .then((response) => {
        if (response.ok) {
          localStorage.setItem("csrf", response.headers.get("x-xsrf-token"));
        }
        return response.json();
      })
      .then((fulfilled) => {
        setAuthentication({
          authorities: fulfilled["authorities"],
          accessToken: fulfilled.accessToken,
        });
        setCurrentMode(fulfilled.theme === 1 ? "light" : "dark");
        fulfilled["authorities"] === 1
          ? navigate("/UserApp/Calendar")
          : navigate("/AdminApp/DayManagmentCertainDate");
      });
  };



  return (
    <div className="relative w-full h-screen bg-zinc-900/90 ">
      <video
        className="object-cover h-full w-full absolute"
        src={startVideo}
        autoPlay
        loop
        muted
      />
      <div className="flex flex-col justify-center items-center h-full ">
        <form
          className="max-w-[400px] w-full mx-auto bg-none  p-8 bg-white opacity-90 z-10 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-black opacity-90 text-4xl font-bold text-center py-4">
            Login
          </h2>

          <div className="flex flex-col mb-4">
            <input
              className="border relative bg-gray-200 opacity-90 p-2 rounded-lg"
              type="text"
              name="email"
              placeholder="Username"
              {...register("email", {
                required: "*user name is required",
                includes: { value: "@", message: "Not include" },
              })}
            />
            {errors.email?.type === "required" && errors.email.message}
          </div>
          <div className="flex flex-col ">
            <input
              className="border relative bg-gray-200 opacity-90 p-2 rounded-lg"
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red z-10">*password is required</p>
            )}
          </div>
          <button className="w-full py-3 mt-8 rounded-full bg-indigo-600  hover:bg-indigo-500 relative text-white opacity-90 cursor-pointer">
            Sign In
          </button>
          <b className="text-black text-center mt-2 z-10 text-lg font-bol relative opacity-90 rounded-lg">
            <Link to="/RestorePassword">Forgot a password?</Link>
          </b>
          <br></br>
          <b className="text-black text-center mt-2 z-10 text-lg font-bold ">
            Not a member?
            <Link to="/SignUp">Sign Up</Link>
          </b>
        </form>
      </div>
    </div>
  );
}

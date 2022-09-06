import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

//Component that gives to an user an option to browse its personal data
//User can update its personal data
const PersonalData = () => {
  const { currentColor } = useStateContext();
  const { person, user, userAbonement } = useOutletContext();
  const [isDisabled, setIsDisabled] = useState(true);
  let navigate = useNavigate();
  const { first_name, surname, passport, date_of_birth } = person;
  const { email, password } = user;
  const { name_of_abonement, price, description } = userAbonement;

  const handleClick = () => {
    navigate("/UserApp/ChooseAbonement");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name,
      surname,
      passport,
      email,
      password,
      confirmPassword: "",
      date_of_birth,
    },
  });
  const onSubmit = async (data) => {
    let csrfToken = localStorage.getItem("csrf");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": csrfToken,
      },
      body: JSON.stringify(data),
    };

    await fetch("/updatePerson", requestOptions) // was ${config.apiUrl}/users/authenticate
      .then((response) => {
        if (response.ok) {
          console.log("Updated Successfully");
        }
      });
  };

  return (
    <div
      id="contact"
      className="w-full lg:h-screen  dark:bg-secondary-dark-bg bg-white"
    >
      <div className=" m-auto px-2  w-full dark:bg-secondary-dark-bg bg-zinc-100 ">
        <div className="grid lg:grid-cols-5 gap-8 bg-zinc-100 rounded-3xl  ">
          {/* left */}
          <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4 ">
            <div className="p-4">
              <p className="text-xl tracking-widest uppercase text-[#5651e5]">
                Person Data
              </p>
              <form onSubmit={handleSubmit(onSubmit)} action="" method="POST">
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2">Name</label>
                    <input
                      className="border-2 rounded-lg p-3 flex border-gray-300"
                      type="text"
                      name="first_name"
                      disabled={isDisabled}
                      {...register("first_name")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2">Surname</label>
                    <input
                      className="border-2 rounded-lg p-3 flex border-gray-300"
                      type="text"
                      name="surname"
                      disabled={isDisabled}
                      {...register("surname")}
                    />
                  </div>
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Passport No</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="number"
                    name="passport"
                    disabled={isDisabled}
                    {...register("passport")}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Email</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="email"
                    name="email"
                    disabled={isDisabled}
                    {...register("email")}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Password</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="password"
                    name="password"
                    disabled={isDisabled}
                    {...register("password")}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">
                    Confirm password
                  </label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="password"
                    name="confirmPassword"
                    disabled={isDisabled}
                    {...register("confirmPassword")}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">
                    Date of birth
                  </label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="date"
                    name="date_of_birth"
                    disabled={isDisabled}
                    {...register("date_of_birth")}
                  />
                </div>
                <button
                  style={{ backgroundColor: currentColor }}
                  className="w-full p-4  text-gray-100 mt-4 rounded-full"
                >
                  Confirm changes
                </button>
              </form>
            </div>
          </div>

          {/* right */}
          <div className=" col-span-3 lg:col-span-2 w-full h-full shadow-xl shadow-gray-400 rounded-xl p-4 ">
            <div className="lg:p-4 h-full">
              <div>
                <button
                  style={{ backgroundColor: currentColor }}
                  className="w-full rounded-full py-4 my-4 "
                  onClick={() => setIsDisabled(!isDisabled)}
                >
                  Update profile
                </button>
              </div>
              <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative hover:scale-105 ease-in duration-300">
                <span className="uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm">
                  {name_of_abonement}
                </span>
                <div>
                  <p className="text-6xl font-bold py-4 flex">
                    {`$${price}`}
                    <span className="text-xl text-slate-500 flex flex-col justify-end">
                      /mo
                    </span>
                  </p>
                </div>
                <div className="text-2xl">
                  <p>{description}</p>
                  <button
                    style={{ backgroundColor: currentColor }}
                    className="w-full rounded-full py-4 my-4 "
                    onClick={handleClick}
                  >
                    Choose abonement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;

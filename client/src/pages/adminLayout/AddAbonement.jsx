import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { useStateContext } from "../../contexts/ContextProvider";
import { useForm } from "react-hook-form";
import useFetch from "../../custom_hooks/useFetch";

//Component that allow to browse current abonements and add new ones
const AddAbonement = () => {
  const { currentColor } = useStateContext();
  const [allAbonements, setAllAbonements] = useState([]);
  const [urlsArray, setUrlsArray] = useState([{ url: "/readAllAbonements" }]);
  const { data, fetchErr, isLoading } = useFetch(urlsArray);
  useEffect(() => {
    setAllAbonements(data[0]);
  }, [data]);

  //form hook
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { name_of_abonement, price, description, errors },
  } = useForm({
    defaultValues: {
      name_of_abonement: "",
      price: "",
      description: "",
    },
  });

  const onSubmit = ({ price, name_of_abonement, description }) => {
    setValue(price);
    setValue(description);
    setAllAbonements([
      ...allAbonements,
      {
        name_of_abonement,
        price,
        description,
      },
    ]);
    fetch("/createAbonement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name_of_abonement, price, description }),
    });
  };

  const handleReset = () => {
    resetField("name_of_abonement");
    resetField("price");
    resetField("description");
  };

  return (
    <div
      name="Abonements"
      className="w-full mt-0 text-white bg-zinc-100  dark:bg-gray-800"
    >
      <div className="max-w-[1240px] mx-auto py-12 ">
        {/**to create new abonement */}

        {/**Abonements boxes */}
        <div className="grid md:grid-cols-3 ">
          {isLoading && <p>Loading</p>}
          {fetchErr && <p>{fetchErr}</p>}
          {!isLoading &&
            allAbonements.map((item) => {
              return (
                <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative hover:scale-105 ease-in duration-300">
                  <span className="uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm">
                    {item.name_of_abonement}
                  </span>
                  <div>
                    <p className="text-6xl font-bold py-4 flex">
                      {`$${item.price}`}
                      <span className="text-xl text-slate-500 flex flex-col justify-end">
                        /mo
                      </span>
                    </p>
                  </div>

                  <div className="text-2xl">
                    <p className="flex py-4">
                      <CheckIcon className="w-8 mr-5 text-green-600" />
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}

          {/**Create Abonement*/}
          <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative hover:scale-105 ease-in duration-300">
            <form
              action=""
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="text-black">Creating abonement</h2>
              <input
                className="bg-[#ccd6f6] p-2 text-black my-10"
                name="name_of_abonement"
                type="text"
                placeholder="enter name of abonement"
                value={register.name_of_abonement}
                {...register("name_of_abonement", { required: true })}
              />
              {errors.cost?.type === "required" && (
                <p className="text-white z-10 ">*cost is required</p>
              )}
              <input
                className="bg-[#ccd6f6] p-2 text-black my-10"
                name="price"
                type="text"
                placeholder="enter price of abonement"
                value={register.price}
                {...register("price", { required: true })}
              />
              {errors.cost?.type === "required" && (
                <p className="text-white z-10 ">*cost is required</p>
              )}
              <textarea
                className="bg-[#ccd6f6] p-2"
                name="description"
                rows="10"
                placeholder="Enter description"
                value={register.description}
                {...register("description", { required: true })}
              />
              <button
                style={{ backgroundColor: currentColor }}
                className="w-64 rounded-full py-3 mt-8  relative text-white"
                type="Submit"
              >
                Add new Abonement
              </button>
              <button
                className="w-64 rounded-full py-3 mt-8  relative text-white bg-red-600"
                onClick={handleReset}
              >
                Clear
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAbonement;

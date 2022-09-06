import React from 'react'
import { SiVisa } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa";
import { GoCreditCard } from "react-icons/go";
import { useForm } from "react-hook-form";

const Payment = () => {

const month=[1,2,3,4,5,6,7,8,9,10,11,12];

const icons = [<SiVisa />, <FaCcMastercard />, <GoCreditCard/>];

 const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm({
   defaultValues: {
     cardNumber: "",
     cvv: "",
     experationDateMonth: "",
     experationDateYear: "",
     cardHolderName: "",
     amount: "",
   },
 });
 const onSubmit = (data) => {
   // event.preventDefault();
   // await submitForm(event.target);

   console.log(data);
 };

  return (
    <div
      id="contact"
      className="w-full md:w-full lg:h-screen  dark:bg-secondary-dark-bg bg-white"
    >
      <div className="flex justify-center m-auto px-2  w-full dark:bg-secondary-dark-bg bg-zinc-100 ">
        <div className="w-1/3 bg-zinc-100 rounded-3xl  ">
          {/* left */}
          <div className=" w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4 ">
            <div className="p-4">
              <p className="flex flex-row text-xl tracking-widest uppercase text-[#5651e5]">
                Payment Details icons of visa{" "}
                {icons.map((el) => {
                  return el;
                })}
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 w-full py-2">
                  <label className="uppercase text-sm py-2">Card number</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="text"
                    name="Card number"
                    {...register("cardNumber")}
                  />
                  {/**Cvv & exparation date */}
                  <div className="flex flex-col lg:flex-row justify-between ">
                    <div className="flex flex-col  md:w-full">
                      <label className="uppercase text-sm py-2">Cvv</label>
                      <input
                        className="border-2 rounded-lg p-3 flex border-gray-300"
                        type="text"
                        name="Cvv"
                        {...register("cvv")}
                      />
                    </div>
                    <div className="flex flex-col pl-2  md:w-full">
                      <label className="uppercase text-sm py-2">
                        Experation date
                      </label>
                      <div className="flex flex-col lg:flex-row">
                        <select
                          name="Experation date"
                          className="w-22 border-2 rounded-lg p-3 flex border-gray-300"
                          {...register("experationDateMonth")}
                        >
                          {month.map((el, i) => {
                            return (
                              <option value={el} key={i}>
                                {el}
                              </option>
                            );
                          })}
                        </select>

                        {/**year */}
                        <select
                          name="Experation date"
                          className="w-22 border-2 rounded-lg p-3 flex border-gray-300"
                          {...register("experationDateYear")}
                        >
                          {Array(7)
                            .fill(new Date().getFullYear())
                            .map((year, i) => {
                              return (
                                <option value={year + i} key={i}>
                                  {year + i}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <label className="uppercase text-sm py-2">
                    Card holder name
                  </label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="text"
                    name="Card holder name"
                    {...register("cardHolderName")}
                  />
                  <label className="uppercase text-sm py-2">Amount</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="text"
                    name="Amount"
                    {...register("amount")}
                  />
                </div>

                <button className="w-full rounded-full p-4 bg-slate-700 hover:bg-slate-500 text-gray-100 mt-4">
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment
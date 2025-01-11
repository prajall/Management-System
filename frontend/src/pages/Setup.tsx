"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Setup = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmitStep1 = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/installation/add-config`,
        { appName: data.appName }
      );
      if (response.status == 200) {
        setStep(2);
      } else {
        console.log(response);
        setError("appName", {
          message: response.data ? response.data : "Failed",
        });
      }
    } catch (error: any) {
      console.log(error);
      if (error.message == "Network Error") {
        toast.error("Error connecting to server");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitStep2 = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/installation/add-env`,
        { productKey: data.productKey }
      );
      if (response.status == 200) {
        setStep(3);
      } else {
        setError("productKey", {
          message: response.data ? response.data : "Failed",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitStep3 = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/installation/add-env`,
        { dbUrl: data.dbUrl, apiKey: data.apiKey }
      );
      if (response.status == 200) {
        setStep(4);
      } else {
        setError("dbUrl", {
          message: response.data ? response.data : "Failed",
        });
      }
    } catch (error) {
      console.log(error);
      setError("dbUrl", {
        message: "Failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitStep4 = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/installation/finish-installatio`
      );
      if (response.status == 200) {
        toast.success("Setup Completed");
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      if (error.message == "Network Error") {
        toast.error("Error connecting to server");
      } else if (error.response.status >= 500) {
        toast.error("Internal Server Error. Failed to complete setup");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center">
      <div className="border mt-4 rounded-xl py-4 p-2 md:p-6 overflow-hidden">
        <h3 className="text-3xl text-green font-bold text-center text-emerald duration-300 ">
          Setup Your App
        </h3>
        <form
          onSubmit={handleSubmit(
            step === 1
              ? onSubmitStep1
              : step === 2
              ? onSubmitStep2
              : step === 3
              ? onSubmitStep3
              : onSubmitStep4
          )}
          className="flex flex-col p-3 mt-4 w-full sm:w-96 mx-auto "
        >
          <div>
            {step === 1 && (
              <>
                <div className=" w-full flex items-start flex-col mb-3">
                  <label className=" text-sm font-semibold mb-2">
                    App Name
                  </label>
                  <input
                    {...register("appName", {
                      required: "App Name is Required",
                    })}
                    placeholder="App Name"
                    type="text"
                    className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                  {errors.appName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.appName.message?.toString()}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="mt-4 bg-primary disabled:opacity-80 w-full text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Next"}
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="relative w-full">
                  <label className="text-sm font-semibold mt-4 mb-2 text-black">
                    Product Key
                  </label>
                  <input
                    {...register("productKey", {
                      required: "Product Key is Required",
                    })}
                    type="text"
                    placeholder="Product Key"
                    className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                  {errors.productKey && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.productKey.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="flex justify-between mt-4 items-center">
                  <Button
                    type="button"
                    variant={"link"}
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    {"<< "}Back
                  </Button>
                  <Button type="submit" className="">
                    Next {" >>"}
                  </Button>
                </div>
                {/* </div> */}
              </>
            )}

            {step == 3 && (
              <div>
                <div className="relative w-full">
                  <label className="text-sm font-semibold mt-4 mb-2 text-black">
                    Database Url
                  </label>
                  <input
                    {...register("dbUrl", {
                      required: "Database URL is Required",
                    })}
                    type="text"
                    placeholder="Database URL"
                    className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                  {errors.dbUrl && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.dbUrl.message?.toString()}
                    </p>
                  )}
                  <label className="text-sm font-semibold mt-4 mb-2 text-black">
                    Api Key
                  </label>
                  <input
                    {...register("apiKey", { required: "API key is Required" })}
                    type="text"
                    placeholder="API key"
                    className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                  {errors.apiKey && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.apiKey.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="flex justify-between mt-4">
                  <Button
                    variant={"link"}
                    onClick={() => {
                      setStep(2);
                    }}
                  >
                    {"<< "}Back
                  </Button>
                  <Button
                    type="submit"
                    className="text-white"
                    disabled={isSubmitting}
                  >
                    Finish
                  </Button>
                </div>
              </div>
            )}
            {step === 4 && (
              <>
                <div className=" w-full flex items-start flex-col mb-3">
                  <p className="text-muted-foreground">
                    Your files are configured. Click finish to complete the
                    installation process
                  </p>
                </div>

                <Button
                  type="submit"
                  className="mt-4 disabled:opacity-80 w-full text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Finish Installation"}
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setup;

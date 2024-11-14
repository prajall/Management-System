import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Image, X } from "lucide-react";
import Header from "../components/Header";
import { Area, City, Country, RoleProp } from "@/types";

export default function AddEmployee() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [roles, setRoles] = useState<RoleProp[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();

  const navigate = useNavigate();

  const fetchRoles = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/role`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setRoles(response.data);
      } else {
        throw new Error("Failed to Fetch Roles");
      }
    } catch (error: any) {
      if (error.message && error.message === "Network Error") {
        toast.error("Error connecting to the server");
      }
      if (error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsFetching(false);
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("gender", data.gender);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("mobile", data.mobile);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("role", data.role);
      formData.append("joinDate", data.joinDate);
      formData.append("leftDate", data.leftDate);
      formData.append(
        "address",
        JSON.stringify({
          country: data.country,
          state: data.state,
          city: data.city,
        })
      );

      if (profileImage) {
        formData.append("profileImage", profileImage);
        //add
      }

      console.log("formData", formData);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/employee`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      toast.success("Employee registered successfully");
      navigate("/admin/employees");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to register employee");
      }
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const config = JSON.parse(localStorage.getItem("config") || "{}");
  const countries = config.countries || [];

  useEffect(() => {
    fetchRoles();
  }, []);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header pageTitle="Add Employee" />
      <Card className="w-full mx-auto mt-16">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            PERSONAL INFORMATION
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="Enter Name"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup defaultValue="male" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="male"
                      id="male"
                      {...register("gender")}
                    />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="female"
                      id="female"
                      {...register("gender")}
                    />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="other"
                      id="other"
                      {...register("gender")}
                    />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password*</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Enter Password"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password*</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", { required: true })}
                  placeholder="Enter Confirm Password"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile No.*</Label>
                <Input
                  id="mobile"
                  {...register("mobile", { required: true })}
                  placeholder="Enter Mobile No"
                />
                {errors.mobile && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  placeholder="yyyy-mm-dd"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role*</Label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role._id} value={role._id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date*</Label>
                <Input
                  id="joinDate"
                  type="date"
                  {...register("joinDate", { required: true })}
                />
                {errors.joinDate && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="leftDate">Left Date</Label>
                <Input
                  id="leftDate"
                  type="date"
                  {...register("leftDate")}
                  placeholder="yyyy-mm-dd"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="block">
                  Profile Image
                </Label>
                {profileImage && (
                  <div className="relative w-fit group">
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt={`Profile Image`}
                      className={`w-40 h-40 aspect-square object-cover rounded `}
                    />

                    <button
                      type="button"
                      onClick={() => setProfileImage(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
                <Input
                  id="image"
                  type="file"
                  className="hidden"
                  {...register("image")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log("Setting profile image", file);
                      setProfileImage(file);
                    }
                  }}
                />
                {!profileImage && (
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("image")?.click();
                    }}
                    className="flex items-center gap-1"
                  >
                    <Image size={16} />
                    Upload Image
                  </Button>
                )}
                {errors.image && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <CardTitle className="text-xl font-bold text-primary">
                ADDRESS
              </CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="country">Country*</Label>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country: Country) => (
                            <SelectItem key={country.name} value={country.name}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.country && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Town/City</Label>
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!watch("country")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {watch("country") &&
                            countries
                              .find(
                                (country: Country) =>
                                  country.name === watch("country")
                              )
                              ?.cities?.map((city: City) => (
                                <SelectItem key={city.name} value={city.name}>
                                  {city.name}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area</Label>
                  <Controller
                    name="area"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!watch("city")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          {watch("city") &&
                            countries
                              .find(
                                (country: Country) =>
                                  country.name === watch("country")
                              )
                              ?.cities.find(
                                (city: City) => city.name === watch("city")
                              )
                              ?.areas.map((area: Area) => (
                                <SelectItem key={area.name} value={area.name}>
                                  {area.name}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

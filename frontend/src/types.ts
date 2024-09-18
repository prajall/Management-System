export interface PermissionProp {
  module: string;
  actions: string[];
}

export interface RoleProp {
  _id: string;
  name: string;
  permissions: PermissionProp[];
}
export interface UserProp {
  _id: string;
  email: string;
  password?: string;
  name?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Area {
  name: string;
}

export interface City {
  name: string;
  areas: Area[];
}

export interface Country {
  name: string;
  cities: City[];
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  basePrice: number;
  category?: string;
  images: string[];
  user: string;
  discountAmount?: number;
  variations?: string[];
  stock: number;
  brand: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Address {
  country: string;
  state: string;
  city: string;
  addressLine: string;
}

export interface Employee {
  name: string;
  gender: "Male" | "Female";
  email: string;
  password: string;
  mobileNo: string;
  joinDate: Date;
  leftDate?: Date;
  image?: string;
  branch: string;
  role: string;
  dateOfBirth?: Date;
  landlineNo?: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}

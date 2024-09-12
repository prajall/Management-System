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

export interface City {
  name: string;
  areas: string[];
}

export interface Country {
  name: string;
  cities: City[];
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

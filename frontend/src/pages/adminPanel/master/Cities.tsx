import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface City {
  name: string;
  regions: string[];
}

interface Country {
  name: string;
  cities: City[];
}

const Cities = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [newCity, setNewCity] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem("config") || "{}");
    if (config.countries) {
      setCountries(config.countries);
    }
  }, []);

  const addCity = () => {
    if (newCity.trim() !== "" && selectedCountry) {
      const updatedCountries = countries.map((country) => {
        if (country.name === selectedCountry) {
          return {
            ...country,
            cities: [...country.cities, { name: newCity.trim(), regions: [] }],
          };
        }
        return country;
      });

      setCountries(updatedCountries);

      const config = JSON.parse(localStorage.getItem("config") || "{}");
      config.countries = updatedCountries;
      localStorage.setItem("config", JSON.stringify(config));

      setNewCity("");
      setIsDialogOpen(false);
    }
  };

  const filteredCities = selectedCountry
    ? countries
        .find((country) => country.name === selectedCountry)
        ?.cities.filter((city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || []
    : [];

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <Select onValueChange={setSelectedCountry} value={selectedCountry}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country, index) => (
              <SelectItem key={index} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search cities"
          className="flex-grow"
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <div className="mb-4">
            <Button disabled={!selectedCountry}>Add City</Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New City to {selectedCountry}</DialogTitle>
          </DialogHeader>
          <Input
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="Enter city name"
          />
          <Button onClick={addCity}>Add</Button>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cities in {selectedCountry}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCities.map((city, index) => (
            <TableRow key={index}>
              <TableCell>{city.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Cities;

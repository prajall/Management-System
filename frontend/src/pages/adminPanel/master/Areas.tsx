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

const Areas = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [newArea, setNewArea] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem("config") || "{}");
    if (config.countries) {
      setCountries(config.countries);
    }
  }, []);

  const addArea = () => {
    if (newArea.trim() !== "" && selectedCountry && selectedCity) {
      const updatedCountries = countries.map((country) => {
        if (country.name === selectedCountry) {
          return {
            ...country,
            cities: country.cities.map((city) => {
              if (city.name === selectedCity) {
                return {
                  ...city,
                  regions: [...city.regions, newArea.trim()],
                };
              }
              return city;
            }),
          };
        }
        return country;
      });

      setCountries(updatedCountries);

      const config = JSON.parse(localStorage.getItem("config") || "{}");
      config.countries = updatedCountries;
      localStorage.setItem("config", JSON.stringify(config));

      setNewArea("");
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    setSelectedCity("");
  }, [selectedCountry]);

  const selectedCountryData = countries.find(
    (country) => country.name === selectedCountry
  );
  const selectedCityData = selectedCountryData?.cities.find(
    (city) => city.name === selectedCity
  );

  const filteredAreas =
    selectedCityData?.regions.filter((area) =>
      area.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div>
      <div className="mb-4 flex gap-4 flex-col lg:flex-row">
        <div className="flex gap-4 ">
          <Select onValueChange={setSelectedCountry} value={selectedCountry}>
            <SelectTrigger className="w-full min-w-[150px]">
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
          <Select onValueChange={setSelectedCity} value={selectedCity}>
            <SelectTrigger className="w-full min-w-[150px]">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {selectedCountryData?.cities.length === 0 ? (
                <p className="text-xs text-gray-500 p-2">No Cities</p>
              ) : (
                selectedCountryData?.cities.map((city, index) => (
                  <SelectItem key={index} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search areas"
          className="flex-grow"
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger disabled={!selectedCountry || !selectedCity}>
          <div className="mb-4">
            <Button disabled={!selectedCountry || !selectedCity}>
              Add Area
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add New Area to {selectedCity}, {selectedCountry}
            </DialogTitle>
          </DialogHeader>
          <Input
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder="Enter area name"
          />
          <Button onClick={addArea}>Add</Button>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">SNo.</TableHead>
            <TableHead>
              Areas in {selectedCity}, {selectedCountry}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAreas.map((area, index) => (
            <TableRow key={index}>
              <TableCell className="w-10">{index + 1}</TableCell>
              <TableCell>{area}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Areas;

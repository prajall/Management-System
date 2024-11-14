import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

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
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [newCityName, setNewCityName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false); // New state for add dialog
  const [searchTerm, setSearchTerm] = useState("");
  const [filteringCountry, setFilteringCountry] = useState<string>("All");

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem("config") || "{}");
    if (config.countries) {
      setCountries(config.countries);
    }
  }, []);

  const updateCity = () => {
    if (newCityName.trim() !== "" && selectedCity && selectedCountry) {
      const updatedCountries = countries.map((country) => {
        if (country.name === selectedCountry) {
          return {
            ...country,
            cities: country.cities.map((city) => {
              if (city.name === selectedCity.name) {
                return { ...city, name: newCityName.trim() };
              }
              return city;
            }),
          };
        } else {
          return {
            ...country,
            cities: country.cities.filter(
              (city) => city.name !== selectedCity.name
            ),
          };
        }
      });

      const newCountryIndex = updatedCountries.findIndex(
        (country) => country.name === selectedCountry
      );

      if (newCountryIndex !== -1) {
        updatedCountries[newCountryIndex].cities.push({
          ...selectedCity,
          name: newCityName.trim(),
        });
      }

      setCountries(updatedCountries);

      const config = JSON.parse(localStorage.getItem("config") || "{}");
      config.countries = updatedCountries;
      localStorage.setItem("config", JSON.stringify(config));

      setNewCityName("");
      setIsDialogOpen(false);
    }
  };

  const addCity = () => {
    if (newCityName.trim() !== "" && selectedCountry) {
      const updatedCountries = countries.map((country) => {
        if (country.name === selectedCountry) {
          return {
            ...country,
            cities: [
              ...country.cities,
              { name: newCityName.trim(), areas: [] },
            ],
          };
        }
        return country;
      });

      setCountries(updatedCountries as Country[]);

      const config = JSON.parse(localStorage.getItem("config") || "{}");
      config.countries = updatedCountries;
      localStorage.setItem("config", JSON.stringify(config));

      setNewCityName("");
      setIsAddDialogOpen(false);
    }
  };

  const deleteCity = () => {
    if (selectedCity && selectedCountry) {
      const updatedCountries = countries.map((country) => {
        if (country.name === selectedCountry) {
          return {
            ...country,
            cities: country.cities.filter(
              (city) => city.name !== selectedCity.name
            ),
          };
        }
        return country;
      });

      setCountries(updatedCountries);

      const config = JSON.parse(localStorage.getItem("config") || "{}");
      config.countries = updatedCountries;
      localStorage.setItem("config", JSON.stringify(config));

      setSelectedCity(null);
      setSelectedCountry("");
      setNewCityName("");
      setIsDialogOpen(false);
    }
  };

  const filteredCities = countries
    .flatMap((country) =>
      country.cities.map((city) => ({ ...city, country: country.name }))
    )
    .filter(
      (city) => filteringCountry === "All" || city.country === filteringCountry
    )
    .filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex gap-2">
          <Select onValueChange={setFilteringCountry} value={filteringCountry}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent className="w-[150px]">
              <SelectItem value="All">All</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
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
        <Button className="w-fit" onClick={() => setIsAddDialogOpen(true)}>
          Add New City
        </Button>{" "}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">SNo.</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCities.map((city, index) => (
            <TableRow
              key={index}
              className="cursor-pointer"
              onClick={() => {
                setSelectedCity(city);
                setNewCityName(city.name);
                setIsDialogOpen(true);
                setSelectedCountry(city.country);
              }}
            >
              <TableCell className="w-10">{index + 1}</TableCell>
              <TableCell>{city.name}</TableCell>
              <TableCell>{city.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit City</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <Select onValueChange={setSelectedCountry} value={selectedCountry}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent className="w-[150px]">
                {countries.map((country) => (
                  <SelectItem key={country.name} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              placeholder="Enter city name"
            />
          </div>
          <div className="flex ml-auto gap-6">
            <Button
              onClick={deleteCity}
              variant="link"
              className="p-0 text-red-500"
            >
              {/* <Trash size={16} /> */}
              Delete
            </Button>
            <Button onClick={updateCity}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add City</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <div className="w-full max-w-[150px]">
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.name} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              placeholder="Enter city name"
            />
          </div>
          <Button
            onClick={addCity}
            disabled={!newCityName.trim() || !selectedCountry}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cities;

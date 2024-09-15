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

interface Area {
  name: string;
}

interface City {
  name: string;
  areas: Area[];
}

interface Country {
  name: string;
  cities: City[];
}

const Areas = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [newAreaName, setNewAreaName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false); // New state for add dialog
  const [searchTerm, setSearchTerm] = useState("");
  const [filteringCountry, setFilteringCountry] = useState<string>("All");
  const [filteringCity, setFilteringCity] = useState<string>("All");

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem("config") || "{}");
    if (config.countries) {
      setCountries(config.countries);
    }
  }, []);

  const updateArea = () => {
    if (
      newAreaName.trim() !== "" &&
      selectedArea &&
      selectedCity &&
      selectedCountry
    ) {
      const updatedCountries = countries.map((country) => {
        if (country.name === selectedCountry) {
          return {
            ...country,
            cities: country.cities.map((city) => {
              if (city.name === selectedCity) {
                return {
                  ...city,
                  areas: city.areas.map((area) => {
                    if (area.name === selectedArea.name) {
                      return { ...area, name: newAreaName.trim() };
                    }
                    return area;
                  }),
                };
              }
              return city;
            }),
          };
        } else {
          return {
            ...country,
            cities: country.cities.filter((city) => city.name !== selectedCity),
          };
        }
      });

      const newCountryIndex = updatedCountries.findIndex(
        (country) => country.name === selectedCountry
      );

      if (newCountryIndex !== -1) {
        updatedCountries[newCountryIndex].cities.push({
          name: newAreaName.trim(),
          areas: selectedArea ? [selectedArea] : [],
        });
      }

      setCountries(updatedCountries);

      const config = JSON.parse(localStorage.getItem("config") || "{}");
      config.countries = updatedCountries;
      localStorage.setItem("config", JSON.stringify(config));

      setNewAreaName("");
      setIsDialogOpen(false);
    }
  };

  const addArea = () => {
    if (newAreaName.trim() !== "" && selectedCity && selectedCountry) {
      const updatedCountries = countries.map((country) => {
        if (country.name === selectedCountry) {
          return {
            ...country,
            cities: country.cities.map((city) => {
              if (city.name === selectedCity) {
                return {
                  ...city,
                  areas: [...city.areas, { name: newAreaName.trim() }],
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

      setNewAreaName("");
      setIsAddDialogOpen(false);
    }
  };

  console.log(JSON.parse(localStorage.getItem("config") || "{}"));

  const deleteArea = () => {
    if (selectedArea && selectedCity && selectedCountry) {
      const updatedCountries = countries.map((country) => {
        if (country.name === selectedCountry) {
          return {
            ...country,
            cities: country.cities.map((city) => {
              if (city.name === selectedCity) {
                return {
                  ...city,
                  areas: city.areas.filter(
                    (area) => area.name !== selectedArea.name
                  ),
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

      setSelectedArea(null);
      setSelectedCity("");
      setNewAreaName("");
      setIsDialogOpen(false);
    }
  };

  const filteredAreas = countries
    .flatMap(
      (country) =>
        country.cities?.flatMap(
          (city) =>
            city.areas?.map((area) => ({
              ...area,
              city: city.name,
              country: country.name,
            })) || []
        ) || []
    )
    .filter(
      (area) =>
        (filteringCountry === "All" || area.country === filteringCountry) &&
        (filteringCity === "All" || area.city === filteringCity)
    )
    .filter((area) =>
      area.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    setFilteringCity("All");
  }, [filteringCountry]);

  useEffect(() => {
    console.log({ selectedCountry, selectedCity });
  }, [selectedCountry, selectedCity]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex flex-col  gap-2">
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium text-gray-500">
              Country:
            </label>
            <Select
              onValueChange={setFilteringCountry}
              value={filteringCountry}
            >
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
            <label className="text-sm font-medium text-gray-500">City:</label>
            <Select onValueChange={setFilteringCity} value={filteringCity}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent className="w-[150px]">
                <SelectItem value="All">All</SelectItem>
                {countries
                  .filter(
                    (country) =>
                      filteringCountry === "All" ||
                      country.name === filteringCountry
                  )
                  .flatMap((country) => country.cities)
                  .map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
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
        <Button
          className="w-fit"
          onClick={() => {
            setIsAddDialogOpen(true);
            setSelectedCountry(filteringCountry);
            setSelectedCity(filteringCity);
          }}
        >
          Add New Area
        </Button>{" "}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">SNo.</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAreas.map((area, index) => (
            <TableRow
              key={index}
              className="cursor-pointer"
              onClick={() => {
                setSelectedArea(area);
                setSelectedCity(area.city);
                setSelectedCountry(area.country);
                setNewAreaName(area.name);
                setIsDialogOpen(true);
              }}
            >
              <TableCell className="w-10">{index + 1}</TableCell>
              <TableCell>{area.name}</TableCell>
              <TableCell>{area.city}</TableCell>
              <TableCell>{area.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Area</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <Select
              onValueChange={setSelectedCountry}
              value={selectedCountry === "All" ? "" : selectedCountry}
            >
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
            <Select onValueChange={setSelectedCity} value={selectedCity}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent className="w-[150px]">
                {countries
                  .filter(
                    (country) =>
                      selectedCountry === "All" ||
                      country.name === selectedCountry
                  )
                  .flatMap((country) => country.cities)
                  .map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Input
              value={newAreaName}
              onChange={(e) => setNewAreaName(e.target.value)}
              placeholder="Enter area name"
            />
          </div>
          <div className="flex ml-auto gap-6">
            <Button
              onClick={deleteArea}
              variant="link"
              className="p-0 text-red-500"
            >
              {/* <Trash size={16} /> */}
              Delete
            </Button>
            <Button onClick={updateArea}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Area</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <div className="w-full max-w-[150px]">
              <Select
                value={selectedCountry == "All" ? "" : selectedCountry}
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
            <div className="w-full max-w-[150px]">
              <Select
                value={selectedCity == "All" ? "" : selectedCity}
                onValueChange={setSelectedCity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {countries
                    .filter(
                      (country) =>
                        selectedCountry === "All" ||
                        country.name === selectedCountry
                    )
                    .flatMap((country) => country.cities)
                    .map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              value={newAreaName}
              onChange={(e) => setNewAreaName(e.target.value)}
              placeholder="Enter area name"
            />
          </div>
          <Button
            onClick={addArea}
            disabled={!newAreaName.trim() || !selectedCity || !selectedCountry}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Areas;

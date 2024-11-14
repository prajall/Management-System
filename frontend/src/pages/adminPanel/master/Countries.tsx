import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useEffect, useState } from "react";

interface Region {
  name: string;
}

interface City {
  name: string;
  regions: Region[];
}

interface Country {
  name: string;
  cities: City[];
}

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCountry, setNewCountry] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false); // New state for add dialog
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem("config") || "{}");
    if (config.countries) {
      setCountries(config.countries);
    }
  }, []);

  const addCountry = () => {
    if (newCountry.trim() !== "") {
      const updatedCountries = [...countries, { name: newCountry, cities: [] }];
      setCountries(updatedCountries);

      const config = JSON.parse(localStorage.getItem("config") || "{}");
      config.countries = updatedCountries;
      localStorage.setItem("config", JSON.stringify(config));

      setNewCountry("");
      setIsAddDialogOpen(false);
    }
  };

  const updateCountry = () => {
    if (newCountry.trim() !== "" && selectedCountry) {
      const updatedCountries = countries.map((country) =>
        country.name === selectedCountry.name
          ? { ...country, name: newCountry.trim() }
          : country
      );

      setCountries(updatedCountries);

      const config = JSON.parse(localStorage.getItem("config") || "{}");
      config.countries = updatedCountries;
      localStorage.setItem("config", JSON.stringify(config));

      setNewCountry("");
      setIsDialogOpen(false);
    }
  };

  const deleteCountry = () => {
    if (selectedCountry) {
      const updatedCountries = countries.filter(
        (country) => country.name !== selectedCountry.name
      );

      setCountries(updatedCountries);

      const config = JSON.parse(localStorage.getItem("config") || "{}");
      config.countries = updatedCountries;
      localStorage.setItem("config", JSON.stringify(config));

      setSelectedCountry(null);
      setNewCountry("");
      setIsDialogOpen(false);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search countries"
        />
      </div>
      <Button className="mb-4" onClick={() => setIsAddDialogOpen(true)}>
        Add Country
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">SNo.</TableHead>
            <TableHead>Countries</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCountries.map((country, index) => (
            <TableRow
              key={index}
              className="cursor-pointer"
              onClick={() => {
                setSelectedCountry(country);
                setNewCountry(country.name);
                setIsDialogOpen(true);
              }}
            >
              <TableCell className="w-10">{index + 1}</TableCell>
              <TableCell>{country.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Country</DialogTitle>
          </DialogHeader>
          <Input
            value={newCountry}
            onChange={(e) => setNewCountry(e.target.value)}
            placeholder="Enter country name"
          />
          <div className="flex ml-auto gap-6">
            <Button
              onClick={deleteCountry}
              variant="link"
              className="p-0 text-red-500"
            >
              Delete
            </Button>
            <Button onClick={updateCountry}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Country</DialogTitle>
          </DialogHeader>
          <Input
            value={newCountry}
            onChange={(e) => setNewCountry(e.target.value)}
            placeholder="Enter country name"
          />
          <Button onClick={addCountry}>Add</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Countries;

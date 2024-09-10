import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import axios from "axios";
import { toast } from "react-toastify";
import { RoleProp } from "../types";
import ModulePermissions from "../components/ModulePermissions";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import Header from "../components/Header";

const RoleManagement = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [roles, setRoles] = useState<RoleProp[]>([]);
  const [roleName, setRoleName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleAddRole = async () => {
    if (!roleName) {
      toast.error("Role name is required");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/role/new-role`,
        {
          name: roleName,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Role added successfully");
        // setRoles((prevRoles) => [...prevRoles, response.data]);
        fetchRoles();
        setIsDialogOpen(false);
        setRoleName("");
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchRoles();

    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/role/sse`
    );

    eventSource.onmessage = (event) => {
      console.log("roles updated", event.data);
      setRoles(JSON.parse(event.data));
    };
    eventSource.onerror = (error) => {
      console.error("Role SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <Header
        title="Role Management"
        description="Manage Roles and Permissions each role can have"
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-teal-600 text-white"
            onClick={() => setIsDialogOpen(true)}
          >
            Add Role
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <Input
              placeholder="Role Name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full"
            />
            <p className="text-muted-foreground my-2 text-xs">
              You can manage access to this role from role management
            </p>
          </div>
          <DialogFooter>
            <Button
              className="bg-teal-600 hover:bg-teal-500"
              onClick={handleAddRole}
            >
              Add Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isFetching && <p>Loading Roles...</p>}

      <Accordion type="single" collapsible className="min-w-96 w-full mt-4">
        {roles.map((role) => (
          <AccordionItem value={role._id} key={role._id}>
            <AccordionTrigger className="hover:no-underline bg-zinc-50 rounded-md px-4 ">
              {role.name}
            </AccordionTrigger>
            <AccordionContent className="rounded-md px-4">
              <ModulePermissions role={role} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RoleManagement;

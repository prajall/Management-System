import { RoleProp } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const ModulePermissions = ({ role }: { role: RoleProp }) => {
  const modules = ["Customer", "Product", "Orders", "Billing", "User"];
  const actions = ["View", "Add", "Edit", "Delete"];
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [updatedRole, setUpdatedRole] = useState({ ...role });

  const handlePermissionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    module: string,
    action: string
  ) => {
    const newUpdatedRole = { ...updatedRole };

    const modulePermission = newUpdatedRole.permissions.find(
      (permission) => permission.module === module
    );

    if (modulePermission) {
      if (e.target.checked) {
        if (!modulePermission.actions.includes(action)) {
          modulePermission.actions.push(action);
        }
      } else {
        modulePermission.actions = modulePermission.actions.filter(
          (a) => a !== action
        );
      }
    } else if (e.target.checked) {
      newUpdatedRole.permissions.push({
        module,
        actions: [action],
      });
    }

    setUpdatedRole(newUpdatedRole);
  };

  const updateRole = async () => {
    // Save updatedRole in the database
    console.log("Updated role:", updatedRole);
    try {
      console.log("Permissions", updatedRole.permissions);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/role/${updatedRole._id}/update`,
        { permissions: updatedRole.permissions },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const deleteRole = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/role/${role._id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Role deleted successfully");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    console.log(role);
  }, [role]);

  return (
    <div className="flex flex-col items-end">
      <Table>
        <TableHeader className="">
          <TableRow className="text-md">
            <TableHead className="w-[100px] text-center text-primary ">
              Module
            </TableHead>
            {actions.map((action) => (
              <TableHead className="text-center  text-primary ">
                {action.charAt(0).toUpperCase() + action.slice(1)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {modules.map((module) => {
            const modulePermission = updatedRole.permissions.find(
              (permission) => permission.module === module
            );
            return (
              <TableRow>
                <TableCell className="font-medium md:w-1/2 ">
                  <p className="pl-2 opacity-80">{module}</p>
                </TableCell>
                {actions.map((action) => {
                  const isChecked = modulePermission
                    ? modulePermission.actions.includes(action)
                    : false;

                  return (
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          handlePermissionChange(e, module, action)
                        }
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant={"link"}
              className=" text-red-600 px-6"
              onClick={() => setIsDialogOpen(true)}
            >
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Role: "{role.name}"?</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to delete this role?
            </DialogDescription>

            <DialogFooter>
              <Button
                variant={"outline"}
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant={"destructive"} onClick={deleteRole}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          onClick={updateRole}
          className="border bg-primary hover:bg-secondary border-primary text-white px-6"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ModulePermissions;

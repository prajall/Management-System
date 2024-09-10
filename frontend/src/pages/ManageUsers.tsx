import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RoleProp, UserProp } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState<UserProp[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProp | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [sortField, setSortField] = useState<string>("role");
  const [sortOrder] = useState<string>("dsc");
  const [roles, setRoles] = useState<RoleProp[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        params: {
          page: 1,
          limit: 10,
          sortField,
          sortOrder,
        },
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error: any) {
      if (error.response?.data?.message)
        toast.error(error.response?.data?.message);
      else {
        toast.error("Failed to fetch users.");
      }
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/role/wa`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) setRoles(response.data);
    } catch (error: any) {
      if (error.response?.data?.message)
        toast.error(error.response?.data?.message);
      else {
        toast.error("Failed to fetch users.");
      }
      console.error("Failed to fetch users:", error);
    }
  };

  const handleSortChange = (field: string) => {
    setSortField(field);
  };

  const handleConfirmRoleChange = async () => {
    if (selectedUser && selectedRole) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/user/role/${selectedUser._id}`,
          {
            newRole: selectedRole,
          },
          {
            withCredentials: true,
          }
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUser._id
              ? { ...user, role: selectedRole }
              : user
          )
        );
        toast.success("Role updated successfully!");
        fetchUsers();
      } catch (error: any) {
        if (error.response?.data?.message)
          toast.error(error.response?.data?.message);
        else {
          toast.error("Failed to update role.");
        }
        console.error("Failed to update role:", error);
      } finally {
        setOpenDialog(false);
      }
    }
  };

  const handleDeleteUser = async () => {
    console.log("Delete user");
    if (selectedUser) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/user/${selectedUser._id}`,

          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.status === 200) {
          toast.success("User Deleted Successfully!");
          fetchUsers();
        }
      } catch (error: any) {
        if (error.response?.data?.message)
          toast.error(error.response?.data?.message);
        else {
          toast.error("Failed to Delete User.");
        }
        console.error("Failed to Delete User:", error);
      } finally {
        setOpenDeleteDialog(false);
      }
    }
  };

  const openRoleChangeDialog = (user: UserProp, role: string) => {
    setSelectedUser(user);
    setSelectedRole(role);
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchUsers();
  }, [sortField]);

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <div className="mb-4 items-center flex gap-2">
        <p className="text-xs">Sort By</p>
        <Select
          value={sortField}
          onValueChange={(value) => handleSortChange(value)}
        >
          <SelectTrigger className="max-w-44">
            {sortField == "email" ? "Email" : "Role"}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="role">Role</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onValueChange={(value) => openRoleChangeDialog(user, value)}
                >
                  <SelectTrigger className="w-full border-teal-600 max-w-96 text-teal-600">
                    {user.role}
                    {/* <SelectValue placeholder="Select role" /> */}
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role._id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="flex justify-center">
                {/* <Button className="bg-teal-600 text-white">Edit</Button> */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <p className="font-semibold text-center">...</p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="text-red-400 text-xs h-6"
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenDeleteDialog(true);
                      }}
                    >
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogTitle>Confirm Role Change</DialogTitle>
          <DialogDescription>
            Are you sure you want to change the user's role to{" "}
            <strong>{selectedRole}</strong>?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmRoleChange}
              variant="default"
              className="bg-teal-600 text-white"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogTitle>Confirm Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user ?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteUser}
              variant="default"
              className="bg-red-600 text-white"
            >
              Delete yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsers;

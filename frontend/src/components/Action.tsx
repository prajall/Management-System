import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
const Action = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <p className="font-semibold text-center">...</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-red-400 text-xs h-6">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger className="text-xs">Delete User</DialogTrigger>
            <DialogContent>
              <DialogTitle>Confirm Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user ?
              </DialogDescription>
              <DialogFooter>
                <Button
                  onClick={() => setOpenDialog(false)}
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button
                  // onClick={}
                  variant="default"
                  className="bg-red-600 text-white"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;

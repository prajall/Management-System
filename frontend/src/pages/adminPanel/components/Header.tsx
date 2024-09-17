import Button from "@/components/Buttons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Header = ({
  pageTitle,
  addFunction,
  buttonText,
}: {
  pageTitle: string;
  addFunction?: () => void;
  buttonText?: any;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 left-0 lg:left-56 xl:left-60 h-16 w-full bg-primary shadow-sm flex items-center">
      <div className="lg:hidden fixed top-0 left-0 z-50">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger className="h-16 ml-4">
            <Menu className="text-white" />
          </SheetTrigger>
          <SheetContent className="m-0 p-0 w-56 xl:w-60 text-white" side="left">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <h1 className="text-2xl ml-10 lg:ml-0 font-semibold text-white px-4 h-16 flex items-center">
        {pageTitle}
      </h1>
      {addFunction && (
        <button
          onClick={addFunction}
          className="h-8 w-8 flex items-center rounded-full justify-center hover:bg-white/20 text-white font-bold"
        >
          {buttonText}
        </button>
      )}
    </header>
  );
};

export default Header;

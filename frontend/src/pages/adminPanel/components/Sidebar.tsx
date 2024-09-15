import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { sidebarItems } from "../sidebarItems";

const Sidebar = ({
  setPageTitle,
  closeSidebar,
}: {
  setPageTitle: (title: string) => void;
  closeSidebar: () => void;
}) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = sidebarItems
      .flatMap((section) => section.items)
      .find((item) => item.href === currentPath);
    if (currentItem) {
      setPageTitle(currentItem.name);
    } else if (currentPath === "/admin") {
      setPageTitle("Dashboard");
    }
  }, [location, setPageTitle]);

  const handleLinkClick = (title: string) => {
    setPageTitle(title);
    if (closeSidebar) closeSidebar();
  };

  return (
    <aside className="w-56 xl:w-60 bg-primary text-white h-screen overflow-y-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold">SmartGarage</h1>
      </div>
      <nav className="">
        <Link
          className="block px-4 py-4 font-semibold hover:bg-secondary border-b border-primary"
          to="/admin"
          onClick={() => handleLinkClick("Dashboard")}
        >
          Dashboard
        </Link>
        <Accordion type="single" className="w-full">
          {sidebarItems.map((section, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="border-b border-primary"
            >
              <AccordionTrigger className="px-4 hover:no-underline hover:bg-secondary data-[state=open]:bg-secondary">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="bg-secondary">
                <ul className="">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className=" py-1">
                      <Link
                        to={item.href}
                        className="block hover:underline  px-4 pl-5 py-2"
                        onClick={() => handleLinkClick(item.name)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </nav>
    </aside>
  );
};

export default Sidebar;

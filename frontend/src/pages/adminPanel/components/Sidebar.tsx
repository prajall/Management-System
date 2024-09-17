import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { sidebarItems } from "../sidebarItems";

const Sidebar = () => {
  return (
    <aside className="w-56 xl:w-60 bg-primary text-white h-screen overflow-y-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold">SmartGarage</h1>
      </div>
      <nav className="">
        <Link
          className="block px-4 py-4 font-semibold hover:bg-secondary border-b border-primary"
          to="/admin"
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

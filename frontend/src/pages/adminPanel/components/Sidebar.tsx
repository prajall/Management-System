import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const sidebarItems = [
    {
      title: "Business Partners",
      items: [
        { name: "Customers", href: "#" },
        { name: "Suppliers", href: "#" },
      ],
    },
    {
      title: "Masters",
      items: [
        { name: "Countries", href: "#" },
        { name: "Cities", href: "#" },
        { name: "Territories", href: "#" },
      ],
    },
    {
      title: "Vehicles",
      items: [{ name: "Vehicles", href: "#" }],
    },
    {
      title: "Inventory",
      items: [
        { name: "Products", href: "#" },
        { name: "Stock", href: "#" },
      ],
    },
    {
      title: "Financial",
      items: [
        { name: "Invoices", href: "#" },
        { name: "Expenses", href: "#" },
      ],
    },
  ];

  return (
    <aside className="w-56 xl:w-64 bg-primary text-white h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold">SmartGarage</h1>
      </div>
      <nav className="">
        <Link
          className="block px-4 py-4 font-semibold hover:bg-primary border-b border-primary"
          to="/admin"
        >
          Dashboard
        </Link>
        <Accordion type="multiple" className="w-full">
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
                        className="block hover:bg-primary  px-4 pl-5 py-2"
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

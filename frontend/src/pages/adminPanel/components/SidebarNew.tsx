import React from "react";
import {
  Home,
  Grid,
  DollarSign,
  Users,
  UserCircle,
  Shield,
  Calendar,
  ShoppingCart,
  FileText,
  BarChart2,
  FileIcon,
  GitBranch,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: Home, link: "dashboard" },
  { name: "Product", icon: Grid, link: "products" },
  { name: "POS", icon: DollarSign, link: "pos" },
  { name: "Customer", icon: Users, link: "customers" },
  { name: "Employee", icon: UserCircle, link: "employees" },
  { name: "Roles and Permission", icon: Shield, link: "roles-permissions" },
  { name: "Bookings", icon: Calendar, link: "bookings" },
  { name: "Orders", icon: ShoppingCart, link: "orders" },
  { name: "Billings", icon: FileText, link: "billings" },
  { name: "Reports", icon: BarChart2, link: "reports" },
  { name: "Templates", icon: FileIcon, link: "templates" },
  { name: "Branch", icon: GitBranch, link: "branch" },
  { name: "Configuration", icon: Settings, link: "configuration" },
];

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
  const [activeItem, setActiveItem] = React.useState("Dashboard");
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  return (
    <div className="w-72 bg-white h-screen shadow-lg p-4">
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <Link to={item.link} key={item.name}>
              <button
                className={`w-full text-left p-3 mt-3 flex items-center rounded-xl ease-in-out
                  ${
                    item.link.split("/")[1] === currentPath ||
                    hoveredItem === item.name
                      ? "bg-primary text-white shadow-sm shadow-primary"
                      : "text-gray-700"
                  }`}
                onClick={() => setActiveItem(item.name)}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="mr-4 bg-white shadow-md rounded-lg p-2">
                  <item.icon
                    size={20}
                    className={
                      item.link === currentPath || hoveredItem === item.name
                        ? "text-primary"
                        : "text-gray-500"
                    }
                  />
                </span>
                {item.name}
              </button>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
}

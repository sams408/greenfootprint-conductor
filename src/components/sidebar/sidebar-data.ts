
import {
  Leaf,
  BarChart3,
  Calculator,
  Database,
  UserCircle,
  Settings,
  Globe,
  Package,
  BarChart2,
  PieChart,
  Users,
  Lightbulb,
  BarChart,
} from "lucide-react";
import { SidebarCategory } from "./sidebar-types";

export const getDefaultCategories = (): SidebarCategory[] => [
  {
    labelKey: "measurementTitle",
    items: [
      {
        labelKey: "home",
        icon: Leaf,
        path: "/",
        expanded: false,
      },
      {
        labelKey: "dashboard",
        icon: BarChart3,
        path: "/dashboard",
        expanded: false,
      },
      {
        labelKey: "dataCollection",
        icon: Database,
        path: "/data-collection",
        expanded: true,
        children: [
          {
            labelKey: "emissions",
            path: "/emissions",
            icon: Globe,
          },
          {
            labelKey: "calculator",
            path: "/calculator",
            icon: Calculator,
          },
          {
            labelKey: "inventory",
            path: "/inventory",
            icon: Package,
          }
        ]
      }
    ]
  },
  {
    labelKey: "configurationTitle",
    items: [
      {
        labelKey: "users",
        icon: Users,
        path: "/users",
        expanded: false,
      },
      {
        labelKey: "statistics",
        icon: BarChart2,
        path: "/statistics",
        expanded: false,
      }
      // Settings item removed from here
    ]
  }
];

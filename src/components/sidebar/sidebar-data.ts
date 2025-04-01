
import {
  Leaf,
  BarChart3,
  Calculator,
  Database,
  UserCircle,
  FileText,
  Settings,
  Globe,
  Package,
  BarChart2,
  ClipboardList,
  PieChart,
  Users,
  Award,
  Target,
  Lightbulb,
  BarChart,
  Handshake,
  FileCheck
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
        labelKey: "tasks",
        icon: ClipboardList,
        path: "/tasks",
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
    labelKey: "actionPlanTitle",
    items: [
      {
        labelKey: "reduction",
        icon: Target,
        path: "/reduction",
        expanded: true,
        children: [
          {
            labelKey: "scenarios",
            path: "/scenarios",
            icon: PieChart,
          },
          {
            labelKey: "initiatives",
            path: "/initiatives",
            icon: Lightbulb,
          },
          {
            labelKey: "projection",
            path: "/projection",
            icon: BarChart,
          },
          {
            labelKey: "partners",
            path: "/partners",
            icon: Handshake,
          }
        ]
      },
      {
        labelKey: "certifications",
        icon: Award,
        path: "/certifications",
        expanded: false,
      },
      {
        labelKey: "subsidies",
        icon: FileCheck,
        path: "/subsidies",
        expanded: false,
      }
    ]
  },
  {
    labelKey: "communicationTitle",
    items: [
      {
        labelKey: "reports",
        icon: FileText,
        path: "/reports",
        expanded: false,
      },
      {
        labelKey: "publicProfile",
        icon: UserCircle,
        path: "/public-profile",
        expanded: false,
      },
      {
        labelKey: "awareness",
        icon: Globe,
        path: "/awareness",
        expanded: false,
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
      },
      {
        labelKey: "settings",
        icon: Settings,
        path: "/settings",
        expanded: false,
      }
    ]
  }
];

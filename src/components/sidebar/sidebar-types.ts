
import { ElementType } from "react";

export type SidebarCategory = {
  labelKey: string;
  items: SidebarItem[];
};

export type SidebarItem = {
  labelKey: string;
  icon: ElementType;
  path: string;
  children?: SidebarSubItem[];
  expanded?: boolean;
  badge?: string;
};

export type SidebarSubItem = {
  labelKey: string;
  path: string;
  icon?: ElementType;
  badge?: string;
};

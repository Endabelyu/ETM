import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Searchbar from "./searchbar";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTheme } from "@/components/theme-provider";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];
type navbarProps = {
  title?: string;
};
const Sidebar = ({ title }: navbarProps) => {
  return (
    <NavigationMenu
      className={`w-3/12 border-r-2 rounded-md min-h-[80vh] items-start`}
    >
      <NavigationMenuList className="flex-col h-full overflow-auto p-4 justify-between gap-8">
        <NavigationMenuItem>
          <h1 className="text-2xl bold">Home</h1>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Sidebar;

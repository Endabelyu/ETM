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
  setSearchValue: (search: string) => void;
};
const Navbar = ({ setSearchValue }: navbarProps) => {
  const { setTheme } = useTheme();
  return (
    <>
      <header className="sticky top-0 z-40 flex w-full border-b-2 px-6 py-3">
        <h1 className="bold self-center text-2xl">ETM</h1>
        <NavigationMenu className="w-4/12 p-4">
          <NavigationMenuList className="">
            <NavigationMenuItem className="">
              {/* <Searchbar setSearch={setSearchValue} /> */}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            onCheckedChange={(value) => {
              if (value) {
                setTheme("dark");
              } else {
                setTheme("light");
              }
            }}
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </header>
    </>
  );
};

export default Navbar;

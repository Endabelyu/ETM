import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

// type navbarProps = {
//   title?: string;
// };
const Sidebar = () => {
  return (
    <NavigationMenu
      className={`min-h-[80vh] w-3/12 items-start rounded-md border-r-2`}
    >
      <NavigationMenuList className="h-full flex-col justify-between gap-8 overflow-auto p-4">
        <NavigationMenuItem>
          <h1 className="bold text-2xl">Home</h1>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Sidebar;

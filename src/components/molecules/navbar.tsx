import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTheme } from "@/components/theme-provider";
import Searchbar from "./searchbar";

// type navbarProps = {
//   setSearchValue?: (search: string) => void;
// };
const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <>
      <header className="sticky top-0 z-40 flex w-full border-b-2 px-6 py-3">
        <h1 className="bold self-center text-2xl">ETM</h1>
        <Searchbar />
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

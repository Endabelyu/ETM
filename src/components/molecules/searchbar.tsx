import { Input } from "../ui/input";

type searchProps = {
  setSearch: (searchValue: string) => void;
};
const Searchbar = ({ setSearch }: searchProps) => {
  return (
    <div className="flex min-w-full items-center gap-2 space-x-2">
      <Input
        id="name"
        name="name"
        placeholder="Search Task"
        className=""
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;

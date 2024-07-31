import { Input } from '../ui/input';
import { Button } from '../ui/button';

type searchProps = {
  setSearch: (searchValue: string) => void;
};
const Searcbar = ({ setSearch }: searchProps) => {
  return (
    <div className='tailwind.config.jsflex tailwind.config.jsmin-w-1/2  tailwind.config.jsmax-w-sm tailwind.config.jsitems-center tailwind.config.jsgap-2 tailwind.config.jsspace-x-2'>
      <Input
        id='name'
        name='name'
        placeholder='Search Task'
        className=''
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type='submit'>Search</Button>
    </div>
  );
};

export default Searcbar;

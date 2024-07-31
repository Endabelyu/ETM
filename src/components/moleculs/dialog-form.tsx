import { payloadForms } from '@/App';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
type DialogProps = {
  buttonDesc: string;
  titleDialog: string;
  titleDescription: string;
  functionSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  functionChange: (name: string, value: string) => void;
  formPayload: payloadForms;
  open?: boolean;
  setOpen: (toggleDialog: boolean) => void;
};
export function DialogForm({
  buttonDesc,
  titleDialog,
  titleDescription,
  functionSubmit,
  functionChange,
  formPayload,
  open,
  setOpen,
}: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant='outline' onClick={() => setOpen(!open)}>
        {buttonDesc}
      </Button>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{titleDialog}</DialogTitle>
          <DialogDescription className=''>{titleDescription}</DialogDescription>
        </DialogHeader>
        <form onSubmit={functionSubmit}>
          <div className='tailwind.config.jsgrid tailwind.config.jsgap-6 tailwind.config.jspy-4 '>
            <div className='tailwind.config.jsgrid tailwind.config.jsgrid-cols-6 tailwind.config.jsitems-center tailwind.config.jsgap-4'>
              <Label htmlFor='name' className='tailwind.config.jscol-span-1'>
                Task
              </Label>
              <Input
                id='name'
                name='name'
                placeholder='Attend Bearmentor bootcamp'
                value={formPayload.name}
                className='tailwind.config.jscol-span-3'
                onChange={(e) => {
                  const name = e.target.name;
                  const value = e.target.value;
                  functionChange(name, value);
                }}
                required
              />
            </div>
            <div className='tailwind.config.jsgrid tailwind.config.jsgrid-cols-6 tailwind.config.jsitems-center tailwind.config.jsgap-4'>
              <Label
                htmlFor='username'
                className='tailwind.config.jscol-span-1'
              >
                Priority
              </Label>
              <Input
                id='priority'
                name='priority'
                placeholder='low'
                value={formPayload.priority}
                onChange={(e) => {
                  const name = e.target.name;
                  const value = e.target.value;
                  functionChange(name, value);
                }}
                required
              />
            </div>
            <div className='tailwind.config.jsgrid tailwind.config.jsgrid-cols-6 tailwind.config.jsitems-center tailwind.config.jsgap-4'>
              <Label
                htmlFor='username'
                className='tailwind.config.jscol-span-1'
              >
                Status
              </Label>
              <Input
                id='status'
                name='status'
                value={formPayload.status}
                placeholder='To do'
                onChange={(e) => {
                  const name = e.target.name;
                  const value = e.target.value;
                  functionChange(name, value);
                }}
                required
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Create Task</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

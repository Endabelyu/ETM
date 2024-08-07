import { payloadForms } from "@/App";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputSelect, optionSelect } from "../atoms/inputSelect";
type DialogProps = {
  buttonDesc: string;
  titleDialog: string;
  titleDescription: string;
  functionSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  functionChange: (value: string, name: string) => void;
  formPayload: payloadForms;
  open?: boolean;
  setOpen: (toggleDialog: boolean) => void;
};
export function DialogForm({
  titleDialog,
  titleDescription,
  functionSubmit,
  functionChange,
  formPayload,
  open,
  setOpen,
}: DialogProps) {
  const statusOption: optionSelect[] = [
    {
      id: "S-1",
      value: "S-1",
      title: "To-do",
    },
    {
      id: "S-2",
      value: "S-2",
      title: "Doing",
    },
    {
      id: "S-3",
      value: "S-3",
      title: "Done",
    },
  ];
  const priotityOption: optionSelect[] = [
    {
      id: "P-1",
      value: "P-1",
      title: "Low",
    },
    {
      id: "P-2",
      value: "P-2",
      title: "Medium",
    },
    {
      id: "P-3",
      value: "P-3",
      title: "High",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titleDialog}</DialogTitle>
          <DialogDescription className="">{titleDescription}</DialogDescription>
        </DialogHeader>
        <form onSubmit={functionSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="name" className="col-span-1">
                Task
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Attend Bearmentor bootcamp"
                value={formPayload.name}
                className="col-span-3"
                onChange={(e) => {
                  functionChange(e.target.value, e.target.name);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="username" className="col-span-1">
                Priority
              </Label>
              {/* <Input
                type="text"
                id="priority"
                name="priority"
                placeholder="low"
                value={formPayload.priority}
                onChange={(e) => {
                  functionChange(e.target.value, e.target.name);
                }}
                required
              /> */}
              <InputSelect
                name="priority"
                value={formPayload.priority}
                placeholder="Select task priority"
                optionList={priotityOption}
                onChange={(value) => {
                  console.log("change prio", value);
                  functionChange(value, "priority");
                }}
                required={true}
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="username" className="col-span-1">
                Status
              </Label>
              {/* <Input
                type="text"
                id="status"
                name="status"
                value={formPayload.status}
                placeholder="To do"
                onChange={(value) => {
                  functionChange(value, "status");
                }}
                required
              /> */}
              <InputSelect
                name="status"
                value={formPayload.status}
                placeholder="Select task status"
                optionList={statusOption}
                onChange={(value) => {
                  console.log("change", value);
                  functionChange(value, "status");
                }}
                required={true}
              />
            </div>

            <DialogFooter>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

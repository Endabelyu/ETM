import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkspaceToggle } from "../organism/baseLayout";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function DialogUsername() {
  const { idWorkspace, isFormOpen, setIsFormOpen, setWorkspaceData } =
    useWorkspaceToggle();
  const { toast } = useToast();
  const [workspace, setWorkspace] = useState("");
  function functionChange(value: string) {
    setWorkspace(value);
  }
  function fnSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Check if the "workspace" key exists in local storage
    event.preventDefault();
    const newId: string = Math.random().toString(36).slice(2, 11).toUpperCase();
    if ("workspace" in localStorage) {
      // Retrieve existing workspace data from local storage
      const localData = localStorage.getItem("workspace");
      const workspaces = JSON.parse(localData!);

      // Check if a workspace with the same ID already exists
      const existingIndex = workspaces.findIndex((item: { id: string }) =>
        console.log(item.id === idWorkspace, "cond"),
      );
      //   console.log(idWorkspace, "id", existingIndex,item.id === idWorkspace, "index");
      if (existingIndex !== -1 && idWorkspace !== "") {
        // Edit existing workspace, updating only the name and href
        workspaces[existingIndex].name = workspace.toLocaleUpperCase();
        workspaces[existingIndex].href = `/workspace?wspace=${workspace}`;
      } else {
        // Add new workspace
        const newData = {
          id: `w-${newId}`, // Keep the ID as is
          name: workspace.toLocaleUpperCase(),
          href: `/workspace?wspace=${newId}`,
        };
        workspaces.push(newData);
      }

      // Save updated workspaces back to local storage
      localStorage.setItem("workspace", JSON.stringify(workspaces));
      setWorkspaceData(workspaces);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 border-0",
        ),
        variant: "success",
        title: existingIndex !== -1 ? "Workspace Updated" : "Workspace Created",
        description:
          existingIndex !== -1
            ? "The workspace has been successfully updated."
            : "A new workspace has been successfully added.",
      });
    } else {
      // If the "workspace" key doesn't exist, create it with the new workspace data
      const newData = [
        {
          id: `w-${newId}`, // New ID
          name: workspace.toLocaleUpperCase(),
          href: `/workspace?wspace=w-${newId}`,
        },
      ];

      // Save the new workspace to local storage
      localStorage.setItem("workspace", JSON.stringify(newData));
      setWorkspaceData(newData);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 border-0",
        ),
        variant: "success",
        title: "Workspace Created",
        description: "A new workspace has been successfully added.",
      });
    }

    setIsFormOpen(false);
    setWorkspace("");
  }

  useEffect(() => {
    if ("workspace" in localStorage) {
      const localData = JSON.parse(localStorage.getItem("workspace")!);
      setWorkspaceData(localData);
    }
  }, []);

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen} modal={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={fnSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid items-center gap-8">
              <Label htmlFor="name" className="">
                Workspace
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Bearmentor"
                value={workspace}
                className="col-span-1"
                onChange={(e) => {
                  functionChange(e.target.value);
                }}
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit">
                {idWorkspace ? "Edit Workspace" : "Create Workspace"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

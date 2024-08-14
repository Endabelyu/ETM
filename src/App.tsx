import { useNavigate } from "react-router-dom";
import "./App.css";
import { Input } from "./components/ui/input";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";
import { useToast } from "./components/ui/use-toast";

function App() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  function functionChange(value: string) {
    setUsername(value);
  }
  function functionSubmit() {
    localStorage.setItem("username", username);
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 border-0",
      ),
      variant: "success",
      title: "Username Created",
      description: "You will directed to homepage",
    });

    setTimeout(() => {
      navigate("/home");
    }, 3000);
  }

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full flex-col justify-center gap-8">
        <h1 className="text-3xl font-bold">
          Welcome to <br /> Endabelyu Task Manager (ETM)
        </h1>
        <span className="self-center">
          <p className="mb-4">Please input your username.</p>
          {/* <form onSubmit={functionSubmit} className="flex gap-6"> */}
          <span className="flex gap-4">
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Endabelyu"
              className="mx-auto"
              onChange={(e) => {
                functionChange(e.target.value);
              }}
              required
            />
            <Button type="button" onClick={functionSubmit}>
              Enter
            </Button>
          </span>
          {/* </form> */}
        </span>
      </div>
    </>
  );
}

export default App;

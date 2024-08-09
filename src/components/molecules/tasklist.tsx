import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/models/task";

const Tasklist = ({ taskData }: { taskData: Task[] }) => {
  return (
    <>
      {taskData.length > 0 ? (
        taskData.map(({ id, name, priority, status }) => (
          <Card key={id}>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{priority}</CardDescription>
              <CardDescription>{status}</CardDescription>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent>
            <CardDescription>Task is empty</CardDescription>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Tasklist;

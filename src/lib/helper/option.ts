export function priorityDescription(priority: string): string {
  switch (priority) {
    case "P-1":
      return "Low";
    case "P-2":
      return "Medium";
    case "P-3":
      return "High";
    default:
      return "None";
  }
}
export function statusDescription(status: string): string {
  switch (status) {
    case "S-1":
      return "To-Do";
    case "S-2":
      return "Doing";
    case "S-3":
      return "Done";
    default:
      return "None";
  }
}

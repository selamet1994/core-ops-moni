import { jsx } from "react/jsx-runtime";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { c as cn } from "./utils-H80jjgLf.js";
const map = {
  pending: "bg-muted text-muted-foreground",
  in_progress: "bg-info/15 text-info border-info/30",
  completed: "bg-success/15 text-success border-success/30",
  overdue: "bg-destructive/15 text-destructive border-destructive/30",
  approved: "bg-success/15 text-success border-success/30",
  rejected: "bg-destructive/15 text-destructive border-destructive/30"
};
function StatusBadge({ status }) {
  return /* @__PURE__ */ jsx(Badge, { variant: "outline", className: cn("capitalize", map[status] ?? ""), children: status.replace(/_/g, " ") });
}
export {
  StatusBadge as S
};

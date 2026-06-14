import { jsxs, jsx } from "react/jsx-runtime";
function PageHeader({
  title,
  description,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-end justify-between gap-3", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight text-foreground", children: title }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children })
  ] });
}
export {
  PageHeader as P
};

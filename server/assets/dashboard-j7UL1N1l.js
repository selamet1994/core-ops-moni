import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-BX8CplE9.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-DQ5v2DYb.js";
import { P as PageHeader } from "./PageHeader-BuLQaOPw.js";
import { Wrench, CheckCircle2, AlertTriangle, ClipboardCheck, Car, Trash2 } from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { Link } from "@tanstack/react-router";
import "@supabase/supabase-js";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
function Dashboard() {
  const {
    data: stats
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [pm, vm, wm] = await Promise.all([supabase.from("preventive_maintenance").select("status,scheduled_date"), supabase.from("vehicle_monitoring").select("status,check_date"), supabase.from("waste_monitoring").select("status,log_date,weight_kg")]);
      return {
        pm: pm.data ?? [],
        vm: vm.data ?? [],
        wm: wm.data ?? []
      };
    }
  });
  const total = (stats?.pm.length ?? 0) + (stats?.vm.length ?? 0) + (stats?.wm.length ?? 0);
  const completed = [...stats?.pm ?? [], ...stats?.vm ?? [], ...stats?.wm ?? []].filter((r) => r.status === "completed" || r.status === "approved").length;
  const overdue = (stats?.pm ?? []).filter((r) => {
    return r.status !== "completed" && r.scheduled_date && new Date(r.scheduled_date) < /* @__PURE__ */ new Date();
  }).length;
  const byDivision = [{
    name: "FMS",
    value: stats?.pm.length ?? 0
  }, {
    name: "GA",
    value: stats?.vm.length ?? 0
  }, {
    name: "K3L",
    value: stats?.wm.length ?? 0
  }];
  const statusData = ["pending", "in_progress", "completed", "overdue", "approved"].map((s) => ({
    name: s,
    count: [...stats?.pm ?? [], ...stats?.vm ?? [], ...stats?.wm ?? []].filter((r) => r.status === s).length
  }));
  const COLORS = ["hsl(var(--primary))", "var(--color-chart-2)", "var(--color-chart-3)"];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Dashboard Operasional", description: "Ringkasan pekerjaan preventive maintenance & monitoring lintas divisi." }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Total Pekerjaan", value: total, icon: Wrench, tone: "primary" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Selesai", value: completed, icon: CheckCircle2, tone: "success" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Overdue PM", value: overdue, icon: AlertTriangle, tone: "destructive" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Checklist Hari Ini", value: (stats?.vm ?? []).filter(isToday("check_date")).length, icon: ClipboardCheck, tone: "info" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Status Pekerjaan" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Distribusi status seluruh modul." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: statusData, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "name", tick: {
            fill: "var(--color-muted-foreground)",
            fontSize: 12
          } }),
          /* @__PURE__ */ jsx(YAxis, { allowDecimals: false, tick: {
            fill: "var(--color-muted-foreground)",
            fontSize: 12
          } }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12
          } }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "count", fill: "var(--color-primary)", radius: [6, 6, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Pekerjaan per Divisi" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "FMS · GA · K3L" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(Pie, { data: byDivision, dataKey: "value", nameKey: "name", innerRadius: 50, outerRadius: 80, paddingAngle: 3, children: byDivision.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i] }, i)) }),
          /* @__PURE__ */ jsx(Legend, { wrapperStyle: {
            fontSize: 12
          } })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsx(ModuleLink, { title: "FMS · Preventive Maintenance", desc: "Penjadwalan pekerjaan preventive aset.", icon: Wrench, to: "/fms/preventive-maintenance" }),
      /* @__PURE__ */ jsx(ModuleLink, { title: "GA · Monitoring Kendaraan", desc: "Checklist kondisi kendaraan operasional.", icon: Car, to: "/ga/vehicle-monitoring" }),
      /* @__PURE__ */ jsx(ModuleLink, { title: "K3L · Monitoring Limbah", desc: "Pencatatan timbulan limbah B3 & non-B3.", icon: Trash2, to: "/k3l/waste-monitoring" })
    ] })
  ] });
}
function isToday(field) {
  return (r) => {
    const v = r?.[field];
    if (!v) return false;
    const d = new Date(v);
    const t = /* @__PURE__ */ new Date();
    return d.toDateString() === t.toDateString();
  };
}
function StatCard({
  label,
  value,
  icon: Icon,
  tone
}) {
  const toneClass = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success",
    destructive: "bg-destructive/15 text-destructive",
    info: "bg-info/15 text-info"
  }[tone];
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-4 p-5", children: [
    /* @__PURE__ */ jsx("div", { className: `flex h-11 w-11 items-center justify-center rounded-lg ${toneClass}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-semibold text-foreground", children: value })
    ] })
  ] }) });
}
function ModuleLink({
  title,
  desc,
  icon: Icon,
  to
}) {
  return /* @__PURE__ */ jsx(Link, { to, children: /* @__PURE__ */ jsx(Card, { className: "h-full transition hover:border-primary hover:shadow-md", children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-start gap-3 p-5", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent/30 text-primary", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "font-medium text-foreground", children: title }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: desc })
    ] })
  ] }) }) });
}
export {
  Dashboard as component
};

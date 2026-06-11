import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { Wrench, ClipboardCheck, AlertTriangle, CheckCircle2, Car, Trash2 } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PM Studio" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [pm, vm, wm] = await Promise.all([
        supabase.from("preventive_maintenance").select("status,scheduled_date"),
        supabase.from("vehicle_monitoring").select("status,check_date"),
        supabase.from("waste_monitoring").select("status,log_date,weight_kg"),
      ]);
      return {
        pm: pm.data ?? [],
        vm: vm.data ?? [],
        wm: wm.data ?? [],
      };
    },
  });

  const total = (stats?.pm.length ?? 0) + (stats?.vm.length ?? 0) + (stats?.wm.length ?? 0);
  const completed = [...(stats?.pm ?? []), ...(stats?.vm ?? []), ...(stats?.wm ?? [])].filter(
    (r) => r.status === "completed" || r.status === "approved",
  ).length;
  const overdue = (stats?.pm ?? []).filter((r) => {
    return r.status !== "completed" && r.scheduled_date && new Date(r.scheduled_date) < new Date();
  }).length;

  const byDivision = [
    { name: "FMS", value: stats?.pm.length ?? 0 },
    { name: "GA", value: stats?.vm.length ?? 0 },
    { name: "K3L", value: stats?.wm.length ?? 0 },
  ];

  const statusData = ["pending", "in_progress", "completed", "overdue", "approved"].map((s) => ({
    name: s,
    count: [...(stats?.pm ?? []), ...(stats?.vm ?? []), ...(stats?.wm ?? [])].filter(
      (r) => r.status === s,
    ).length,
  }));

  const COLORS = ["hsl(var(--primary))", "var(--color-chart-2)", "var(--color-chart-3)"];

  return (
    <>
      <PageHeader
        title="Dashboard Operasional"
        description="Ringkasan pekerjaan preventive maintenance & monitoring lintas divisi."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Pekerjaan" value={total} icon={Wrench} tone="primary" />
        <StatCard label="Selesai" value={completed} icon={CheckCircle2} tone="success" />
        <StatCard label="Overdue PM" value={overdue} icon={AlertTriangle} tone="destructive" />
        <StatCard label="Checklist Hari Ini" value={(stats?.vm ?? []).filter(isToday("check_date")).length} icon={ClipboardCheck} tone="info" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Status Pekerjaan</CardTitle>
            <CardDescription>Distribusi status seluruh modul.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pekerjaan per Divisi</CardTitle>
            <CardDescription>FMS · GA · K3L</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byDivision} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {byDivision.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <ModuleLink title="FMS · Preventive Maintenance" desc="Penjadwalan pekerjaan preventive aset." icon={Wrench} to="/fms/preventive-maintenance" />
        <ModuleLink title="GA · Monitoring Kendaraan" desc="Checklist kondisi kendaraan operasional." icon={Car} to="/ga/vehicle-monitoring" />
        <ModuleLink title="K3L · Monitoring Limbah" desc="Pencatatan timbulan limbah B3 & non-B3." icon={Trash2} to="/k3l/waste-monitoring" />
      </div>
    </>
  );
}

function isToday(field: string) {
  return (r: any) => {
    const v = r?.[field];
    if (!v) return false;
    const d = new Date(v);
    const t = new Date();
    return d.toDateString() === t.toDateString();
  };
}

function StatCard({ label, value, icon: Icon, tone }: { label: string; value: number; icon: any; tone: "primary"|"success"|"destructive"|"info" }) {
  const toneClass = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success",
    destructive: "bg-destructive/15 text-destructive",
    info: "bg-info/15 text-info",
  }[tone];
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="text-2xl font-semibold text-foreground">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Link } from "@tanstack/react-router";
function ModuleLink({ title, desc, icon: Icon, to }: { title: string; desc: string; icon: any; to: string }) {
  return (
    <Link to={to}>
      <Card className="h-full transition hover:border-primary hover:shadow-md">
        <CardContent className="flex items-start gap-3 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/30 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium text-foreground">{title}</div>
            <div className="text-xs text-muted-foreground">{desc}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

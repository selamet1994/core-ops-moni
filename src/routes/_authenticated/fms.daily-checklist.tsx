import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Plus, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/fms/daily-checklist")({
  head: () => ({ meta: [{ title: "Daily Checklist MHKN — FMS" }] }),
  component: DailyChecklistPage,
});

const EQUIPMENTS: { code: string; name: string; params: string[] }[] = [
  { code: "A_GENSET", name: "A. Genset", params: ["Run Time", "Total Energy", "Voltage", "Current", "Fuel Tank", "Switch Status"] },
  { code: "B_PUTM", name: "B. PUTM (Trafo)", params: ["No. Trafo", "Exhaust Fan", "Suhu Trafo", "Frequency", "Cos Phi", "Temp Ruangan", "RH"] },
  { code: "C_PUTR", name: "C. PUTR", params: ["Voltage", "Current", "Frequency", "Indicator"] },
  { code: "D_PLN_METER", name: "D. PLN Meter", params: ["kWh", "kVARh", "Demand"] },
  { code: "E_POMPA_SUMPIT", name: "E. Pompa Sumpit", params: ["Level", "Fungsi Pompa", "Indikator"] },
  { code: "F_FIRE_PUMP", name: "F. Fire Pump", params: ["Pressure", "Diesel/Jockey", "Panel"] },
  { code: "G_CHILLER", name: "G. Chiller", params: ["Suhu Supply", "Suhu Return", "Pressure", "Status"] },
  { code: "H_AHU_OT", name: "H. AHU OT", params: ["Suhu", "RH", "Filter", "Belt"] },
  { code: "I_GWT_PUMP", name: "I. GWT Pump", params: ["Level", "Pompa 1", "Pompa 2"] },
  { code: "J_SISTEM_RO", name: "J. Sistem RO", params: ["TDS Inlet", "TDS Outlet", "Pressure"] },
  { code: "K_HEAT_PUMP", name: "K. Heat Pump", params: ["Suhu Air", "Status", "Pressure"] },
  { code: "L_GAS_MEDIS", name: "L. Gas Medis", params: ["Pressure O2", "Pressure N2O", "Pressure Vacuum"] },
  { code: "M_UPS", name: "M. UPS", params: ["Voltage In", "Voltage Out", "Battery", "Load %"] },
  { code: "N_ROOFTANK", name: "N. Rooftank", params: ["Level", "Pompa", "Indikator"] },
  { code: "O_IPAL", name: "O. IPAL", params: ["pH", "Flow", "Pompa", "Aerator"] },
  { code: "P_GAS_LPG", name: "P. Gas LPG", params: ["Pressure", "Tabung Aktif", "Cadangan"] },
  { code: "Q_AEROCOM", name: "Q. Aerocom", params: ["Pressure", "Status Station"] },
  { code: "R_UPS_IT", name: "P. UPS IT", params: ["Voltage In", "Voltage Out", "Battery", "Load %"] },
];

function DailyChecklistPage() {
  const [eq, setEq] = useState(EQUIPMENTS[0].code);
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);

  const config = EQUIPMENTS.find((e) => e.code === eq)!;

  const { data = [], isLoading } = useQuery({
    queryKey: ["dc", eq],
    queryFn: async () => {
      const { data, error } = await supabase.from("daily_checklists").select("*").eq("equipment_code", eq).order("checked_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const createMut = useMutation({
    mutationFn: async (form: any) => {
      const { error } = await supabase.from("daily_checklists").insert({
        ...form, equipment_code: eq, equipment_name: config.name, created_by: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Checklist tersimpan"); qc.invalidateQueries({ queryKey: ["dc", eq] }); setOpen(false); },
    onError: (e: any) => toast.error(e.message),
  });
  const delMut = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("daily_checklists").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dc", eq] }),
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader title="Daily Checklist MHKN" description="Checklist harian peralatan utilitas gedung.">
        <Select value={eq} onValueChange={setEq}>
          <SelectTrigger className="w-72"><SelectValue /></SelectTrigger>
          <SelectContent>
            {EQUIPMENTS.map((e) => <SelectItem key={e.code} value={e.code}>{e.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Tambah Checklist</Button></DialogTrigger>
          <ChecklistDialog config={config} onSubmit={(f) => createMut.mutate(f)} pending={createMut.isPending} />
        </Dialog>
      </PageHeader>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead><TableHead>Shift</TableHead>
                <TableHead>PIC</TableHead><TableHead>Parameter</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={6} className="py-10 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></TableCell></TableRow>}
              {!isLoading && data.length === 0 && <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">Belum ada data.</TableCell></TableRow>}
              {data.map((r: any) => (
                <TableRow key={r.id}>
                  <TableCell className="text-xs">{new Date(r.checked_at).toLocaleString("id-ID")}</TableCell>
                  <TableCell>{r.shift ?? "—"}</TableCell>
                  <TableCell>{r.pic ?? "—"}</TableCell>
                  <TableCell className="max-w-md">
                    <div className="flex flex-wrap gap-1 text-xs">
                      {Object.entries(r.data ?? {}).slice(0, 4).map(([k, v]) => (
                        <span key={k} className="rounded bg-muted px-1.5 py-0.5"><b>{k}</b>: {String(v)}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{r.remarks ?? "—"}</TableCell>
                  <TableCell className="text-right">
                    {isAdmin && <Button variant="ghost" size="icon" onClick={() => { if (confirm("Hapus?")) delMut.mutate(r.id); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

function ChecklistDialog({ config, onSubmit, pending }: { config: { name: string; params: string[] }; onSubmit: (f: any) => void; pending: boolean }) {
  const [form, setForm] = useState<any>({ checked_at: new Date().toISOString().slice(0, 16), shift: "Shift 1", pic: "", remarks: "" });
  const [data, setData] = useState<Record<string, string>>({});
  return (
    <DialogContent className="max-w-xl">
      <DialogHeader><DialogTitle>Checklist — {config.name}</DialogTitle><DialogDescription>Catat pembacaan harian.</DialogDescription></DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...form, checked_at: new Date(form.checked_at).toISOString(), data }); }} className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1"><Label>Waktu</Label><Input type="datetime-local" required value={form.checked_at} onChange={(e) => setForm({ ...form, checked_at: e.target.value })} /></div>
          <div className="space-y-1">
            <Label>Shift</Label>
            <Select value={form.shift} onValueChange={(v) => setForm({ ...form, shift: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Shift 1", "Shift 2", "Shift 3"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1"><Label>PIC</Label><Input value={form.pic} onChange={(e) => setForm({ ...form, pic: e.target.value })} /></div>
        </div>
        <div className="rounded border p-3">
          <div className="mb-2 text-sm font-medium">Parameter</div>
          <div className="grid grid-cols-2 gap-3">
            {config.params.map((p) => (
              <div key={p} className="space-y-1">
                <Label className="text-xs">{p}</Label>
                <Input value={data[p] ?? ""} onChange={(e) => setData({ ...data, [p]: e.target.value })} />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-1"><Label>Remarks</Label><Textarea value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} /></div>
        <DialogFooter><Button type="submit" disabled={pending}>{pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Simpan</Button></DialogFooter>
      </form>
    </DialogContent>
  );
}

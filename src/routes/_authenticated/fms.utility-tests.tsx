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

export const Route = createFileRoute("/_authenticated/fms/utility-tests")({
  head: () => ({ meta: [{ title: "Uji Fungsi Sistem Utilitas — FMS" }] }),
  component: UtilityTestsPage,
});

const TEST_TYPES: Record<string, { label: string; fields: { key: string; label: string }[] }> = {
  genset: { label: "Genset", fields: [
    { key: "no_unit", label: "No Unit" }, { key: "type_pengujian", label: "Type Pengujian" },
    { key: "kebisingan", label: "Kebisingan (dB)" }, { key: "solar_level", label: "Solar Level" },
    { key: "frequency", label: "Frequency" }, { key: "voltage", label: "Voltage" }, { key: "engine_stop", label: "Engine Stop" },
  ]},
  ups: { label: "UPS", fields: [
    { key: "area_unit", label: "Area Unit" }, { key: "type_pengujian", label: "Type Pengujian" },
    { key: "frequency", label: "Frequency" }, { key: "voltage_in", label: "Voltage In" },
    { key: "voltage_out", label: "Voltage Out" }, { key: "voltage_batteray", label: "Voltage Battery" },
    { key: "load_pct", label: "Load (%)" }, { key: "temp", label: "Temp" },
  ]},
  gas_medis: { label: "Sistem Gas Medis", fields: [
    { key: "pressure_gauge", label: "Pressure Gauge" }, { key: "regulator", label: "Regulator" },
    { key: "valve", label: "Valve" }, { key: "safety_valve", label: "Safety Valve" },
    { key: "motor_pump", label: "Motor Pump" }, { key: "tangki", label: "Tangki Penyimpanan" }, { key: "pipa", label: "Pipa Instalasi" },
  ]},
  fire_alarm: { label: "Sistem Fire Alarm", fields: [
    { key: "zona", label: "Zona" }, { key: "smoke_heat", label: "Smoke/Heat Detector" },
    { key: "tombol_fire", label: "Tombol Fire" }, { key: "lampu_tanda", label: "Lampu Tanda" },
    { key: "display_mcfa", label: "Display MCFA" }, { key: "audio", label: "Suara Audio" },
  ]},
  pompa_pemadam: { label: "Pompa Pemadam", fields: [
    { key: "pompa", label: "Fungsi Pompa" }, { key: "pressure_gauge", label: "Pressure Gauge" },
    { key: "valve", label: "Valve" }, { key: "panel_kontrol", label: "Panel Kontrol" },
  ]},
  fire_shutter: { label: "Fire Shutter", fields: [
    { key: "rolling", label: "Kondisi Rolling" }, { key: "tombol_control", label: "Tombol Control" },
    { key: "dinamo", label: "Dinamo" }, { key: "koneksi_fa", label: "Koneksi Fire Alarm" },
  ]},
  air_bersih: { label: "Sistem Air Bersih", fields: [
    { key: "level_storage", label: "Level Storage Tank" }, { key: "booster_pump", label: "Booster Pump" },
    { key: "otomatis", label: "Otomatis Pump" }, { key: "pressure_gauge", label: "Pressure Gauge" },
    { key: "valve", label: "Valve-valve" }, { key: "filter", label: "Filter" },
  ]},
  detector_fire_alarm: { label: "Detector Fire Alarm", fields: [
    { key: "jenis", label: "Jenis Detector" }, { key: "indikator_led", label: "Indikator LED" },
    { key: "tes_fungsi", label: "Tes Fungsi" }, { key: "baterai", label: "Status Baterai" },
  ]},
};

function UtilityTestsPage() {
  const [type, setType] = useState("genset");
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ["ut", type],
    queryFn: async () => {
      const { data, error } = await supabase.from("utility_tests").select("*").eq("test_type", type).order("test_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const createMut = useMutation({
    mutationFn: async (form: any) => {
      const { error } = await supabase.from("utility_tests").insert({ ...form, test_type: type, created_by: user!.id });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Pengujian tersimpan"); qc.invalidateQueries({ queryKey: ["ut", type] }); setOpen(false); },
    onError: (e: any) => toast.error(e.message),
  });
  const delMut = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("utility_tests").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ut", type] }),
    onError: (e: any) => toast.error(e.message),
  });

  const cfg = TEST_TYPES[type];

  return (
    <>
      <PageHeader title="Uji Fungsi Sistem Utilitas" description="Pencatatan hasil pengujian sistem utilitas.">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-64"><SelectValue /></SelectTrigger>
          <SelectContent>
            {Object.entries(TEST_TYPES).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Tambah Pengujian</Button></DialogTrigger>
          <TestDialog cfg={cfg} onSubmit={(f) => createMut.mutate(f)} pending={createMut.isPending} />
        </Dialog>
      </PageHeader>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead><TableHead>Teknisi</TableHead>
                <TableHead>Lokasi</TableHead><TableHead>Asset</TableHead>
                <TableHead>Data</TableHead><TableHead>Catatan</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={7} className="py-10 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></TableCell></TableRow>}
              {!isLoading && data.length === 0 && <TableRow><TableCell colSpan={7} className="py-10 text-center text-muted-foreground">Belum ada data.</TableCell></TableRow>}
              {data.map((r: any) => (
                <TableRow key={r.id}>
                  <TableCell>{r.test_date}</TableCell>
                  <TableCell>{r.technician ?? "—"}</TableCell>
                  <TableCell>{r.location ?? "—"}</TableCell>
                  <TableCell>{r.asset_name ?? "—"}</TableCell>
                  <TableCell className="max-w-md">
                    <div className="flex flex-wrap gap-1 text-xs">
                      {Object.entries(r.data ?? {}).slice(0, 4).map(([k, v]) => (
                        <span key={k} className="rounded bg-muted px-1.5 py-0.5"><b>{k}</b>: {String(v)}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{r.notes ?? "—"}</TableCell>
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

function TestDialog({ cfg, onSubmit, pending }: { cfg: { label: string; fields: { key: string; label: string }[] }; onSubmit: (f: any) => void; pending: boolean }) {
  const [form, setForm] = useState<any>({ test_date: new Date().toISOString().slice(0, 10), technician: "", location: "", asset_name: "", notes: "" });
  const [data, setData] = useState<Record<string, string>>({});
  return (
    <DialogContent className="max-w-xl">
      <DialogHeader><DialogTitle>Pengujian {cfg.label}</DialogTitle><DialogDescription>Isi parameter hasil pengujian.</DialogDescription></DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...form, data }); }} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><Label>Tanggal</Label><Input type="date" required value={form.test_date} onChange={(e) => setForm({ ...form, test_date: e.target.value })} /></div>
          <div className="space-y-1"><Label>Teknisi</Label><Input value={form.technician} onChange={(e) => setForm({ ...form, technician: e.target.value })} /></div>
          <div className="space-y-1"><Label>Lokasi</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
          <div className="space-y-1"><Label>Nama Alat</Label><Input value={form.asset_name} onChange={(e) => setForm({ ...form, asset_name: e.target.value })} /></div>
        </div>
        <div className="rounded border p-3">
          <div className="mb-2 text-sm font-medium">Parameter</div>
          <div className="grid grid-cols-2 gap-3">
            {cfg.fields.map((f) => (
              <div key={f.key} className="space-y-1">
                <Label className="text-xs">{f.label}</Label>
                <Input value={data[f.key] ?? ""} onChange={(e) => setData({ ...data, [f.key]: e.target.value })} />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-1"><Label>Catatan</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
        <DialogFooter><Button type="submit" disabled={pending}>{pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Simpan</Button></DialogFooter>
      </form>
    </DialogContent>
  );
}

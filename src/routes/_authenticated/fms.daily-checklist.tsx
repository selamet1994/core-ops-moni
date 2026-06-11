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
  { code: "A_GENSET", name: "A. Genset", params: [
    "Engine Runing Time G1","Run Absolute G1","Total Energy G1 (MWH)",
    "Engine Runing Time G2","Run Absolute G2","Total Energy G2 (MWH)",
    "PKG 1 Accu Charge Voltage (Normal 25-28 Vp)","Accu Module Back Up Voltage PKG 1 (Normal 25-28 Vp)",
    "Status Switch Outgoing & Incoming PKG 1 (Default Auto)",
    "PKG 2 Accu Charge Voltage (Normal 25-28 Vp)","Accu Module Back Up Voltage PKG 2 (Normal 25-28 Vp)",
    "Status Switch Outgoing & Incoming PKG 2 (Default Auto)",
    "Volume Tangki BBM Solar Genset (Liter)",
  ]},
  { code: "B_PUTM", name: "B. PUTM (Trafo)", params: [
    "No. Trafo","Kondisi Exhaust Fan Trafo","Suhu Trafo (<80 °C)",
    "Power Summary (P Tot)","Power Summary (Q Tot)","Power Summary (S Tot)",
    "Switch Out Going PLN (ON/TRIP)",
    "Tegangan Phase R-N (V1)","Tegangan Phase S-N (V2)","Tegangan Phase T-N (V3)",
    "Tegangan Phase R-L (U1)","Tegangan Phase S-L (U2)","Tegangan Phase T-L (U3)",
    "Beban Phase R (Ampere)","Beban Phase S (Ampere)","Beban Phase T (Ampere)",
    "Frequensi (Normal 50 Hz)","Cos Phi (Normal 0.8-1)",
    "Kondisi Exaust Fan (Ruangan)","Temperatur Ruangan (21-30 ºC)","RH Ruangan (40-60 %)",
  ]},
  { code: "C_PUTR", name: "C. PUTR", params: [
    "Power Summary Putr 1 (P Tot)","Power Summary Putr 1 (Q Tot)","Power Summary Putr 1 (S Tot)",
    "R THDI % U Putr 1","S THDI % U Putr 1","T THDI % U Putr 1",
    "R THDI % V Putr 1","S THDI % V Putr 1","T THDI % V Putr 1",
    "Frequensi Putr 1 (Hz)","Cos Phi (PF) Putr 1",
    "Beban Phase R Putr 1 (Ampere)","Beban Phase S Putr 1 (Ampere)","Beban Phase T Putr 1 (Ampere)",
    "Power Summary Putr 2 (P Tot)","Power Summary Putr 2 (Q Tot)","Power Summary Putr 2 (S Tot)",
    "Tegangan Phase R-N Putr 2","Tegangan Phase S-N Putr 2","Tegangan Phase T-N LVMDP 2",
    "Beban Phase R Putr 2 (Ampere)","Beban Phase S Putr 2 (Ampere)","Beban Phase T Putr 2 (Ampere)",
    "R THDI % U Putr 2","S THDI % U Putr 2","T THDI % U Putr 2",
    "R THDI % V Putr 2","S THDI % V Putr 2","T THDI % V Putr 2",
    "Frequensi Putr 2 (Hz)","Cos Phi Putr 2",
    "Temperatur Ruangan (ºC)","RH Ruangan (%)","Kondisi Exaust Fan",
  ]},
  { code: "D_PLN_METER", name: "D. PLN Meter", params: [
    "Power Factor / Cos Phi (Kvar)",
    "Stand kWh WBP (kWh)","Selisih kWh WBP",
    "Stand kWh LWBP (kWh)","Selisih kWh LWBP",
    "Stand Total kWh","Selisih Total kWh","Total Biaya Listrik",
    "Stand kWh Kvarh","Selisih kWh Kvarh",
  ]},
  { code: "E_POMPA_SUMPIT", name: "E. Pompa Sumpit", params: [
    "Sumpit Pump Grease Trap 1 (On/Off)","Sumpit Pump Grease Trap 2 (On/Off)",
    "Sumpit Pump Security 1 (On/Off)","Sumpit Pump Security 2 (On/Off)",
    "Sumpit Pump Lobby Lift 1 (On/Off)","Sumpit Pump Lobby Lift 2 (On/Off)",
    "Sumpit Pump Mourtuary 1 (On/Off)","Sumpit Pump Mourtuary 2 (On/Off)",
    "Sumpit Pump Mushola 1 (On/Off)","Sumpit Pump Mushola 2 (On/Off)",
    "Sumpit Pump CSSD 1 (On/Off)","Sumpit Pump CSSD 2 (On/Off)",
    "Sumpit Pump GWT 1 (On/Off)","Sumpit Pump GWT 2 (On/Off)",
    "Kondisi Keseluruhan","Catatan",
  ]},
  { code: "F_FIRE_PUMP", name: "F. Fire Pump", params: [
    "Engineering PIC",
    "Switch Jockey Pump","Pressure Jockey Pump (Bar)",
    "Switch Elektrik Pump","Pressure Elektrik Pump (Bar)",
    "Switch Diesel Pump","Pressure Diesel Pump (Bar)",
    "Diesel Pump Battery (>12 Volt)","Diesel Pump Water Level","Diesel Pump Oil Level",
    "Level Solar","Level Air RWT (Pemadam)",
  ]},
  { code: "G_CHILLER", name: "G. Chiller", params: [
    "Engineering PIC","Incoming Chiller (kWh)",
    "Status Chiller 1","Status Chiller 2","Status Chiller 3","Status Chiller 4",
    "Temp. On 1 CHSW (ºC)","Temp. On 1 CHWR (ºC)",
    "Temp. On 2 CHSW (ºC)","Temp. On 2 CHWR (ºC)",
    "Operating Hours","Number of Starts","Oil Level",
  ]},
  { code: "H_AHU_OT", name: "H. AHU OT", params: [
    "AHU OT No. (1-4)","Mode","ACH","Temperature (ºC)","Set Temp (ºC)","Humidity (%)","Pressure (Pa)",
  ]},
  { code: "I_GWT_PUMP", name: "I. GWT Pump", params: [
    "Metering Utama PDAM","GWT Transfer Pump 1","GWT Transfer Pump 2","Level Clean Water Tank (Suction Pit)",
  ]},
  { code: "J_SISTEM_RO", name: "J. Sistem RO", params: [
    "Engineering PIC",
    "Tekanan Media Softener (Psi)","Tekanan Media Carbon 1 (Psi)",
    "Tekanan Sebelum Filter Cartridge (Psi)","Tekanan Sesudah Filter Cartridge (Psi)",
    "System Pressure (Psi)","Permeate / Produk Flow (ppm)",
    "Setting Autotrol (ok/tidak)","Alarm (on/off)",
    "Metering Input RO","Metering Output RO","Volume Storage Tank (%)",
  ]},
  { code: "K_HEAT_PUMP", name: "K. Heat Pump", params: [
    "Engineering PIC",
    "Heat Pump 1 (On/Off)","Temperature Heat Pump 1 (ºC)",
    "Heat Pump 2 (On/Off)","Temperature Heat Pump 2 (ºC)",
    "Distribution Pump 1 (On/Off)","Pressure Distribution Pump 1 (Kg/cm2)",
    "Distribution Pump 2 (On/Off)","Pressure Distribution Pump 2 (Kg/cm2)",
    "Return Pump 1","Temperature Return Pump 1 (ºC)","Pressure Return Pump 1 (Bar)",
    "Sirkulation Pump 1","Heater Tank 1",
    "Return Pump 2","Temperature Return Pump 2 (ºC)","Pressure Return Pump 2 (Bar)",
    "Sirkulation Pump 2","Heater Tank 2",
  ]},
  { code: "L_GAS_MEDIS", name: "L. Gas Medis", params: [
    "Volume Oksigen Samator Telemetry","Tekanan Tangki Samator (bar)",
    "Tekanan Oksigen (bar)","Tekanan Medical Air (bar)","Tekanan Instrumen Air (bar)",
    "Tekanan Vacum Medik (bar)","Tekanan Supply CO2 (bar)","Tekanan N2O (bar)",
    "Temperatur Ruangan (ºC)","RH Ruangan (%)","Kondisi Exaust Fan",
  ]},
  { code: "M_UPS", name: "M. UPS", params: [
    "UPS Lt. 1 OT - L1 (V)","UPS Lt. 1 OT - L2 (V)","UPS Lt. 1 OT - L3 (V)",
    "UPS Lt. 1 MCCB 1 (Kw)","UPS Lt. 1 Frequency (Hz)",
    "UPS Lt. 1 (Normal/Alarm)","UPS Lt. 1 Battery (Ok/Not Ok)",
    "UPS Lt. 6 Radiologi L1 (V)","UPS Lt. 6 Radiologi L2 (V)","UPS Lt. 6 Radiologi L3 (V)",
    "UPS Lt. 6 Radiologi MCCB 1 (Kw)","UPS Lt. 6 Radiologi Frequency (Hz)",
    "UPS Lt. 6 Radiologi (Normal/Alarm)","UPS Lt. 6 Battery (Ok/Not Ok)",
    "Kondisi AC","Temperatur Ruangan (ºC)","RH Ruangan (%)",
  ]},
  { code: "N_ROOFTANK", name: "N. Rooftank", params: [
    "Booster Pump 1 (On/Off)","Booster Pump 2 (On/Off)",
    "Metering Roof Water Tank","Level Volume Tank (%)",
  ]},
  { code: "O_IPAL", name: "O. IPAL", params: [
    "Pompa Regenerasi","Pompa Sludge","Netralisir A","Netralisir B",
    "Mix Netralisir (On/Off)","Kondisi Grease Trap",
  ]},
  { code: "P_GAS_LPG", name: "P. Gas LPG", params: [
    "Tekanan Tabung LPG Retail (Kg/Cm2)","Kondisi Leak Detector Gas Retail","Kondisi Solenoid Gas Retail",
    "Tekanan Tabung LPG Kitchen (Kg/Cm2)","Kondisi Leak Detector Gas Kitchen","Kondisi Solenoid Gas Kitchen",
    "Kondisi Exaust Fan",
  ]},
  { code: "Q_AEROCOM", name: "Q. Aerocom", params: [
    "Kondisi Blower 1","Thermovisi Blower 1",
  ]},
  { code: "R_UPS_IT", name: "P. UPS IT", params: [
    "UPS Lt. 9 OT - L1 (V)","UPS Lt. 9 OT - L2 (V)","UPS Lt. 9 OT - L3 (V)",
    "UPS Lt. 9 MCCB 1 (Kw)","UPS Lt. 9 Frequency (Hz)",
    "UPS Lt. 9 (Normal/Alarm)","UPS Lt. 9 Battery (Ok/Not Ok)",
    "Kondisi AC","Temperatur Ruangan (ºC)","RH Ruangan (%)",
  ]},
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

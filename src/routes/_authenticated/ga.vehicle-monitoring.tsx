import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Plus, Search, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ga/vehicle-monitoring")({
  head: () => ({ meta: [{ title: "Monitoring Kendaraan — GA" }] }),
  component: VMPage,
});

function VMPage() {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["vm"],
    queryFn: async () => {
      const { data, error } = await supabase.from("vehicle_monitoring").select("*").order("check_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(
    () => data.filter((r) => [r.vehicle_plate, r.driver_name].some((v) => (v ?? "").toLowerCase().includes(search.toLowerCase()))),
    [data, search],
  );

  const createMut = useMutation({
    mutationFn: async (form: any) => {
      const { error } = await supabase.from("vehicle_monitoring").insert({ ...form, created_by: user!.id });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Checklist disimpan"); qc.invalidateQueries({ queryKey: ["vm"] }); setOpen(false); },
    onError: (e: any) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("vehicle_monitoring").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast.success("Data dihapus"); qc.invalidateQueries({ queryKey: ["vm"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader title="Monitoring Kendaraan" description="Checklist harian kondisi & operasional kendaraan.">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Cari plat / driver…" className="w-64 pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Checklist Baru</Button></DialogTrigger>
          <CreateVMDialog onSubmit={(f) => createMut.mutate(f)} pending={createMut.isPending} />
        </Dialog>
      </PageHeader>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Plat</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>BBM (%)</TableHead>
                <TableHead>KM</TableHead>
                <TableHead>Kondisi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={8} className="py-10 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></TableCell></TableRow>}
              {!isLoading && filtered.length === 0 && <TableRow><TableCell colSpan={8} className="py-10 text-center text-muted-foreground">Belum ada data.</TableCell></TableRow>}
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.check_date}</TableCell>
                  <TableCell className="font-mono">{r.vehicle_plate}</TableCell>
                  <TableCell>{r.driver_name ?? "—"}</TableCell>
                  <TableCell>{r.fuel_level ?? "—"}</TableCell>
                  <TableCell>{r.mileage ?? "—"}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{r.condition ?? "—"}</TableCell>
                  <TableCell><StatusBadge status={r.status} /></TableCell>
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

function CreateVMDialog({ onSubmit, pending }: { onSubmit: (f: any) => void; pending: boolean }) {
  const [form, setForm] = useState({
    vehicle_plate: "", driver_name: "",
    check_date: new Date().toISOString().slice(0,10),
    fuel_level: 100, mileage: 0, condition: "", notes: "", status: "completed",
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Checklist Kendaraan</DialogTitle>
        <DialogDescription>Catat kondisi kendaraan harian.</DialogDescription>
      </DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><Label>Plat Nomor</Label><Input required value={form.vehicle_plate} onChange={(e) => setForm({...form, vehicle_plate: e.target.value.toUpperCase()})} /></div>
          <div className="space-y-1"><Label>Driver</Label><Input value={form.driver_name} onChange={(e) => setForm({...form, driver_name: e.target.value})} /></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1"><Label>Tanggal</Label><Input type="date" required value={form.check_date} onChange={(e) => setForm({...form, check_date: e.target.value})} /></div>
          <div className="space-y-1"><Label>BBM (%)</Label><Input type="number" min={0} max={100} value={form.fuel_level} onChange={(e) => setForm({...form, fuel_level: Number(e.target.value)})} /></div>
          <div className="space-y-1"><Label>KM</Label><Input type="number" min={0} value={form.mileage} onChange={(e) => setForm({...form, mileage: Number(e.target.value)})} /></div>
        </div>
        <div className="space-y-1"><Label>Kondisi</Label><Textarea value={form.condition} onChange={(e) => setForm({...form, condition: e.target.value})} placeholder="Mesin, ban, kebersihan…" /></div>
        <DialogFooter><Button type="submit" disabled={pending}>{pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Simpan</Button></DialogFooter>
      </form>
    </DialogContent>
  );
}

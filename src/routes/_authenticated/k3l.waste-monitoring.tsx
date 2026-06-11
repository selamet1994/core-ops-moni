import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Plus, Search, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/k3l/waste-monitoring")({
  head: () => ({ meta: [{ title: "Monitoring Limbah — K3L" }] }),
  component: WMPage,
});

function WMPage() {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["wm"],
    queryFn: async () => {
      const { data, error } = await supabase.from("waste_monitoring").select("*").order("log_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(
    () => data.filter((r) => [r.waste_type, r.source_location, r.category].some((v) => (v ?? "").toLowerCase().includes(search.toLowerCase()))),
    [data, search],
  );

  const createMut = useMutation({
    mutationFn: async (form: any) => {
      const { error } = await supabase.from("waste_monitoring").insert({ ...form, created_by: user!.id });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Log tersimpan"); qc.invalidateQueries({ queryKey: ["wm"] }); setOpen(false); },
    onError: (e: any) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("waste_monitoring").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast.success("Data dihapus"); qc.invalidateQueries({ queryKey: ["wm"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const totalKg = filtered.reduce((s, r) => s + Number(r.weight_kg ?? 0), 0);

  return (
    <>
      <PageHeader title="Monitoring Limbah" description="Pencatatan timbulan limbah B3 & non-B3 harian.">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Cari jenis / lokasi…" className="w-64 pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Catat Limbah</Button></DialogTrigger>
          <CreateWMDialog onSubmit={(f) => createMut.mutate(f)} pending={createMut.isPending} />
        </Dialog>
      </PageHeader>

      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        <Card><CardContent className="p-5"><div className="text-xs uppercase text-muted-foreground">Total entri</div><div className="text-2xl font-semibold">{filtered.length}</div></CardContent></Card>
        <Card><CardContent className="p-5"><div className="text-xs uppercase text-muted-foreground">Total bobot</div><div className="text-2xl font-semibold">{totalKg.toFixed(2)} kg</div></CardContent></Card>
        <Card><CardContent className="p-5"><div className="text-xs uppercase text-muted-foreground">Kategori B3</div><div className="text-2xl font-semibold">{filtered.filter(r => r.category === "b3").length}</div></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Berat (kg)</TableHead>
                <TableHead>Sumber</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={8} className="py-10 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></TableCell></TableRow>}
              {!isLoading && filtered.length === 0 && <TableRow><TableCell colSpan={8} className="py-10 text-center text-muted-foreground">Belum ada data.</TableCell></TableRow>}
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.log_date}</TableCell>
                  <TableCell className="font-medium">{r.waste_type}</TableCell>
                  <TableCell className="uppercase text-xs">{r.category}</TableCell>
                  <TableCell>{Number(r.weight_kg).toFixed(2)}</TableCell>
                  <TableCell>{r.source_location ?? "—"}</TableCell>
                  <TableCell>{r.disposal_method ?? "—"}</TableCell>
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

function CreateWMDialog({ onSubmit, pending }: { onSubmit: (f: any) => void; pending: boolean }) {
  const [form, setForm] = useState({
    waste_type: "", category: "non_b3", weight_kg: 0,
    source_location: "", disposal_method: "",
    log_date: new Date().toISOString().slice(0,10),
    notes: "", status: "pending",
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Catat Limbah</DialogTitle>
        <DialogDescription>Input timbulan limbah B3 / non-B3.</DialogDescription>
      </DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-3">
        <div className="space-y-1"><Label>Jenis Limbah</Label><Input required value={form.waste_type} onChange={(e) => setForm({...form, waste_type: e.target.value})} placeholder="Oli bekas, kertas, organik…" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label>Kategori</Label>
            <Select value={form.category} onValueChange={(v) => setForm({...form, category: v})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="non_b3">Non-B3</SelectItem>
                <SelectItem value="b3">B3</SelectItem>
                <SelectItem value="organik">Organik</SelectItem>
                <SelectItem value="anorganik">Anorganik</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1"><Label>Berat (kg)</Label><Input type="number" step="0.01" min={0} required value={form.weight_kg} onChange={(e) => setForm({...form, weight_kg: Number(e.target.value)})} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><Label>Tanggal</Label><Input type="date" required value={form.log_date} onChange={(e) => setForm({...form, log_date: e.target.value})} /></div>
          <div className="space-y-1"><Label>Sumber Lokasi</Label><Input value={form.source_location} onChange={(e) => setForm({...form, source_location: e.target.value})} /></div>
        </div>
        <div className="space-y-1"><Label>Metode Pembuangan</Label><Input value={form.disposal_method} onChange={(e) => setForm({...form, disposal_method: e.target.value})} placeholder="Pihak ke-3, insinerasi, dll" /></div>
        <div className="space-y-1"><Label>Catatan</Label><Textarea value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} /></div>
        <DialogFooter><Button type="submit" disabled={pending}>{pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Simpan</Button></DialogFooter>
      </form>
    </DialogContent>
  );
}

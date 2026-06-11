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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Plus, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/fms/equipment-history")({
  head: () => ({ meta: [{ title: "Data History Peralatan — FMS" }] }),
  component: () => (
    <>
      <PageHeader title="Data History Peralatan" description="DAHIS MEP, MVAC, dan Interior." />
      <Tabs defaultValue="mep">
        <TabsList>
          <TabsTrigger value="mep">DAHIS MEP</TabsTrigger>
          <TabsTrigger value="mvac">DAHIS MVAC</TabsTrigger>
          <TabsTrigger value="interior">DAHIS Interior</TabsTrigger>
        </TabsList>
        <TabsContent value="mep"><CategoryTab category="mep" /></TabsContent>
        <TabsContent value="mvac"><CategoryTab category="mvac" /></TabsContent>
        <TabsContent value="interior"><CategoryTab category="interior" /></TabsContent>
      </Tabs>
    </>
  ),
});

function CategoryTab({ category }: { category: "mep" | "mvac" | "interior" }) {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const { data = [], isLoading } = useQuery({
    queryKey: ["eh", category],
    queryFn: async () => {
      const { data, error } = await supabase.from("equipment_history").select("*").eq("category", category).order("work_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const createMut = useMutation({
    mutationFn: async (form: any) => {
      const { error } = await supabase.from("equipment_history").insert({ ...form, category, created_by: user!.id });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Tersimpan"); qc.invalidateQueries({ queryKey: ["eh", category] }); setOpen(false); },
    onError: (e: any) => toast.error(e.message),
  });
  const delMut = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("equipment_history").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["eh", category] }),
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <Card className="mt-4">
      <div className="flex items-center justify-end p-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Tambah Riwayat</Button></DialogTrigger>
          <EHDialog category={category} onSubmit={(f) => createMut.mutate(f)} pending={createMut.isPending} />
        </Dialog>
      </div>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead><TableHead>Nama Alat</TableHead><TableHead>Kode</TableHead>
              <TableHead>Lokasi</TableHead><TableHead>Merk/Type</TableHead>
              <TableHead>Deskripsi</TableHead><TableHead>Status</TableHead><TableHead>PIC</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={9} className="py-10 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></TableCell></TableRow>}
            {!isLoading && data.length === 0 && <TableRow><TableCell colSpan={9} className="py-10 text-center text-muted-foreground">Belum ada data.</TableCell></TableRow>}
            {data.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell>{r.work_date}</TableCell>
                <TableCell className="font-medium">{r.asset_name}</TableCell>
                <TableCell className="font-mono text-xs">{r.asset_code ?? "—"}</TableCell>
                <TableCell>{r.location ?? "—"}</TableCell>
                <TableCell>{r.brand_type ?? "—"}</TableCell>
                <TableCell className="max-w-xs truncate">{r.description ?? "—"}</TableCell>
                <TableCell>{r.status ?? "—"}</TableCell>
                <TableCell>{r.pic ?? "—"}</TableCell>
                <TableCell className="text-right">
                  {isAdmin && <Button variant="ghost" size="icon" onClick={() => { if (confirm("Hapus?")) delMut.mutate(r.id); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function EHDialog({ category, onSubmit, pending }: { category: string; onSubmit: (f: any) => void; pending: boolean }) {
  const [form, setForm] = useState<any>({
    work_date: new Date().toISOString().slice(0, 10),
    asset_name: "", asset_code: "", location: "", brand_type: "", serial_number: "",
    capacity: "", year_acquired: null, description: "", status: "active", pic: "",
  });
  return (
    <DialogContent className="max-w-xl">
      <DialogHeader><DialogTitle>Tambah Riwayat ({category.toUpperCase()})</DialogTitle><DialogDescription>Data history peralatan / pekerjaan.</DialogDescription></DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><Label>Tanggal</Label><Input type="date" required value={form.work_date} onChange={(e) => setForm({ ...form, work_date: e.target.value })} /></div>
          <div className="space-y-1"><Label>Kode Alat</Label><Input value={form.asset_code} onChange={(e) => setForm({ ...form, asset_code: e.target.value })} /></div>
        </div>
        <div className="space-y-1"><Label>Nama Alat</Label><Input required value={form.asset_name} onChange={(e) => setForm({ ...form, asset_name: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><Label>Lokasi</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
          <div className="space-y-1"><Label>Merk / Type</Label><Input value={form.brand_type} onChange={(e) => setForm({ ...form, brand_type: e.target.value })} /></div>
          <div className="space-y-1"><Label>Serial Number</Label><Input value={form.serial_number} onChange={(e) => setForm({ ...form, serial_number: e.target.value })} /></div>
          <div className="space-y-1"><Label>KW / HP / Amp</Label><Input value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} /></div>
          <div className="space-y-1"><Label>Tahun Pengadaan</Label><Input type="number" value={form.year_acquired ?? ""} onChange={(e) => setForm({ ...form, year_acquired: e.target.value ? Number(e.target.value) : null })} /></div>
          <div className="space-y-1">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["active", "maintenance", "repair", "retired"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1"><Label>Deskripsi Pekerjaan</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div className="space-y-1"><Label>PIC</Label><Input value={form.pic} onChange={(e) => setForm({ ...form, pic: e.target.value })} /></div>
        <DialogFooter><Button type="submit" disabled={pending}>{pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Simpan</Button></DialogFooter>
      </form>
    </DialogContent>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useMemo } from "react";
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
import { Plus, Search, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/fms/spare-parts")({
  head: () => ({ meta: [{ title: "Logistik Teknik — Spare Parts" }] }),
  component: SparePartsPage,
});

function SparePartsPage() {
  return (
    <>
      <PageHeader title="Logistik Teknik" description="Master spare parts, transaksi masuk/keluar, dan permintaan." />
      <Tabs defaultValue="master">
        <TabsList>
          <TabsTrigger value="master">Master Part</TabsTrigger>
          <TabsTrigger value="in">Part Masuk</TabsTrigger>
          <TabsTrigger value="out">Part Keluar</TabsTrigger>
          <TabsTrigger value="request">Spare Parts Request</TabsTrigger>
        </TabsList>
        <TabsContent value="master"><MasterTab /></TabsContent>
        <TabsContent value="in"><MovementTab type="in" /></TabsContent>
        <TabsContent value="out"><MovementTab type="out" /></TabsContent>
        <TabsContent value="request"><MovementTab type="request" /></TabsContent>
      </Tabs>
    </>
  );
}

function MasterTab() {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data = [], isLoading } = useQuery({
    queryKey: ["spare_parts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("spare_parts").select("*").order("code");
      if (error) throw error;
      return data;
    },
  });
  const filtered = useMemo(() => data.filter((r: any) =>
    [r.code, r.name].some((v) => (v ?? "").toLowerCase().includes(search.toLowerCase()))
  ), [data, search]);

  const createMut = useMutation({
    mutationFn: async (form: any) => {
      const { error } = await supabase.from("spare_parts").insert({ ...form, created_by: user!.id });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Part ditambahkan"); qc.invalidateQueries({ queryKey: ["spare_parts"] }); setOpen(false); },
    onError: (e: any) => toast.error(e.message),
  });
  const delMut = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("spare_parts").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast.success("Dihapus"); qc.invalidateQueries({ queryKey: ["spare_parts"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <Card className="mt-4">
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Cari kode / nama…" className="w-64 pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Tambah Part</Button></DialogTrigger>
          <MasterDialog onSubmit={(f) => createMut.mutate(f)} pending={createMut.isPending} />
        </Dialog>
      </div>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead><TableHead>Nama</TableHead><TableHead>Satuan</TableHead>
              <TableHead className="text-right">Stok Awal</TableHead>
              <TableHead className="text-right">Masuk</TableHead>
              <TableHead className="text-right">Keluar</TableHead>
              <TableHead className="text-right">Stok Akhir</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={8} className="py-10 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></TableCell></TableRow>}
            {!isLoading && filtered.length === 0 && <TableRow><TableCell colSpan={8} className="py-10 text-center text-muted-foreground">Belum ada data.</TableCell></TableRow>}
            {filtered.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.code}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.unit ?? "—"}</TableCell>
                <TableCell className="text-right">{r.stock_initial}</TableCell>
                <TableCell className="text-right">{r.stock_in}</TableCell>
                <TableCell className="text-right">{r.stock_out}</TableCell>
                <TableCell className="text-right font-semibold">{r.stock_final}</TableCell>
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

function MasterDialog({ onSubmit, pending }: { onSubmit: (f: any) => void; pending: boolean }) {
  const [form, setForm] = useState({ code: "", name: "", unit: "pcs", stock_initial: 0, stock_in: 0, stock_out: 0 });
  return (
    <DialogContent>
      <DialogHeader><DialogTitle>Tambah Spare Part</DialogTitle><DialogDescription>Master data spare part.</DialogDescription></DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><Label>Kode</Label><Input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></div>
          <div className="space-y-1"><Label>Satuan</Label><Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} /></div>
        </div>
        <div className="space-y-1"><Label>Nama Barang</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1"><Label>Stok Awal</Label><Input type="number" value={form.stock_initial} onChange={(e) => setForm({ ...form, stock_initial: Number(e.target.value) })} /></div>
          <div className="space-y-1"><Label>Masuk</Label><Input type="number" value={form.stock_in} onChange={(e) => setForm({ ...form, stock_in: Number(e.target.value) })} /></div>
          <div className="space-y-1"><Label>Keluar</Label><Input type="number" value={form.stock_out} onChange={(e) => setForm({ ...form, stock_out: Number(e.target.value) })} /></div>
        </div>
        <DialogFooter><Button type="submit" disabled={pending}>{pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Simpan</Button></DialogFooter>
      </form>
    </DialogContent>
  );
}

function MovementTab({ type }: { type: "in" | "out" | "request" }) {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const { data = [], isLoading } = useQuery({
    queryKey: ["spm", type],
    queryFn: async () => {
      const { data, error } = await supabase.from("spare_part_movements").select("*").eq("movement_type", type).order("occurred_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const createMut = useMutation({
    mutationFn: async (form: any) => {
      const { error } = await supabase.from("spare_part_movements").insert({ ...form, movement_type: type, created_by: user!.id });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Tersimpan"); qc.invalidateQueries({ queryKey: ["spm", type] }); setOpen(false); },
    onError: (e: any) => toast.error(e.message),
  });
  const delMut = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("spare_part_movements").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["spm", type] }),
    onError: (e: any) => toast.error(e.message),
  });
  const labels = { in: "Part Masuk", out: "Part Keluar", request: "Spare Parts Request" } as const;
  return (
    <Card className="mt-4">
      <div className="flex items-center justify-end p-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Tambah {labels[type]}</Button></DialogTrigger>
          <MovementDialog type={type} onSubmit={(f) => createMut.mutate(f)} pending={createMut.isPending} />
        </Dialog>
      </div>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead><TableHead>Kode</TableHead><TableHead>Nama</TableHead>
              <TableHead>Merk/Type</TableHead><TableHead className="text-right">Qty</TableHead>
              <TableHead>Satuan</TableHead><TableHead>PIC</TableHead><TableHead>Keterangan</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={9} className="py-10 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></TableCell></TableRow>}
            {!isLoading && data.length === 0 && <TableRow><TableCell colSpan={9} className="py-10 text-center text-muted-foreground">Belum ada data.</TableCell></TableRow>}
            {data.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell className="text-xs">{new Date(r.occurred_at).toLocaleString("id-ID")}</TableCell>
                <TableCell className="font-mono text-xs">{r.part_code ?? "—"}</TableCell>
                <TableCell className="font-medium">{r.part_name}</TableCell>
                <TableCell>{r.brand_type ?? "—"}</TableCell>
                <TableCell className="text-right">{r.quantity}</TableCell>
                <TableCell>{r.unit ?? "—"}</TableCell>
                <TableCell>{r.pic ?? "—"}</TableCell>
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
  );
}

function MovementDialog({ type, onSubmit, pending }: { type: "in" | "out" | "request"; onSubmit: (f: any) => void; pending: boolean }) {
  const [form, setForm] = useState<any>({
    part_code: "", part_name: "", brand_type: "", quantity: 1, unit: "pcs", pic: "", notes: "",
    request_date: type === "request" ? new Date().toISOString().slice(0, 10) : null,
    arrival_date: null,
  });
  return (
    <DialogContent className="max-w-lg">
      <DialogHeader><DialogTitle>Tambah {type === "in" ? "Part Masuk" : type === "out" ? "Part Keluar" : "Permintaan Spare Part"}</DialogTitle><DialogDescription>Catatan transaksi spare part.</DialogDescription></DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><Label>Kode Part</Label><Input value={form.part_code} onChange={(e) => setForm({ ...form, part_code: e.target.value })} /></div>
          <div className="space-y-1"><Label>PIC</Label><Input value={form.pic} onChange={(e) => setForm({ ...form, pic: e.target.value })} /></div>
        </div>
        <div className="space-y-1"><Label>Nama Barang</Label><Input required value={form.part_name} onChange={(e) => setForm({ ...form, part_name: e.target.value })} /></div>
        <div className="space-y-1"><Label>Merk / Type / Model</Label><Input value={form.brand_type} onChange={(e) => setForm({ ...form, brand_type: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><Label>Jumlah</Label><Input type="number" required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} /></div>
          <div className="space-y-1"><Label>Satuan</Label><Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} /></div>
        </div>
        {type === "request" && (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label>Tanggal PR</Label><Input type="date" value={form.request_date ?? ""} onChange={(e) => setForm({ ...form, request_date: e.target.value })} /></div>
            <div className="space-y-1"><Label>Tanggal Barang Datang</Label><Input type="date" value={form.arrival_date ?? ""} onChange={(e) => setForm({ ...form, arrival_date: e.target.value })} /></div>
          </div>
        )}
        <div className="space-y-1"><Label>Keterangan</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
        <DialogFooter><Button type="submit" disabled={pending}>{pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Simpan</Button></DialogFooter>
      </form>
    </DialogContent>
  );
}

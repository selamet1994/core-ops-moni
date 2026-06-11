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
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Plus, Search, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/fms/preventive-maintenance")({
  head: () => ({ meta: [{ title: "Preventive Maintenance — FMS" }] }),
  component: PMPage,
});

function PMPage() {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["pm"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("preventive_maintenance")
        .select("*")
        .order("scheduled_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(
    () => data.filter((r) =>
      [r.asset_name, r.location, r.ticket_no].some((v) => (v ?? "").toLowerCase().includes(search.toLowerCase()))
    ),
    [data, search],
  );

  const createMut = useMutation({
    mutationFn: async (form: any) => {
      const { error } = await supabase.from("preventive_maintenance").insert({
        ...form,
        created_by: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Pekerjaan ditambahkan");
      qc.invalidateQueries({ queryKey: ["pm"] });
      setOpen(false);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: any }) => {
      const { error } = await supabase
        .from("preventive_maintenance")
        .update({ status, completed_date: status === "completed" ? new Date().toISOString().slice(0,10) : null })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pm"] }),
    onError: (e: any) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("preventive_maintenance").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Data dihapus"); qc.invalidateQueries({ queryKey: ["pm"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader title="Preventive Maintenance" description="Penjadwalan & monitoring pekerjaan PM aset gedung.">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Cari aset / tiket…" className="w-64 pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Tambah PM</Button>
          </DialogTrigger>
          <CreatePMDialog onSubmit={(f) => createMut.mutate(f)} pending={createMut.isPending} />
        </Dialog>
      </PageHeader>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiket</TableHead>
                <TableHead>Aset</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Jadwal</TableHead>
                <TableHead>Prioritas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-32 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow><TableCell colSpan={7} className="py-10 text-center text-muted-foreground"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></TableCell></TableRow>
              )}
              {!isLoading && filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="py-10 text-center text-muted-foreground">Belum ada data.</TableCell></TableRow>
              )}
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.ticket_no}</TableCell>
                  <TableCell className="font-medium">{r.asset_name}</TableCell>
                  <TableCell>{r.location ?? "—"}</TableCell>
                  <TableCell>{r.scheduled_date}</TableCell>
                  <TableCell className="capitalize">{r.priority}</TableCell>
                  <TableCell>
                    <Select value={r.status} onValueChange={(v) => updateStatus.mutate({ id: r.id, status: v })}>
                      <SelectTrigger className="h-8 w-36 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["pending","in_progress","completed","overdue","approved","rejected"].map(s =>
                          <SelectItem key={s} value={s}><StatusBadge status={s} /></SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    {isAdmin && (
                      <Button variant="ghost" size="icon" onClick={() => { if (confirm("Hapus data ini?")) delMut.mutate(r.id); }}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
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

function CreatePMDialog({ onSubmit, pending }: { onSubmit: (f: any) => void; pending: boolean }) {
  const [form, setForm] = useState({
    asset_name: "", location: "", description: "",
    scheduled_date: new Date().toISOString().slice(0,10),
    priority: "medium", notes: "",
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Tambah Preventive Maintenance</DialogTitle>
        <DialogDescription>Lengkapi detail pekerjaan PM.</DialogDescription>
      </DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-3">
        <div className="space-y-1"><Label>Nama Aset</Label><Input required value={form.asset_name} onChange={(e) => setForm({...form, asset_name: e.target.value})} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><Label>Lokasi</Label><Input value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} /></div>
          <div className="space-y-1"><Label>Tanggal Jadwal</Label><Input type="date" required value={form.scheduled_date} onChange={(e) => setForm({...form, scheduled_date: e.target.value})} /></div>
        </div>
        <div className="space-y-1">
          <Label>Prioritas</Label>
          <Select value={form.priority} onValueChange={(v) => setForm({...form, priority: v})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1"><Label>Deskripsi</Label><Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /></div>
        <DialogFooter>
          <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Simpan
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

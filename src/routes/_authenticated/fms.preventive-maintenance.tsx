import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Plus, Search, Trash2, Loader2, ClipboardList, CheckCircle2, CalendarDays, QrCode, ScanLine, Eye } from "lucide-react";
import { PM_CATALOG, MONTHS_ID, type PMCategory } from "@/lib/pm-catalog";
import { PM_SCHEDULE, type PMScheduleItem } from "@/lib/pm-schedule";
import { QRScannerDialog } from "@/components/QRScannerDialog";
import { PMItemDetailDialog, checklistForItem } from "@/components/PMItemDetailDialog";

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
      <PageHeader title="Preventive Maintenance" description="Penjadwalan & monitoring pekerjaan PM aset gedung." />

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets"><CheckCircle2 className="mr-1.5 h-4 w-4" /> Jadwal & Tiket PM</TabsTrigger>
          <TabsTrigger value="catalog"><ClipboardList className="mr-1.5 h-4 w-4" /> Daftar PM Bulanan</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cari aset / tiket…" className="w-64 pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="ml-auto">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button><Plus className="mr-2 h-4 w-4" /> Tambah PM</Button>
                </DialogTrigger>
                <CreatePMDialog onSubmit={(f) => createMut.mutate(f)} pending={createMut.isPending} />
              </Dialog>
            </div>
          </div>

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
        </TabsContent>

        <TabsContent value="catalog">
          <PMCatalogView
            onSchedule={(cat) => {
              const today = new Date().toISOString().slice(0, 10);
              createMut.mutate({
                asset_name: cat.name,
                location: "",
                description: `PM Bulanan ${cat.name} — ${cat.checklist.length} item pemeriksaan`,
                scheduled_date: today,
                priority: "medium",
                notes: cat.checklist.map((c, i) => `${i + 1}. ${c}`).join("\n"),
              });
            }}
            onScheduleItem={(it) => {
              const today = new Date().toISOString().slice(0, 10);
              const cat = PM_CATALOG.find(
                (c) =>
                  c.group === it.group &&
                  (it.name.toUpperCase().includes(c.name.toUpperCase().split(" ")[0]) ||
                    c.name.toUpperCase().includes(it.name.toUpperCase().split(" ")[0])),
              );
              const notes = [
                `Kode: ${it.code}`,
                `Periode: ${it.periode}`,
                `Bulan: ${it.month}`,
                "",
                ...(cat
                  ? ["Checklist PM:", ...cat.checklist.map((c, i) => `${i + 1}. ${c}`)]
                  : []),
              ].join("\n");
              createMut.mutate({
                asset_name: `${it.name} (${it.code})`,
                location: it.location,
                description: `PM ${it.group} — ${it.name} di ${it.location}`,
                scheduled_date: today,
                priority: "medium",
                notes,
              });
            }}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}

function PMCatalogView({
  onSchedule,
  onScheduleItem,
}: {
  onSchedule: (cat: PMCategory) => void;
  onScheduleItem: (it: PMScheduleItem) => void;
}) {
  const [group, setGroup] = useState<string>("ALL");
  const [month, setMonth] = useState<string>(MONTHS_ID[new Date().getMonth()]);
  const [scheduleSearch, setScheduleSearch] = useState("");

  const items = useMemo(
    () => (group === "ALL" ? PM_CATALOG : PM_CATALOG.filter((c) => c.group === group)),
    [group],
  );

  const monthSchedule = useMemo(() => {
    const q = scheduleSearch.trim().toLowerCase();
    return PM_SCHEDULE.filter((s) => s.month === month)
      .filter((s) => (group === "ALL" || group === "LIFT" ? true : s.group === group))
      .filter((s) =>
        q
          ? [s.code, s.name, s.location, s.periode].some((v) => v.toLowerCase().includes(q))
          : true,
      );
  }, [month, group, scheduleSearch]);

  const grouped = useMemo(() => {
    const m: Record<string, PMScheduleItem[]> = {};
    for (const it of monthSchedule) (m[it.group] ||= []).push(it);
    return m;
  }, [monthSchedule]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Daftar PM yang harus dilakukan tiap bulan</CardTitle>
          <CardDescription>
            Sumber: <span className="font-medium">PREVENTIVE MEP / HVAC / PANEL MHKN — Master</span>.
            Pilih bulan & kelompok untuk melihat daftar alat beserta lokasinya.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Bulan</Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>{MONTHS_ID.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Kelompok</Label>
            <Select value={group} onValueChange={setGroup}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua</SelectItem>
                <SelectItem value="MEP">MEP</SelectItem>
                <SelectItem value="HVAC">HVAC</SelectItem>
                <SelectItem value="PANEL">Panel</SelectItem>
                <SelectItem value="LIFT">Lift (checklist)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 flex-1 min-w-[200px]">
            <Label className="text-xs">Cari alat / lokasi</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder="Mis. Chiller, AHU, PP HVAC, LANTAI 3…"
                value={scheduleSearch}
                onChange={(e) => setScheduleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            Total alat bulan ini:{" "}
            <span className="font-semibold text-foreground">{monthSchedule.length}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CalendarDays className="h-4 w-4" /> Jadwal Alat — {month}
          </CardTitle>
          <CardDescription>
            Daftar alat & lokasi yang harus di-PM pada bulan {month} (dari master Excel).
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {Object.keys(grouped).length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Tidak ada alat terjadwal untuk filter ini.
            </div>
          ) : (
            Object.entries(grouped).map(([g, list]) => (
              <div key={g} className="border-t first:border-t-0">
                <div className="flex items-center gap-2 bg-muted/40 px-4 py-2 text-xs font-semibold">
                  <Badge variant="outline" className="font-mono text-[10px]">{g}</Badge>
                  <span>{list.length} alat</span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-40">Kode</TableHead>
                      <TableHead>Nama Alat</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead className="w-40">Periode</TableHead>
                      <TableHead className="w-32 text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {list.map((it, i) => (
                      <TableRow key={`${g}-${i}-${it.code}`}>
                        <TableCell className="font-mono text-xs">{it.code}</TableCell>
                        <TableCell className="font-medium">{it.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{it.location || "—"}</TableCell>
                        <TableCell className="text-xs">{it.periode || "—"}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" onClick={() => onScheduleItem(it)}>
                            <Plus className="mr-1 h-3.5 w-3.5" /> Tiket
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Referensi Checklist PM (per kategori)</CardTitle>
          <CardDescription>Item pemeriksaan standar untuk tiap kategori alat.</CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <Accordion type="multiple" className="w-full">
            {items.map((cat) => (
              <AccordionItem key={cat.code} value={cat.code}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-1 items-center gap-3 pr-2">
                    <Badge variant="outline" className="font-mono text-[10px]">{cat.group}</Badge>
                    <span className="font-medium">{cat.name}</span>
                    <Badge variant="secondary" className="text-[10px]">{cat.checklist.length} item</Badge>
                    <span className="ml-auto text-xs text-muted-foreground">{cat.period}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <ol className="grid grid-cols-1 gap-x-6 gap-y-1.5 pl-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
                      {cat.checklist.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="flex justify-end pt-2">
                      <Button size="sm" variant="outline" onClick={() => onSchedule(cat)}>
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Jadwalkan PM {month}
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
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

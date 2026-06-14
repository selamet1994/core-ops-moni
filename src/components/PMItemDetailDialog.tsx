import { useMemo, useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, Printer, Plus, Loader2, Save } from "lucide-react";
import { PM_CATALOG } from "@/lib/pm-catalog";
import type { PMScheduleItem } from "@/lib/pm-schedule";

export function checklistForItem(it: PMScheduleItem): string[] {
  const upper = it.name.toUpperCase();
  const matchers: Array<[RegExp, string]> = [
    [/LIFT|BED|PASSANGER|SERVICE KOTOR|BERSIH/, "LIFT"],
    [/CHILLER/, "CHILLER"],
    [/UPS/, "UPS"],
    [/GENSET/, "GENSET"],
    [/POMPA|PUMP/, "POMPA"],
    [/PNEUMATIC|TUBE/, "PNEUMATIC_TUBE"],
    [/FIRE ALARM|MCFA/, "FIRE_ALARM"],
    [/SOUND|SPEAKER|TOA/, "SOUND_SYSTEM"],
    [/EXHAUST|FAN/, "EXHAUST_FAN"],
    [/WATER HEATER|HEATER/, "WATER_HEATER"],
    [/RO|REVERSE OSMOSIS/, "REVERSE_OSMOSIS"],
    [/AHU|FCU|AC |HVAC|SPLIT|VRV|CASSETTE/, "AC_HVAC"],
    [/PANEL|LVMDP|SDP|PP |MDP/, "PANEL_LISTRIK"],
  ];
  for (const [re, code] of matchers) {
    if (re.test(upper)) {
      const cat = PM_CATALOG.find((c) => c.code === code);
      if (cat) return cat.checklist;
    }
  }
  if (it.group === "HVAC") return PM_CATALOG.find((c) => c.code === "AC_HVAC")?.checklist ?? [];
  if (it.group === "PANEL") return PM_CATALOG.find((c) => c.code === "PANEL_LISTRIK")?.checklist ?? [];
  return [];
}

export function PMItemDetailDialog({
  open, onOpenChange, item, onCreateTicket,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: PMScheduleItem | null;
  onCreateTicket: (it: PMScheduleItem) => void;
}) {
  const checklist = useMemo(() => (item ? checklistForItem(item) : []), [item]);
  const { user } = useAuth();
  const qc = useQueryClient();

  const [values, setValues] = useState<Record<string, string>>({});
  const [pic, setPic] = useState("");
  const [remarks, setRemarks] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (open) {
      setValues({});
      setPic("");
      setRemarks("");
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [open, item?.code]);

  const saveMut = useMutation({
    mutationFn: async () => {
      if (!item) return;
      const lines = [
        `Kode: ${item.code}`,
        `Periode: ${item.periode}`,
        `Bulan: ${item.month}`,
        `PIC: ${pic || "—"}`,
        "",
        "Hasil Checklist PM:",
        ...checklist.map((c, i) => `${i + 1}. ${c} : ${values[c] || "-"}`),
        "",
        remarks ? `Catatan: ${remarks}` : "",
      ].filter(Boolean).join("\n");
      const { error } = await supabase.from("preventive_maintenance").insert({
        asset_name: `${item.name} (${item.code})`,
        location: item.location,
        description: `PM ${item.group} — ${item.name}`,
        scheduled_date: date,
        completed_date: date,
        priority: "medium",
        status: "completed",
        notes: lines,
        created_by: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Hasil PM tersimpan");
      qc.invalidateQueries({ queryKey: ["pm"] });
      onOpenChange(false);
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (!item) return null;

  function downloadQR() {
    const canvas = document.getElementById("pm-detail-qr") as HTMLCanvasElement | null;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${item!.code}.png`;
    a.click();
  }

  function printQR() {
    const canvas = document.getElementById("pm-detail-qr") as HTMLCanvasElement | null;
    if (!canvas || !item) return;
    const url = canvas.toDataURL("image/png");
    const w = window.open("", "_blank", "width=400,height=520");
    if (!w) return;
    w.document.write(`<html><head><title>${item.code}</title></head><body style="font-family:sans-serif;text-align:center;padding:24px">
      <img src="${url}" style="width:260px;height:260px"/>
      <div style="margin-top:12px;font-weight:600">${item.name}</div>
      <div style="font-family:monospace;color:#555">${item.code}</div>
      <div style="color:#666;font-size:12px;margin-top:4px">${item.location} • ${item.periode}</div>
      <script>window.onload=()=>window.print()</script>
    </body></html>`);
    w.document.close();
  }

  const filledCount = checklist.filter((c) => (values[c] ?? "").trim() !== "").length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px]">{item.group}</Badge>
            {item.name}
          </DialogTitle>
          <DialogDescription className="text-xs">
            <span className="font-mono">{item.code}</span> • {item.location || "—"} • {item.periode || "—"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="checklist" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="self-start">
            <TabsTrigger value="checklist">Isi Checklist PM</TabsTrigger>
            <TabsTrigger value="info">Info & QR</TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="flex-1 overflow-auto space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="space-y-1">
                <Label className="text-xs">Tanggal PM</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <Label className="text-xs">PIC / Teknisi</Label>
                <Input value={pic} onChange={(e) => setPic(e.target.value)} placeholder="Nama teknisi" />
              </div>
            </div>

            <div className="rounded-md border">
              <div className="flex items-center justify-between border-b bg-muted/40 px-3 py-2 text-xs">
                <span className="font-semibold">
                  Checklist Pemeriksaan ({checklist.length} item)
                </span>
                <span className="text-muted-foreground">
                  Terisi: <b className="text-foreground">{filledCount}</b>/{checklist.length}
                </span>
              </div>
              {checklist.length === 0 ? (
                <p className="p-4 text-xs text-muted-foreground">
                  Belum ada referensi checklist khusus untuk alat ini.
                </p>
              ) : (
                <div className="max-h-[40vh] overflow-auto divide-y">
                  {checklist.map((c, i) => (
                    <div key={i} className="grid grid-cols-1 gap-1 px-3 py-2 sm:grid-cols-[1fr_220px] sm:items-center sm:gap-3">
                      <Label className="text-xs leading-snug">
                        <span className="text-muted-foreground tabular-nums mr-1">
                          {String(i + 1).padStart(2, "0")}.
                        </span>
                        {c}
                      </Label>
                      <Input
                        className="h-8 text-xs"
                        placeholder="Hasil / nilai / OK"
                        value={values[c] ?? ""}
                        onChange={(e) => setValues({ ...values, [c]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Catatan / Temuan</Label>
              <Textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Catatan tambahan, kerusakan, tindakan…"
              />
            </div>
          </TabsContent>

          <TabsContent value="info" className="flex-1 overflow-auto mt-2">
            <div className="flex flex-col items-center gap-2 rounded-md border bg-white p-4 text-center">
              <QRCodeCanvas id="pm-detail-qr" value={item.code} size={220} includeMargin level="M" />
              <div className="font-mono text-[11px] text-muted-foreground">{item.code}</div>
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-xs text-muted-foreground">{item.location} • {item.periode}</div>
              <div className="flex gap-1.5 mt-2">
                <Button size="sm" variant="outline" onClick={downloadQR}><Download className="mr-1 h-3.5 w-3.5" /> PNG</Button>
                <Button size="sm" variant="outline" onClick={printQR}><Printer className="mr-1 h-3.5 w-3.5" /> Cetak</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => { onCreateTicket(item); onOpenChange(false); }}>
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Buat Tiket Saja
          </Button>
          <Button onClick={() => saveMut.mutate()} disabled={saveMut.isPending || checklist.length === 0}>
            {saveMut.isPending ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1.5 h-3.5 w-3.5" />}
            Simpan Hasil PM
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

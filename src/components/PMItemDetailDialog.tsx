import { useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, Plus } from "lucide-react";
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px]">{item.group}</Badge>
            {item.name}
          </DialogTitle>
          <DialogDescription className="text-xs">
            <span className="font-mono">{item.code}</span> • {item.location || "—"} • {item.periode || "—"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-[220px_1fr]">
          <div className="flex flex-col items-center gap-2 rounded-md border bg-white p-3 text-center">
            <QRCodeCanvas id="pm-detail-qr" value={item.code} size={200} includeMargin level="M" />
            <div className="font-mono text-[10px] text-muted-foreground">{item.code}</div>
            <div className="flex gap-1.5">
              <Button size="sm" variant="outline" onClick={downloadQR}><Download className="mr-1 h-3.5 w-3.5" /> PNG</Button>
              <Button size="sm" variant="outline" onClick={printQR}><Printer className="mr-1 h-3.5 w-3.5" /> Cetak</Button>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-semibold">
              Checklist Pemeriksaan{" "}
              <span className="text-muted-foreground">({checklist.length} item)</span>
            </div>
            {checklist.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Belum ada referensi checklist khusus untuk alat ini. Gunakan checklist standar pada
                kategori terdekat di tab Referensi.
              </p>
            ) : (
              <ol className="max-h-72 space-y-1 overflow-auto pr-2 text-sm">
                {checklist.map((c, i) => (
                  <li key={i} className="flex gap-2 border-b border-dashed py-1">
                    <span className="text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}.</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => { onCreateTicket(item); onOpenChange(false); }}>
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Buat Tiket PM
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

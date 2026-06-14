import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Loader2 } from "lucide-react";

interface PMRow {
  id: string;
  ticket_no: string;
  asset_name: string;
  location: string | null;
  scheduled_date: string;
  completed_date: string | null;
  status: string;
  notes: string | null;
  photo_urls: string[] | null;
  signature_url: string | null;
  signer_name: string | null;
  checklist_results: Array<{ item: string; value: string }> | null;
}

async function signPath(path: string): Promise<string | null> {
  const { data } = await supabase.storage.from("pm-evidence").createSignedUrl(path, 3600);
  return data?.signedUrl ?? null;
}

export function PMResultDialog({
  open, onOpenChange, row,
}: { open: boolean; onOpenChange: (v: boolean) => void; row: PMRow | null }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [sig, setSig] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !row) return;
    setLoading(true);
    (async () => {
      const urls = await Promise.all((row.photo_urls ?? []).map(signPath));
      setPhotos(urls.filter(Boolean) as string[]);
      setSig(row.signature_url ? await signPath(row.signature_url) : null);
      setLoading(false);
    })();
  }, [open, row?.id]);

  if (!row) return null;

  function downloadCSV() {
    const rows = [
      ["Ticket", row!.ticket_no],
      ["Aset", row!.asset_name],
      ["Lokasi", row!.location ?? ""],
      ["Jadwal", row!.scheduled_date],
      ["Selesai", row!.completed_date ?? ""],
      ["Status", row!.status],
      ["Penandatangan", row!.signer_name ?? ""],
      [],
      ["No", "Item", "Hasil"],
      ...(row!.checklist_results ?? []).map((r, i) => [String(i + 1), r.item, r.value]),
    ];
    const csv = rows.map((r) =>
      r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","),
    ).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${row!.ticket_no}.csv`;
    a.click();
  }

  function printPDF() {
    const r = row!;
    const html = `<html><head><title>${r.ticket_no}</title>
      <style>body{font-family:Arial,sans-serif;padding:24px;color:#111}h1{font-size:18px;margin:0 0 4px}h2{font-size:13px;margin:16px 0 6px;border-bottom:1px solid #ccc;padding-bottom:4px}table{width:100%;border-collapse:collapse;font-size:12px}td,th{border:1px solid #ccc;padding:6px;text-align:left;vertical-align:top}.meta{font-size:12px;color:#444;margin-bottom:4px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.grid img{width:100%;height:120px;object-fit:cover;border:1px solid #ccc}.sig img{max-height:90px}</style>
      </head><body>
      <h1>Laporan Preventive Maintenance</h1>
      <div class="meta"><b>${r.ticket_no}</b> — ${r.asset_name}</div>
      <div class="meta">Lokasi: ${r.location ?? "—"} • Jadwal: ${r.scheduled_date} • Selesai: ${r.completed_date ?? "—"}</div>
      <div class="meta">Status: ${r.status} • Penandatangan: ${r.signer_name ?? "—"}</div>
      <h2>Checklist</h2>
      <table><thead><tr><th style="width:30px">#</th><th>Item</th><th style="width:35%">Hasil</th></tr></thead><tbody>
      ${(r.checklist_results ?? []).map((x, i) => `<tr><td>${i+1}</td><td>${x.item}</td><td>${x.value || "—"}</td></tr>`).join("") || `<tr><td colspan="3">${(r.notes ?? "").replace(/</g,"&lt;").replace(/\n/g,"<br/>")}</td></tr>`}
      </tbody></table>
      ${photos.length ? `<h2>Foto Bukti</h2><div class="grid">${photos.map(u=>`<img src="${u}"/>`).join("")}</div>` : ""}
      ${sig ? `<h2>Tanda Tangan</h2><div class="sig"><img src="${sig}"/><div style="border-top:1px solid #555;display:inline-block;padding-top:4px;font-size:11px;min-width:200px">${r.signer_name ?? ""}</div></div>` : ""}
      <script>window.onload=()=>setTimeout(()=>window.print(),300)</script>
    </body></html>`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px]">{row.ticket_no}</Badge>
            {row.asset_name}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {row.location ?? "—"} • Jadwal {row.scheduled_date} • Selesai {row.completed_date ?? "—"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-4">
          {loading && <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin" /></div>}

          <section>
            <h4 className="mb-1 text-xs font-semibold">Hasil Checklist</h4>
            {row.checklist_results && row.checklist_results.length > 0 ? (
              <div className="rounded-md border divide-y text-xs">
                {row.checklist_results.map((r, i) => (
                  <div key={i} className="grid grid-cols-[28px_1fr_180px] gap-2 px-2 py-1.5">
                    <span className="tabular-nums text-muted-foreground">{i + 1}.</span>
                    <span>{r.item}</span>
                    <span className="font-medium">{r.value || "—"}</span>
                  </div>
                ))}
              </div>
            ) : (
              <pre className="whitespace-pre-wrap rounded-md border bg-muted/40 p-2 text-xs">{row.notes ?? "—"}</pre>
            )}
          </section>

          <section>
            <h4 className="mb-1 text-xs font-semibold">Foto Bukti ({photos.length})</h4>
            {photos.length === 0 ? (
              <p className="text-xs text-muted-foreground">Tidak ada foto.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {photos.map((u, i) => (
                  <a key={i} href={u} target="_blank" rel="noreferrer">
                    <img src={u} alt="" className="aspect-square w-full rounded-md object-cover border" />
                  </a>
                ))}
              </div>
            )}
          </section>

          <section>
            <h4 className="mb-1 text-xs font-semibold">Tanda Tangan</h4>
            {sig ? (
              <div className="rounded-md border bg-white p-2 inline-block">
                <img src={sig} alt="signature" className="max-h-32" />
                <div className="mt-1 border-t pt-1 text-center text-[11px]">{row.signer_name ?? "—"}</div>
              </div>
            ) : <p className="text-xs text-muted-foreground">Belum ada tanda tangan.</p>}
          </section>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={downloadCSV}><Download className="mr-1.5 h-3.5 w-3.5" /> CSV</Button>
          <Button onClick={printPDF}><FileText className="mr-1.5 h-3.5 w-3.5" /> Cetak / PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

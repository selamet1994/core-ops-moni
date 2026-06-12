import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export function QRCodeDialog({
  open, onOpenChange, code, title, subtitle,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  code: string;
  title: string;
  subtitle?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  function downloadPng() {
    const canvas = wrapRef.current?.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${code}.png`;
    a.click();
  }

  function printQR() {
    const canvas = wrapRef.current?.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const w = window.open("", "_blank", "width=400,height=500");
    if (!w) return;
    w.document.write(`<html><head><title>${code}</title></head><body style="font-family:sans-serif;text-align:center;padding:24px">
      <img src="${url}" style="width:260px;height:260px"/>
      <div style="margin-top:12px;font-weight:600">${title}</div>
      <div style="font-family:monospace;color:#555">${code}</div>
      ${subtitle ? `<div style="color:#666;font-size:12px;margin-top:4px">${subtitle}</div>` : ""}
      <script>window.onload=()=>{window.print();}</script>
    </body></html>`);
    w.document.close();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>QR Code Alat</DialogTitle>
          <DialogDescription className="text-xs">Scan QR untuk mencari alat ini di sistem.</DialogDescription>
        </DialogHeader>
        <div ref={wrapRef} className="flex flex-col items-center gap-2 rounded-md border bg-white p-4 text-center">
          <QRCodeCanvas value={code} size={220} includeMargin level="M" />
          <div className="mt-1 text-sm font-semibold text-foreground">{title}</div>
          <div className="font-mono text-xs text-muted-foreground">{code}</div>
          {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={downloadPng}><Download className="mr-2 h-4 w-4" /> PNG</Button>
          <Button onClick={printQR}><Printer className="mr-2 h-4 w-4" /> Cetak</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

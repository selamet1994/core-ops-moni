import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, ScanLine } from "lucide-react";

export function QRScannerDialog({
  open, onOpenChange, onDetected,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onDetected: (text: string) => void;
}) {
  const containerId = "qr-reader-container";
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setError(null);
    setStarting(true);

    const start = async () => {
      try {
        const el = document.getElementById(containerId);
        if (!el) return;
        const scanner = new Html5Qrcode(containerId, { verbose: false });
        scannerRef.current = scanner;
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          (decoded) => {
            if (cancelled) return;
            onDetected(decoded);
            stop();
            onOpenChange(false);
          },
          () => {},
        );
        if (!cancelled) setStarting(false);
      } catch (e: any) {
        setError(e?.message ?? "Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.");
        setStarting(false);
      }
    };

    const stop = async () => {
      const s = scannerRef.current;
      scannerRef.current = null;
      if (!s) return;
      try { if (s.isScanning) await s.stop(); } catch {}
      try { await s.clear(); } catch {}
    };

    start();
    return () => { cancelled = true; stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><ScanLine className="h-4 w-4" /> Scan QR Alat</DialogTitle>
          <DialogDescription className="text-xs">
            Arahkan kamera ke QR code alat. Hasil scan akan otomatis dipakai untuk pencarian.
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-square w-full overflow-hidden rounded-md border bg-black">
          <div id={containerId} className="h-full w-full [&_video]:h-full [&_video]:w-full [&_video]:object-cover" />
          {starting && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Memuat kamera…
            </div>
          )}
        </div>
        {error && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
            {error}
          </div>
        )}
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Tutup</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

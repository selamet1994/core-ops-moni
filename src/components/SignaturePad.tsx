import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

export interface SignaturePadHandle {
  toDataURL: () => string | null;
  clear: () => void;
  isEmpty: () => boolean;
}

export function SignaturePad({
  onChange,
  height = 160,
}: {
  onChange?: (dataUrl: string | null) => void;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const empty = useRef(true);
  const [, force] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#111";
  }, []);

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true;
    empty.current = false;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(x, y);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    onChange?.(canvasRef.current!.toDataURL("image/png"));
    force((n) => n + 1);
  }

  function clear() {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    empty.current = true;
    onChange?.(null);
    force((n) => n + 1);
  }

  return (
    <div className="space-y-1">
      <div className="rounded-md border bg-white">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height, touchAction: "none", display: "block" }}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
        />
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{empty.current ? "Belum ada tanda tangan" : "Tanda tangan tersimpan"}</span>
        <Button type="button" variant="ghost" size="sm" onClick={clear} className="h-7">
          <Eraser className="mr-1 h-3.5 w-3.5" /> Hapus
        </Button>
      </div>
    </div>
  );
}

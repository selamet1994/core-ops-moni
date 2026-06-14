import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { s as supabase } from "./client-BX8CplE9.js";
import { useState, useMemo } from "react";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.js";
import { I as Input, B as Button } from "./button-DvaFYl8e.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { D as Dialog, a as DialogTrigger, T as Table, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell, g as DialogContent, h as DialogHeader, i as DialogTitle, j as DialogDescription, k as Textarea, l as DialogFooter } from "./table-DszzeKrc.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.js";
import { P as PageHeader } from "./PageHeader-BuLQaOPw.js";
import { S as StatusBadge } from "./StatusBadge-BIXlzpUh.js";
import { a as useAuth } from "./router-CDNe7lBx.js";
import { toast } from "sonner";
import { Search, Plus, Loader2, Trash2 } from "lucide-react";
import "@supabase/supabase-js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "@radix-ui/react-select";
import "./badge-DyfXZgLs.js";
import "@tanstack/react-router";
function WMPage() {
  const qc = useQueryClient();
  const {
    user,
    isAdmin
  } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const {
    data = [],
    isLoading
  } = useQuery({
    queryKey: ["wm"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("waste_monitoring").select("*").order("log_date", {
        ascending: false
      });
      if (error) throw error;
      return data2;
    }
  });
  const filtered = useMemo(() => data.filter((r) => [r.waste_type, r.source_location, r.category].some((v) => (v ?? "").toLowerCase().includes(search.toLowerCase()))), [data, search]);
  const createMut = useMutation({
    mutationFn: async (form) => {
      const {
        error
      } = await supabase.from("waste_monitoring").insert({
        ...form,
        created_by: user.id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Log tersimpan");
      qc.invalidateQueries({
        queryKey: ["wm"]
      });
      setOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const delMut = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("waste_monitoring").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Data dihapus");
      qc.invalidateQueries({
        queryKey: ["wm"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const totalKg = filtered.reduce((s, r) => s + Number(r.weight_kg ?? 0), 0);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(PageHeader, { title: "Monitoring Limbah", description: "Pencatatan timbulan limbah B3 & non-B3 harian.", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { placeholder: "Cari jenis / lokasi…", className: "w-64 pl-8", value: search, onChange: (e) => setSearch(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " Catat Limbah"
        ] }) }),
        /* @__PURE__ */ jsx(CreateWMDialog, { onSubmit: (f) => createMut.mutate(f), pending: createMut.isPending })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 grid grid-cols-2 gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase text-muted-foreground", children: "Total entri" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-semibold", children: filtered.length })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase text-muted-foreground", children: "Total bobot" }),
        /* @__PURE__ */ jsxs("div", { className: "text-2xl font-semibold", children: [
          totalKg.toFixed(2),
          " kg"
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase text-muted-foreground", children: "Kategori B3" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-semibold", children: filtered.filter((r) => r.category === "b3").length })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Tanggal" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Jenis" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Kategori" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Berat (kg)" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Sumber" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Metode" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsx(TableHead, { className: "w-16 text-right" })
      ] }) }),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        isLoading && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 8, className: "py-10 text-center", children: /* @__PURE__ */ jsx(Loader2, { className: "mx-auto h-5 w-5 animate-spin" }) }) }),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 8, className: "py-10 text-center text-muted-foreground", children: "Belum ada data." }) }),
        filtered.map((r) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: r.log_date }),
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: r.waste_type }),
          /* @__PURE__ */ jsx(TableCell, { className: "uppercase text-xs", children: r.category }),
          /* @__PURE__ */ jsx(TableCell, { children: Number(r.weight_kg).toFixed(2) }),
          /* @__PURE__ */ jsx(TableCell, { children: r.source_location ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: r.disposal_method ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(StatusBadge, { status: r.status }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: isAdmin && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
            if (confirm("Hapus?")) delMut.mutate(r.id);
          }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
        ] }, r.id))
      ] })
    ] }) }) })
  ] });
}
function CreateWMDialog({
  onSubmit,
  pending
}) {
  const [form, setForm] = useState({
    waste_type: "",
    category: "non_b3",
    weight_kg: 0,
    source_location: "",
    disposal_method: "",
    log_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    notes: "",
    status: "pending"
  });
  return /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Catat Limbah" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Input timbulan limbah B3 / non-B3." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit(form);
    }, className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Jenis Limbah" }),
        /* @__PURE__ */ jsx(Input, { required: true, value: form.waste_type, onChange: (e) => setForm({
          ...form,
          waste_type: e.target.value
        }), placeholder: "Oli bekas, kertas, organik…" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Kategori" }),
          /* @__PURE__ */ jsxs(Select, { value: form.category, onValueChange: (v) => setForm({
            ...form,
            category: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "non_b3", children: "Non-B3" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "b3", children: "B3" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "organik", children: "Organik" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "anorganik", children: "Anorganik" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Berat (kg)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", step: "0.01", min: 0, required: true, value: form.weight_kg, onChange: (e) => setForm({
            ...form,
            weight_kg: Number(e.target.value)
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Tanggal" }),
          /* @__PURE__ */ jsx(Input, { type: "date", required: true, value: form.log_date, onChange: (e) => setForm({
            ...form,
            log_date: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Sumber Lokasi" }),
          /* @__PURE__ */ jsx(Input, { value: form.source_location, onChange: (e) => setForm({
            ...form,
            source_location: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Metode Pembuangan" }),
        /* @__PURE__ */ jsx(Input, { value: form.disposal_method, onChange: (e) => setForm({
          ...form,
          disposal_method: e.target.value
        }), placeholder: "Pihak ke-3, insinerasi, dll" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Catatan" }),
        /* @__PURE__ */ jsx(Textarea, { value: form.notes, onChange: (e) => setForm({
          ...form,
          notes: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: pending, children: [
        pending && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
        " Simpan"
      ] }) })
    ] })
  ] });
}
export {
  WMPage as component
};

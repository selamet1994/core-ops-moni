import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { s as supabase } from "./client-BX8CplE9.js";
import { useState, useMemo } from "react";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.js";
import { I as Input, B as Button } from "./button-DvaFYl8e.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { D as Dialog, a as DialogTrigger, T as Table, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell, g as DialogContent, h as DialogHeader, i as DialogTitle, j as DialogDescription, k as Textarea, l as DialogFooter } from "./table-DszzeKrc.js";
import { P as PageHeader } from "./PageHeader-BuLQaOPw.js";
import { S as StatusBadge } from "./StatusBadge-BIXlzpUh.js";
import { a as useAuth } from "./router-Dd6dDKk7.js";
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
import "./badge-DyfXZgLs.js";
import "@tanstack/react-router";
function VMPage() {
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
    queryKey: ["vm"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("vehicle_monitoring").select("*").order("check_date", {
        ascending: false
      });
      if (error) throw error;
      return data2;
    }
  });
  const filtered = useMemo(() => data.filter((r) => [r.vehicle_plate, r.driver_name].some((v) => (v ?? "").toLowerCase().includes(search.toLowerCase()))), [data, search]);
  const createMut = useMutation({
    mutationFn: async (form) => {
      const {
        error
      } = await supabase.from("vehicle_monitoring").insert({
        ...form,
        created_by: user.id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Checklist disimpan");
      qc.invalidateQueries({
        queryKey: ["vm"]
      });
      setOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const delMut = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("vehicle_monitoring").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Data dihapus");
      qc.invalidateQueries({
        queryKey: ["vm"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(PageHeader, { title: "Monitoring Kendaraan", description: "Checklist harian kondisi & operasional kendaraan.", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { placeholder: "Cari plat / driver…", className: "w-64 pl-8", value: search, onChange: (e) => setSearch(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " Checklist Baru"
        ] }) }),
        /* @__PURE__ */ jsx(CreateVMDialog, { onSubmit: (f) => createMut.mutate(f), pending: createMut.isPending })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Tanggal" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Plat" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Driver" }),
        /* @__PURE__ */ jsx(TableHead, { children: "BBM (%)" }),
        /* @__PURE__ */ jsx(TableHead, { children: "KM" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Kondisi" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsx(TableHead, { className: "w-16 text-right" })
      ] }) }),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        isLoading && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 8, className: "py-10 text-center", children: /* @__PURE__ */ jsx(Loader2, { className: "mx-auto h-5 w-5 animate-spin" }) }) }),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 8, className: "py-10 text-center text-muted-foreground", children: "Belum ada data." }) }),
        filtered.map((r) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: r.check_date }),
          /* @__PURE__ */ jsx(TableCell, { className: "font-mono", children: r.vehicle_plate }),
          /* @__PURE__ */ jsx(TableCell, { children: r.driver_name ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: r.fuel_level ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: r.mileage ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "max-w-[200px] truncate", children: r.condition ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(StatusBadge, { status: r.status }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: isAdmin && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
            if (confirm("Hapus?")) delMut.mutate(r.id);
          }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
        ] }, r.id))
      ] })
    ] }) }) })
  ] });
}
function CreateVMDialog({
  onSubmit,
  pending
}) {
  const [form, setForm] = useState({
    vehicle_plate: "",
    driver_name: "",
    check_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    fuel_level: 100,
    mileage: 0,
    condition: "",
    notes: "",
    status: "completed"
  });
  return /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Checklist Kendaraan" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Catat kondisi kendaraan harian." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit(form);
    }, className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Plat Nomor" }),
          /* @__PURE__ */ jsx(Input, { required: true, value: form.vehicle_plate, onChange: (e) => setForm({
            ...form,
            vehicle_plate: e.target.value.toUpperCase()
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Driver" }),
          /* @__PURE__ */ jsx(Input, { value: form.driver_name, onChange: (e) => setForm({
            ...form,
            driver_name: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Tanggal" }),
          /* @__PURE__ */ jsx(Input, { type: "date", required: true, value: form.check_date, onChange: (e) => setForm({
            ...form,
            check_date: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "BBM (%)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", min: 0, max: 100, value: form.fuel_level, onChange: (e) => setForm({
            ...form,
            fuel_level: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "KM" }),
          /* @__PURE__ */ jsx(Input, { type: "number", min: 0, value: form.mileage, onChange: (e) => setForm({
            ...form,
            mileage: Number(e.target.value)
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Kondisi" }),
        /* @__PURE__ */ jsx(Textarea, { value: form.condition, onChange: (e) => setForm({
          ...form,
          condition: e.target.value
        }), placeholder: "Mesin, ban, kebersihan…" })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: pending, children: [
        pending && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
        " Simpan"
      ] }) })
    ] })
  ] });
}
export {
  VMPage as component
};

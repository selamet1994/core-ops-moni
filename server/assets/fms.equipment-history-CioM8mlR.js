import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { s as supabase } from "./client-BX8CplE9.js";
import { useState } from "react";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.js";
import { B as Button, I as Input } from "./button-DvaFYl8e.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { D as Dialog, a as DialogTrigger, T as Table, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell, g as DialogContent, h as DialogHeader, i as DialogTitle, j as DialogDescription, k as Textarea, l as DialogFooter } from "./table-DszzeKrc.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.js";
import { P as PageHeader } from "./PageHeader-BuLQaOPw.js";
import { a as useAuth } from "./router-CDNe7lBx.js";
import { toast } from "sonner";
import { Plus, Loader2, Trash2 } from "lucide-react";
import "@supabase/supabase-js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "@radix-ui/react-select";
import "@radix-ui/react-tabs";
import "@tanstack/react-router";
function CategoryTab({
  category
}) {
  const qc = useQueryClient();
  const {
    user,
    isAdmin
  } = useAuth();
  const [open, setOpen] = useState(false);
  const {
    data = [],
    isLoading
  } = useQuery({
    queryKey: ["eh", category],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("equipment_history").select("*").eq("category", category).order("work_date", {
        ascending: false
      });
      if (error) throw error;
      return data2;
    }
  });
  const createMut = useMutation({
    mutationFn: async (form) => {
      const {
        error
      } = await supabase.from("equipment_history").insert({
        ...form,
        category,
        created_by: user.id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Tersimpan");
      qc.invalidateQueries({
        queryKey: ["eh", category]
      });
      setOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const delMut = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("equipment_history").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["eh", category]
    }),
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxs(Card, { className: "mt-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end p-4", children: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Tambah Riwayat"
      ] }) }),
      /* @__PURE__ */ jsx(EHDialog, { category, onSubmit: (f) => createMut.mutate(f), pending: createMut.isPending })
    ] }) }),
    /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Tanggal" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Nama Alat" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Kode" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Lokasi" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Merk/Type" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Deskripsi" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsx(TableHead, { children: "PIC" }),
        /* @__PURE__ */ jsx(TableHead, { className: "w-16" })
      ] }) }),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        isLoading && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 9, className: "py-10 text-center", children: /* @__PURE__ */ jsx(Loader2, { className: "mx-auto h-5 w-5 animate-spin" }) }) }),
        !isLoading && data.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 9, className: "py-10 text-center text-muted-foreground", children: "Belum ada data." }) }),
        data.map((r) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: r.work_date }),
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: r.asset_name }),
          /* @__PURE__ */ jsx(TableCell, { className: "font-mono text-xs", children: r.asset_code ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: r.location ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: r.brand_type ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "max-w-xs truncate", children: r.description ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: r.status ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: r.pic ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: isAdmin && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
            if (confirm("Hapus?")) delMut.mutate(r.id);
          }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
        ] }, r.id))
      ] })
    ] }) })
  ] });
}
function EHDialog({
  category,
  onSubmit,
  pending
}) {
  const [form, setForm] = useState({
    work_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    asset_name: "",
    asset_code: "",
    location: "",
    brand_type: "",
    serial_number: "",
    capacity: "",
    year_acquired: null,
    description: "",
    status: "active",
    pic: ""
  });
  return /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-xl", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { children: [
        "Tambah Riwayat (",
        category.toUpperCase(),
        ")"
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Data history peralatan / pekerjaan." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit(form);
    }, className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Tanggal" }),
          /* @__PURE__ */ jsx(Input, { type: "date", required: true, value: form.work_date, onChange: (e) => setForm({
            ...form,
            work_date: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Kode Alat" }),
          /* @__PURE__ */ jsx(Input, { value: form.asset_code, onChange: (e) => setForm({
            ...form,
            asset_code: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Nama Alat" }),
        /* @__PURE__ */ jsx(Input, { required: true, value: form.asset_name, onChange: (e) => setForm({
          ...form,
          asset_name: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Lokasi" }),
          /* @__PURE__ */ jsx(Input, { value: form.location, onChange: (e) => setForm({
            ...form,
            location: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Merk / Type" }),
          /* @__PURE__ */ jsx(Input, { value: form.brand_type, onChange: (e) => setForm({
            ...form,
            brand_type: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Serial Number" }),
          /* @__PURE__ */ jsx(Input, { value: form.serial_number, onChange: (e) => setForm({
            ...form,
            serial_number: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "KW / HP / Amp" }),
          /* @__PURE__ */ jsx(Input, { value: form.capacity, onChange: (e) => setForm({
            ...form,
            capacity: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Tahun Pengadaan" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.year_acquired ?? "", onChange: (e) => setForm({
            ...form,
            year_acquired: e.target.value ? Number(e.target.value) : null
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Status" }),
          /* @__PURE__ */ jsxs(Select, { value: form.status, onValueChange: (v) => setForm({
            ...form,
            status: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: ["active", "maintenance", "repair", "retired"].map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s, children: s }, s)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Deskripsi Pekerjaan" }),
        /* @__PURE__ */ jsx(Textarea, { value: form.description, onChange: (e) => setForm({
          ...form,
          description: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "PIC" }),
        /* @__PURE__ */ jsx(Input, { value: form.pic, onChange: (e) => setForm({
          ...form,
          pic: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: pending, children: [
        pending && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
        "Simpan"
      ] }) })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(PageHeader, { title: "Data History Peralatan", description: "DAHIS MEP, MVAC, dan Interior." }),
  /* @__PURE__ */ jsxs(Tabs, { defaultValue: "mep", children: [
    /* @__PURE__ */ jsxs(TabsList, { children: [
      /* @__PURE__ */ jsx(TabsTrigger, { value: "mep", children: "DAHIS MEP" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "mvac", children: "DAHIS MVAC" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "interior", children: "DAHIS Interior" })
    ] }),
    /* @__PURE__ */ jsx(TabsContent, { value: "mep", children: /* @__PURE__ */ jsx(CategoryTab, { category: "mep" }) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "mvac", children: /* @__PURE__ */ jsx(CategoryTab, { category: "mvac" }) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "interior", children: /* @__PURE__ */ jsx(CategoryTab, { category: "interior" }) })
  ] })
] });
export {
  SplitComponent as component
};

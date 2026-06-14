import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { s as supabase } from "./client-BX8CplE9.js";
import { useState, useMemo } from "react";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.js";
import { I as Input, B as Button } from "./button-DvaFYl8e.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { D as Dialog, a as DialogTrigger, T as Table, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell, g as DialogContent, h as DialogHeader, i as DialogTitle, j as DialogDescription, l as DialogFooter, k as Textarea } from "./table-DszzeKrc.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.js";
import { P as PageHeader } from "./PageHeader-BuLQaOPw.js";
import { a as useAuth } from "./router-C69brUar.js";
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
import "@radix-ui/react-tabs";
import "@tanstack/react-router";
function SparePartsPage() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Logistik Teknik", description: "Master spare parts, transaksi masuk/keluar, dan permintaan." }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "master", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "master", children: "Master Part" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "in", children: "Part Masuk" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "out", children: "Part Keluar" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "request", children: "Spare Parts Request" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "master", children: /* @__PURE__ */ jsx(MasterTab, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "in", children: /* @__PURE__ */ jsx(MovementTab, { type: "in" }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "out", children: /* @__PURE__ */ jsx(MovementTab, { type: "out" }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "request", children: /* @__PURE__ */ jsx(MovementTab, { type: "request" }) })
    ] })
  ] });
}
function MasterTab() {
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
    queryKey: ["spare_parts"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("spare_parts").select("*").order("code");
      if (error) throw error;
      return data2;
    }
  });
  const filtered = useMemo(() => data.filter((r) => [r.code, r.name].some((v) => (v ?? "").toLowerCase().includes(search.toLowerCase()))), [data, search]);
  const createMut = useMutation({
    mutationFn: async (form) => {
      const {
        error
      } = await supabase.from("spare_parts").insert({
        ...form,
        created_by: user.id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Part ditambahkan");
      qc.invalidateQueries({
        queryKey: ["spare_parts"]
      });
      setOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const delMut = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("spare_parts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Dihapus");
      qc.invalidateQueries({
        queryKey: ["spare_parts"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxs(Card, { className: "mt-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { placeholder: "Cari kode / nama…", className: "w-64 pl-8", value: search, onChange: (e) => setSearch(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Tambah Part"
        ] }) }),
        /* @__PURE__ */ jsx(MasterDialog, { onSubmit: (f) => createMut.mutate(f), pending: createMut.isPending })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Kode" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Nama" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Satuan" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Stok Awal" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Masuk" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Keluar" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Stok Akhir" }),
        /* @__PURE__ */ jsx(TableHead, { className: "w-16" })
      ] }) }),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        isLoading && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 8, className: "py-10 text-center", children: /* @__PURE__ */ jsx(Loader2, { className: "mx-auto h-5 w-5 animate-spin" }) }) }),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 8, className: "py-10 text-center text-muted-foreground", children: "Belum ada data." }) }),
        filtered.map((r) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-mono text-xs", children: r.code }),
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: r.name }),
          /* @__PURE__ */ jsx(TableCell, { children: r.unit ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: r.stock_initial }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: r.stock_in }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: r.stock_out }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right font-semibold", children: r.stock_final }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: isAdmin && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
            if (confirm("Hapus?")) delMut.mutate(r.id);
          }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
        ] }, r.id))
      ] })
    ] }) })
  ] });
}
function MasterDialog({
  onSubmit,
  pending
}) {
  const [form, setForm] = useState({
    code: "",
    name: "",
    unit: "pcs",
    stock_initial: 0,
    stock_in: 0,
    stock_out: 0
  });
  return /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Tambah Spare Part" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Master data spare part." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit(form);
    }, className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Kode" }),
          /* @__PURE__ */ jsx(Input, { required: true, value: form.code, onChange: (e) => setForm({
            ...form,
            code: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Satuan" }),
          /* @__PURE__ */ jsx(Input, { value: form.unit, onChange: (e) => setForm({
            ...form,
            unit: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Nama Barang" }),
        /* @__PURE__ */ jsx(Input, { required: true, value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Stok Awal" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.stock_initial, onChange: (e) => setForm({
            ...form,
            stock_initial: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Masuk" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.stock_in, onChange: (e) => setForm({
            ...form,
            stock_in: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Keluar" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.stock_out, onChange: (e) => setForm({
            ...form,
            stock_out: Number(e.target.value)
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: pending, children: [
        pending && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
        "Simpan"
      ] }) })
    ] })
  ] });
}
function MovementTab({
  type
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
    queryKey: ["spm", type],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("spare_part_movements").select("*").eq("movement_type", type).order("occurred_at", {
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
      } = await supabase.from("spare_part_movements").insert({
        ...form,
        movement_type: type,
        created_by: user.id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Tersimpan");
      qc.invalidateQueries({
        queryKey: ["spm", type]
      });
      setOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const delMut = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("spare_part_movements").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["spm", type]
    }),
    onError: (e) => toast.error(e.message)
  });
  const labels = {
    in: "Part Masuk",
    out: "Part Keluar",
    request: "Spare Parts Request"
  };
  return /* @__PURE__ */ jsxs(Card, { className: "mt-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end p-4", children: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Tambah ",
        labels[type]
      ] }) }),
      /* @__PURE__ */ jsx(MovementDialog, { type, onSubmit: (f) => createMut.mutate(f), pending: createMut.isPending })
    ] }) }),
    /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Tanggal" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Kode" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Nama" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Merk/Type" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Qty" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Satuan" }),
        /* @__PURE__ */ jsx(TableHead, { children: "PIC" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Keterangan" }),
        /* @__PURE__ */ jsx(TableHead, { className: "w-16" })
      ] }) }),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        isLoading && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 9, className: "py-10 text-center", children: /* @__PURE__ */ jsx(Loader2, { className: "mx-auto h-5 w-5 animate-spin" }) }) }),
        !isLoading && data.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 9, className: "py-10 text-center text-muted-foreground", children: "Belum ada data." }) }),
        data.map((r) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "text-xs", children: new Date(r.occurred_at).toLocaleString("id-ID") }),
          /* @__PURE__ */ jsx(TableCell, { className: "font-mono text-xs", children: r.part_code ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: r.part_name }),
          /* @__PURE__ */ jsx(TableCell, { children: r.brand_type ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: r.quantity }),
          /* @__PURE__ */ jsx(TableCell, { children: r.unit ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: r.pic ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "max-w-xs truncate", children: r.notes ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: isAdmin && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
            if (confirm("Hapus?")) delMut.mutate(r.id);
          }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
        ] }, r.id))
      ] })
    ] }) })
  ] });
}
function MovementDialog({
  type,
  onSubmit,
  pending
}) {
  const [form, setForm] = useState({
    part_code: "",
    part_name: "",
    brand_type: "",
    quantity: 1,
    unit: "pcs",
    pic: "",
    notes: "",
    request_date: type === "request" ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : null,
    arrival_date: null
  });
  return /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { children: [
        "Tambah ",
        type === "in" ? "Part Masuk" : type === "out" ? "Part Keluar" : "Permintaan Spare Part"
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Catatan transaksi spare part." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit(form);
    }, className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Kode Part" }),
          /* @__PURE__ */ jsx(Input, { value: form.part_code, onChange: (e) => setForm({
            ...form,
            part_code: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "PIC" }),
          /* @__PURE__ */ jsx(Input, { value: form.pic, onChange: (e) => setForm({
            ...form,
            pic: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Nama Barang" }),
        /* @__PURE__ */ jsx(Input, { required: true, value: form.part_name, onChange: (e) => setForm({
          ...form,
          part_name: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Merk / Type / Model" }),
        /* @__PURE__ */ jsx(Input, { value: form.brand_type, onChange: (e) => setForm({
          ...form,
          brand_type: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Jumlah" }),
          /* @__PURE__ */ jsx(Input, { type: "number", required: true, value: form.quantity, onChange: (e) => setForm({
            ...form,
            quantity: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Satuan" }),
          /* @__PURE__ */ jsx(Input, { value: form.unit, onChange: (e) => setForm({
            ...form,
            unit: e.target.value
          }) })
        ] })
      ] }),
      type === "request" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Tanggal PR" }),
          /* @__PURE__ */ jsx(Input, { type: "date", value: form.request_date ?? "", onChange: (e) => setForm({
            ...form,
            request_date: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Tanggal Barang Datang" }),
          /* @__PURE__ */ jsx(Input, { type: "date", value: form.arrival_date ?? "", onChange: (e) => setForm({
            ...form,
            arrival_date: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Keterangan" }),
        /* @__PURE__ */ jsx(Textarea, { value: form.notes, onChange: (e) => setForm({
          ...form,
          notes: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: pending, children: [
        pending && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
        "Simpan"
      ] }) })
    ] })
  ] });
}
export {
  SparePartsPage as component
};

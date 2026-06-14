import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { s as supabase } from "./client-BX8CplE9.js";
import { useState } from "react";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.js";
import { B as Button, I as Input } from "./button-DvaFYl8e.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { D as Dialog, a as DialogTrigger, T as Table, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell, g as DialogContent, h as DialogHeader, i as DialogTitle, j as DialogDescription, k as Textarea, l as DialogFooter } from "./table-DszzeKrc.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.js";
import { P as PageHeader } from "./PageHeader-BuLQaOPw.js";
import { a as useAuth } from "./router-Dd6dDKk7.js";
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
import "@tanstack/react-router";
const TEST_TYPES = {
  genset: {
    label: "Genset",
    fields: [{
      key: "no_unit",
      label: "No Unit"
    }, {
      key: "type_pengujian",
      label: "Type Pengujian"
    }, {
      key: "kebisingan",
      label: "Kebisingan (dB)"
    }, {
      key: "solar_level",
      label: "Solar Level"
    }, {
      key: "frequency",
      label: "Frequency"
    }, {
      key: "voltage",
      label: "Voltage"
    }, {
      key: "engine_stop",
      label: "Engine Stop"
    }]
  },
  ups: {
    label: "UPS",
    fields: [{
      key: "area_unit",
      label: "Area Unit"
    }, {
      key: "type_pengujian",
      label: "Type Pengujian"
    }, {
      key: "frequency",
      label: "Frequency"
    }, {
      key: "voltage_in",
      label: "Voltage In"
    }, {
      key: "voltage_out",
      label: "Voltage Out"
    }, {
      key: "voltage_batteray",
      label: "Voltage Battery"
    }, {
      key: "load_pct",
      label: "Load (%)"
    }, {
      key: "temp",
      label: "Temp"
    }]
  },
  gas_medis: {
    label: "Sistem Gas Medis",
    fields: [{
      key: "pressure_gauge",
      label: "Pressure Gauge"
    }, {
      key: "regulator",
      label: "Regulator"
    }, {
      key: "valve",
      label: "Valve"
    }, {
      key: "safety_valve",
      label: "Safety Valve"
    }, {
      key: "motor_pump",
      label: "Motor Pump"
    }, {
      key: "tangki",
      label: "Tangki Penyimpanan"
    }, {
      key: "pipa",
      label: "Pipa Instalasi"
    }]
  },
  fire_alarm: {
    label: "Sistem Fire Alarm",
    fields: [{
      key: "zona",
      label: "Zona"
    }, {
      key: "smoke_heat",
      label: "Smoke/Heat Detector"
    }, {
      key: "tombol_fire",
      label: "Tombol Fire"
    }, {
      key: "lampu_tanda",
      label: "Lampu Tanda"
    }, {
      key: "display_mcfa",
      label: "Display MCFA"
    }, {
      key: "audio",
      label: "Suara Audio"
    }]
  },
  pompa_pemadam: {
    label: "Pompa Pemadam",
    fields: [{
      key: "pompa",
      label: "Fungsi Pompa"
    }, {
      key: "pressure_gauge",
      label: "Pressure Gauge"
    }, {
      key: "valve",
      label: "Valve"
    }, {
      key: "panel_kontrol",
      label: "Panel Kontrol"
    }]
  },
  fire_shutter: {
    label: "Fire Shutter",
    fields: [{
      key: "rolling",
      label: "Kondisi Rolling"
    }, {
      key: "tombol_control",
      label: "Tombol Control"
    }, {
      key: "dinamo",
      label: "Dinamo"
    }, {
      key: "koneksi_fa",
      label: "Koneksi Fire Alarm"
    }]
  },
  air_bersih: {
    label: "Sistem Air Bersih",
    fields: [{
      key: "level_storage",
      label: "Level Storage Tank"
    }, {
      key: "booster_pump",
      label: "Booster Pump"
    }, {
      key: "otomatis",
      label: "Otomatis Pump"
    }, {
      key: "pressure_gauge",
      label: "Pressure Gauge"
    }, {
      key: "valve",
      label: "Valve-valve"
    }, {
      key: "filter",
      label: "Filter"
    }]
  },
  detector_fire_alarm: {
    label: "Detector Fire Alarm",
    fields: [{
      key: "jenis",
      label: "Jenis Detector"
    }, {
      key: "indikator_led",
      label: "Indikator LED"
    }, {
      key: "tes_fungsi",
      label: "Tes Fungsi"
    }, {
      key: "baterai",
      label: "Status Baterai"
    }]
  }
};
function UtilityTestsPage() {
  const [type, setType] = useState("genset");
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
    queryKey: ["ut", type],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("utility_tests").select("*").eq("test_type", type).order("test_date", {
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
      } = await supabase.from("utility_tests").insert({
        ...form,
        test_type: type,
        created_by: user.id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Pengujian tersimpan");
      qc.invalidateQueries({
        queryKey: ["ut", type]
      });
      setOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const delMut = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("utility_tests").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["ut", type]
    }),
    onError: (e) => toast.error(e.message)
  });
  const cfg = TEST_TYPES[type];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(PageHeader, { title: "Uji Fungsi Sistem Utilitas", description: "Pencatatan hasil pengujian sistem utilitas.", children: [
      /* @__PURE__ */ jsxs(Select, { value: type, onValueChange: setType, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-64", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsx(SelectContent, { children: Object.entries(TEST_TYPES).map(([k, v]) => /* @__PURE__ */ jsx(SelectItem, { value: k, children: v.label }, k)) })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Tambah Pengujian"
        ] }) }),
        /* @__PURE__ */ jsx(TestDialog, { cfg, onSubmit: (f) => createMut.mutate(f), pending: createMut.isPending })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Tanggal" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Teknisi" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Lokasi" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Asset" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Data" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Catatan" }),
        /* @__PURE__ */ jsx(TableHead, { className: "w-16" })
      ] }) }),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        isLoading && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 7, className: "py-10 text-center", children: /* @__PURE__ */ jsx(Loader2, { className: "mx-auto h-5 w-5 animate-spin" }) }) }),
        !isLoading && data.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 7, className: "py-10 text-center text-muted-foreground", children: "Belum ada data." }) }),
        data.map((r) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: r.test_date }),
          /* @__PURE__ */ jsx(TableCell, { children: r.technician ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: r.location ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: r.asset_name ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "max-w-md", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 text-xs", children: Object.entries(r.data ?? {}).slice(0, 4).map(([k, v]) => /* @__PURE__ */ jsxs("span", { className: "rounded bg-muted px-1.5 py-0.5", children: [
            /* @__PURE__ */ jsx("b", { children: k }),
            ": ",
            String(v)
          ] }, k)) }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "max-w-xs truncate", children: r.notes ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: isAdmin && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
            if (confirm("Hapus?")) delMut.mutate(r.id);
          }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
        ] }, r.id))
      ] })
    ] }) }) })
  ] });
}
function TestDialog({
  cfg,
  onSubmit,
  pending
}) {
  const [form, setForm] = useState({
    test_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    technician: "",
    location: "",
    asset_name: "",
    notes: ""
  });
  const [data, setData] = useState({});
  return /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-xl", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { children: [
        "Pengujian ",
        cfg.label
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Isi parameter hasil pengujian." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit({
        ...form,
        data
      });
    }, className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Tanggal" }),
          /* @__PURE__ */ jsx(Input, { type: "date", required: true, value: form.test_date, onChange: (e) => setForm({
            ...form,
            test_date: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Teknisi" }),
          /* @__PURE__ */ jsx(Input, { value: form.technician, onChange: (e) => setForm({
            ...form,
            technician: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Lokasi" }),
          /* @__PURE__ */ jsx(Input, { value: form.location, onChange: (e) => setForm({
            ...form,
            location: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Nama Alat" }),
          /* @__PURE__ */ jsx(Input, { value: form.asset_name, onChange: (e) => setForm({
            ...form,
            asset_name: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded border p-3", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2 text-sm font-medium", children: "Parameter" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: cfg.fields.map((f) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: f.label }),
          /* @__PURE__ */ jsx(Input, { value: data[f.key] ?? "", onChange: (e) => setData({
            ...data,
            [f.key]: e.target.value
          }) })
        ] }, f.key)) })
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
        "Simpan"
      ] }) })
    ] })
  ] });
}
export {
  UtilityTestsPage as component
};

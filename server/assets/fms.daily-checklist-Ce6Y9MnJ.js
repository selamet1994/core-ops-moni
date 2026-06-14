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
import { Download, Plus, Loader2, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";
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
const EQUIPMENTS = [{
  code: "A_GENSET",
  name: "A. Genset",
  params: ["Engine Runing Time G1", "Run Absolute G1", "Total Energy G1 (MWH)", "Engine Runing Time G2", "Run Absolute G2", "Total Energy G2 (MWH)", "PKG 1 Accu Charge Voltage (Normal 25-28 Vp)", "Accu Module Back Up Voltage PKG 1 (Normal 25-28 Vp)", "Status Switch Outgoing & Incoming PKG 1 (Default Auto)", "PKG 2 Accu Charge Voltage (Normal 25-28 Vp)", "Accu Module Back Up Voltage PKG 2 (Normal 25-28 Vp)", "Status Switch Outgoing & Incoming PKG 2 (Default Auto)", "Volume Tangki BBM Solar Genset (Liter)"]
}, {
  code: "B_PUTM",
  name: "B. PUTM (Trafo)",
  params: ["No. Trafo", "Kondisi Exhaust Fan Trafo", "Suhu Trafo (<80 °C)", "Power Summary (P Tot)", "Power Summary (Q Tot)", "Power Summary (S Tot)", "Switch Out Going PLN (ON/TRIP)", "Tegangan Phase R-N (V1)", "Tegangan Phase S-N (V2)", "Tegangan Phase T-N (V3)", "Tegangan Phase R-L (U1)", "Tegangan Phase S-L (U2)", "Tegangan Phase T-L (U3)", "Beban Phase R (Ampere)", "Beban Phase S (Ampere)", "Beban Phase T (Ampere)", "Frequensi (Normal 50 Hz)", "Cos Phi (Normal 0.8-1)", "Kondisi Exaust Fan (Ruangan)", "Temperatur Ruangan (21-30 ºC)", "RH Ruangan (40-60 %)"]
}, {
  code: "C_PUTR",
  name: "C. PUTR",
  params: ["Power Summary Putr 1 (P Tot)", "Power Summary Putr 1 (Q Tot)", "Power Summary Putr 1 (S Tot)", "R THDI % U Putr 1", "S THDI % U Putr 1", "T THDI % U Putr 1", "R THDI % V Putr 1", "S THDI % V Putr 1", "T THDI % V Putr 1", "Frequensi Putr 1 (Hz)", "Cos Phi (PF) Putr 1", "Beban Phase R Putr 1 (Ampere)", "Beban Phase S Putr 1 (Ampere)", "Beban Phase T Putr 1 (Ampere)", "Power Summary Putr 2 (P Tot)", "Power Summary Putr 2 (Q Tot)", "Power Summary Putr 2 (S Tot)", "Tegangan Phase R-N Putr 2", "Tegangan Phase S-N Putr 2", "Tegangan Phase T-N LVMDP 2", "Beban Phase R Putr 2 (Ampere)", "Beban Phase S Putr 2 (Ampere)", "Beban Phase T Putr 2 (Ampere)", "R THDI % U Putr 2", "S THDI % U Putr 2", "T THDI % U Putr 2", "R THDI % V Putr 2", "S THDI % V Putr 2", "T THDI % V Putr 2", "Frequensi Putr 2 (Hz)", "Cos Phi Putr 2", "Temperatur Ruangan (ºC)", "RH Ruangan (%)", "Kondisi Exaust Fan"]
}, {
  code: "D_PLN_METER",
  name: "D. PLN Meter",
  params: ["Power Factor / Cos Phi (Kvar)", "Stand kWh WBP (kWh)", "Selisih kWh WBP", "Stand kWh LWBP (kWh)", "Selisih kWh LWBP", "Stand Total kWh", "Selisih Total kWh", "Total Biaya Listrik", "Stand kWh Kvarh", "Selisih kWh Kvarh"]
}, {
  code: "E_POMPA_SUMPIT",
  name: "E. Pompa Sumpit",
  params: ["Sumpit Pump Grease Trap 1 (On/Off)", "Sumpit Pump Grease Trap 2 (On/Off)", "Sumpit Pump Security 1 (On/Off)", "Sumpit Pump Security 2 (On/Off)", "Sumpit Pump Lobby Lift 1 (On/Off)", "Sumpit Pump Lobby Lift 2 (On/Off)", "Sumpit Pump Mourtuary 1 (On/Off)", "Sumpit Pump Mourtuary 2 (On/Off)", "Sumpit Pump Mushola 1 (On/Off)", "Sumpit Pump Mushola 2 (On/Off)", "Sumpit Pump CSSD 1 (On/Off)", "Sumpit Pump CSSD 2 (On/Off)", "Sumpit Pump GWT 1 (On/Off)", "Sumpit Pump GWT 2 (On/Off)", "Kondisi Keseluruhan", "Catatan"]
}, {
  code: "F_FIRE_PUMP",
  name: "F. Fire Pump",
  params: ["Engineering PIC", "Switch Jockey Pump", "Pressure Jockey Pump (Bar)", "Switch Elektrik Pump", "Pressure Elektrik Pump (Bar)", "Switch Diesel Pump", "Pressure Diesel Pump (Bar)", "Diesel Pump Battery (>12 Volt)", "Diesel Pump Water Level", "Diesel Pump Oil Level", "Level Solar", "Level Air RWT (Pemadam)"]
}, {
  code: "G_CHILLER",
  name: "G. Chiller",
  params: ["Engineering PIC", "Incoming Chiller (kWh)", "Status Chiller 1", "Status Chiller 2", "Status Chiller 3", "Status Chiller 4", "Temp. On 1 CHSW (ºC)", "Temp. On 1 CHWR (ºC)", "Temp. On 2 CHSW (ºC)", "Temp. On 2 CHWR (ºC)", "Operating Hours", "Number of Starts", "Oil Level"]
}, {
  code: "H_AHU_OT",
  name: "H. AHU OT",
  params: ["AHU OT No. (1-4)", "Mode", "ACH", "Temperature (ºC)", "Set Temp (ºC)", "Humidity (%)", "Pressure (Pa)"]
}, {
  code: "I_GWT_PUMP",
  name: "I. GWT Pump",
  params: ["Metering Utama PDAM", "GWT Transfer Pump 1", "GWT Transfer Pump 2", "Level Clean Water Tank (Suction Pit)"]
}, {
  code: "J_SISTEM_RO",
  name: "J. Sistem RO",
  params: ["Engineering PIC", "Tekanan Media Softener (Psi)", "Tekanan Media Carbon 1 (Psi)", "Tekanan Sebelum Filter Cartridge (Psi)", "Tekanan Sesudah Filter Cartridge (Psi)", "System Pressure (Psi)", "Permeate / Produk Flow (ppm)", "Setting Autotrol (ok/tidak)", "Alarm (on/off)", "Metering Input RO", "Metering Output RO", "Volume Storage Tank (%)"]
}, {
  code: "K_HEAT_PUMP",
  name: "K. Heat Pump",
  params: ["Engineering PIC", "Heat Pump 1 (On/Off)", "Temperature Heat Pump 1 (ºC)", "Heat Pump 2 (On/Off)", "Temperature Heat Pump 2 (ºC)", "Distribution Pump 1 (On/Off)", "Pressure Distribution Pump 1 (Kg/cm2)", "Distribution Pump 2 (On/Off)", "Pressure Distribution Pump 2 (Kg/cm2)", "Return Pump 1", "Temperature Return Pump 1 (ºC)", "Pressure Return Pump 1 (Bar)", "Sirkulation Pump 1", "Heater Tank 1", "Return Pump 2", "Temperature Return Pump 2 (ºC)", "Pressure Return Pump 2 (Bar)", "Sirkulation Pump 2", "Heater Tank 2"]
}, {
  code: "L_GAS_MEDIS",
  name: "L. Gas Medis",
  params: ["Volume Oksigen Samator Telemetry", "Tekanan Tangki Samator (bar)", "Tekanan Oksigen (bar)", "Tekanan Medical Air (bar)", "Tekanan Instrumen Air (bar)", "Tekanan Vacum Medik (bar)", "Tekanan Supply CO2 (bar)", "Tekanan N2O (bar)", "Temperatur Ruangan (ºC)", "RH Ruangan (%)", "Kondisi Exaust Fan"]
}, {
  code: "M_UPS",
  name: "M. UPS",
  params: ["UPS Lt. 1 OT - L1 (V)", "UPS Lt. 1 OT - L2 (V)", "UPS Lt. 1 OT - L3 (V)", "UPS Lt. 1 MCCB 1 (Kw)", "UPS Lt. 1 Frequency (Hz)", "UPS Lt. 1 (Normal/Alarm)", "UPS Lt. 1 Battery (Ok/Not Ok)", "UPS Lt. 6 Radiologi L1 (V)", "UPS Lt. 6 Radiologi L2 (V)", "UPS Lt. 6 Radiologi L3 (V)", "UPS Lt. 6 Radiologi MCCB 1 (Kw)", "UPS Lt. 6 Radiologi Frequency (Hz)", "UPS Lt. 6 Radiologi (Normal/Alarm)", "UPS Lt. 6 Battery (Ok/Not Ok)", "Kondisi AC", "Temperatur Ruangan (ºC)", "RH Ruangan (%)"]
}, {
  code: "N_ROOFTANK",
  name: "N. Rooftank",
  params: ["Booster Pump 1 (On/Off)", "Booster Pump 2 (On/Off)", "Metering Roof Water Tank", "Level Volume Tank (%)"]
}, {
  code: "O_IPAL",
  name: "O. IPAL",
  params: ["Pompa Regenerasi", "Pompa Sludge", "Netralisir A", "Netralisir B", "Mix Netralisir (On/Off)", "Kondisi Grease Trap"]
}, {
  code: "P_GAS_LPG",
  name: "P. Gas LPG",
  params: ["Tekanan Tabung LPG Retail (Kg/Cm2)", "Kondisi Leak Detector Gas Retail", "Kondisi Solenoid Gas Retail", "Tekanan Tabung LPG Kitchen (Kg/Cm2)", "Kondisi Leak Detector Gas Kitchen", "Kondisi Solenoid Gas Kitchen", "Kondisi Exaust Fan"]
}, {
  code: "Q_AEROCOM",
  name: "Q. Aerocom",
  params: ["Kondisi Blower 1", "Thermovisi Blower 1"]
}, {
  code: "R_UPS_IT",
  name: "P. UPS IT",
  params: ["UPS Lt. 9 OT - L1 (V)", "UPS Lt. 9 OT - L2 (V)", "UPS Lt. 9 OT - L3 (V)", "UPS Lt. 9 MCCB 1 (Kw)", "UPS Lt. 9 Frequency (Hz)", "UPS Lt. 9 (Normal/Alarm)", "UPS Lt. 9 Battery (Ok/Not Ok)", "Kondisi AC", "Temperatur Ruangan (ºC)", "RH Ruangan (%)"]
}];
function DailyChecklistPage() {
  const [eq, setEq] = useState(EQUIPMENTS[0].code);
  const [month, setMonth] = useState("all");
  const qc = useQueryClient();
  const {
    user,
    isAdmin
  } = useAuth();
  const [open, setOpen] = useState(false);
  const config = EQUIPMENTS.find((e) => e.code === eq);
  const monthOptions = (() => {
    const opts = [];
    const now = /* @__PURE__ */ new Date();
    for (let i = 0; i < 24; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const v = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      opts.push({
        value: v,
        label: d.toLocaleDateString("id-ID", {
          month: "long",
          year: "numeric"
        })
      });
    }
    return opts;
  })();
  const {
    data = [],
    isLoading
  } = useQuery({
    queryKey: ["dc", eq],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("daily_checklists").select("*").eq("equipment_code", eq).order("checked_at", {
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
      } = await supabase.from("daily_checklists").insert({
        ...form,
        equipment_code: eq,
        equipment_name: config.name,
        created_by: user.id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Checklist tersimpan");
      qc.invalidateQueries({
        queryKey: ["dc", eq]
      });
      setOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const delMut = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("daily_checklists").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["dc", eq]
    }),
    onError: (e) => toast.error(e.message)
  });
  const handleDownload = () => {
    let rows = data;
    if (month !== "all") {
      const [y, m] = month.split("-").map(Number);
      rows = rows.filter((r) => {
        const d = new Date(r.checked_at);
        return d.getFullYear() === y && d.getMonth() + 1 === m;
      });
    }
    if (rows.length === 0) {
      toast.error("Tidak ada data untuk diunduh");
      return;
    }
    const sheetData = rows.map((r) => {
      const base = {
        Waktu: new Date(r.checked_at).toLocaleString("id-ID"),
        Shift: r.shift ?? "",
        PIC: r.pic ?? ""
      };
      config.params.forEach((p) => {
        base[p] = r.data?.[p] ?? "";
      });
      base.Remarks = r.remarks ?? "";
      return base;
    });
    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, config.code.slice(0, 30));
    const label = month === "all" ? "all-bulan" : month;
    XLSX.writeFile(wb, `daily-checklist_${config.code}_${label}.xlsx`);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(PageHeader, { title: "Daily Checklist MHKN", description: "Checklist harian peralatan utilitas gedung.", children: [
      /* @__PURE__ */ jsxs(Select, { value: eq, onValueChange: setEq, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-72", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsx(SelectContent, { children: EQUIPMENTS.map((e) => /* @__PURE__ */ jsx(SelectItem, { value: e.code, children: e.name }, e.code)) })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: month, onValueChange: setMonth, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-48", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih bulan" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Semua Bulan" }),
          monthOptions.map((o) => /* @__PURE__ */ jsx(SelectItem, { value: o.value, children: o.label }, o.value))
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: handleDownload, children: [
        /* @__PURE__ */ jsx(Download, { className: "mr-2 h-4 w-4" }),
        "Excel"
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Tambah Checklist"
        ] }) }),
        /* @__PURE__ */ jsx(ChecklistDialog, { config, onSubmit: (f) => createMut.mutate(f), pending: createMut.isPending })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Waktu" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Shift" }),
        /* @__PURE__ */ jsx(TableHead, { children: "PIC" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Parameter" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Remarks" }),
        /* @__PURE__ */ jsx(TableHead, { className: "w-16" })
      ] }) }),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        isLoading && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 6, className: "py-10 text-center", children: /* @__PURE__ */ jsx(Loader2, { className: "mx-auto h-5 w-5 animate-spin" }) }) }),
        !isLoading && data.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 6, className: "py-10 text-center text-muted-foreground", children: "Belum ada data." }) }),
        data.map((r) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "text-xs", children: new Date(r.checked_at).toLocaleString("id-ID") }),
          /* @__PURE__ */ jsx(TableCell, { children: r.shift ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: r.pic ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "max-w-md", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 text-xs", children: Object.entries(r.data ?? {}).slice(0, 4).map(([k, v]) => /* @__PURE__ */ jsxs("span", { className: "rounded bg-muted px-1.5 py-0.5", children: [
            /* @__PURE__ */ jsx("b", { children: k }),
            ": ",
            String(v)
          ] }, k)) }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "max-w-xs truncate", children: r.remarks ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: isAdmin && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
            if (confirm("Hapus?")) delMut.mutate(r.id);
          }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
        ] }, r.id))
      ] })
    ] }) }) })
  ] });
}
function ChecklistDialog({
  config,
  onSubmit,
  pending
}) {
  const [form, setForm] = useState({
    checked_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16),
    shift: "Shift 1",
    pic: "",
    remarks: ""
  });
  const [data, setData] = useState({});
  return /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-xl", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { children: [
        "Checklist — ",
        config.name
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Catat pembacaan harian." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit({
        ...form,
        checked_at: new Date(form.checked_at).toISOString(),
        data
      });
    }, className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Waktu" }),
          /* @__PURE__ */ jsx(Input, { type: "datetime-local", required: true, value: form.checked_at, onChange: (e) => setForm({
            ...form,
            checked_at: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "Shift" }),
          /* @__PURE__ */ jsxs(Select, { value: form.shift, onValueChange: (v) => setForm({
            ...form,
            shift: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: ["Shift 1", "Shift 2", "Shift 3"].map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s, children: s }, s)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { children: "PIC" }),
          /* @__PURE__ */ jsx(Input, { value: form.pic, onChange: (e) => setForm({
            ...form,
            pic: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded border p-3", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2 text-sm font-medium", children: "Parameter" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: config.params.map((p) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: p }),
          /* @__PURE__ */ jsx(Input, { value: data[p] ?? "", onChange: (e) => setData({
            ...data,
            [p]: e.target.value
          }) })
        ] }, p)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Remarks" }),
        /* @__PURE__ */ jsx(Textarea, { value: form.remarks, onChange: (e) => setForm({
          ...form,
          remarks: e.target.value
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
  DailyChecklistPage as component
};

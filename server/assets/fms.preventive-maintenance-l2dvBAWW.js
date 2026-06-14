import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-BX8CplE9.js";
import * as React from "react";
import { useRef, useState, useEffect, useMemo } from "react";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle, c as CardDescription } from "./card-DQ5v2DYb.js";
import { B as Button, I as Input } from "./button-DvaFYl8e.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { D as Dialog, g as DialogContent, h as DialogHeader, i as DialogTitle, j as DialogDescription, k as Textarea, l as DialogFooter, a as DialogTrigger, T as Table, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell } from "./table-DszzeKrc.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.js";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, ScanLine, Loader2, Eraser, Camera, X, Download, Printer, FileText, Plus, Save, CheckCircle2, ClipboardList, Search, Eye, Trash2, CalendarDays } from "lucide-react";
import { c as cn } from "./utils-H80jjgLf.js";
import { P as PageHeader } from "./PageHeader-BuLQaOPw.js";
import { S as StatusBadge } from "./StatusBadge-BIXlzpUh.js";
import { a as useAuth } from "./router-Dd6dDKk7.js";
import { toast } from "sonner";
import { Html5Qrcode } from "html5-qrcode";
import { QRCodeCanvas } from "qrcode.react";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "@radix-ui/react-select";
import "@radix-ui/react-tabs";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-router";
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const PM_CATALOG = [
  // ===== MEP — Form PM (Master) =====
  {
    code: "GENSET",
    name: "Genset",
    group: "MEP",
    period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit",
      "Pengecekan kondisi oli",
      "Pemeriksaan accu",
      "Pemeriksaan charger battery/accu",
      "Pengecekan air radiator",
      "Pengecekan filter udara",
      "Pengecekan filter oli",
      "Pengecekan filter solar",
      "Pengecekan roda / bantalan",
      "Pemeriksaan AMF (Automatic Main Failure)",
      "Pengecekan terminasi kabel kontrol",
      "Pengecekan tombol pengaman / emergency",
      "Pengecekan mur, baut, clip dan mounting",
      "Warming genset",
      "Engine RPM",
      "Service meter",
      "Generator frekuensi",
      "Battery",
      "Battery charger",
      "Pressure olie (Psi)"
    ]
  },
  {
    code: "UPS",
    name: "UPS",
    group: "MEP",
    period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit UPS",
      "Pengecekan terminasi panel UPS",
      "Pengecekan terminasi koneksi UPS",
      "Pengecekan terminasi koneksi battery",
      "Pemeriksaan display control UPS",
      "Pemeriksaan fan UPS",
      "Pengecekan selector switch",
      "Pengecekan push button",
      "Pengecekan pilot lamp",
      "Pengecekan kabel instalasi",
      "Pemeriksaan panel UPS",
      "Perawatan kebersihan panel UPS",
      "AC In",
      "AC Out",
      "Frequency",
      "Load",
      "Volt battery",
      "Temperatur"
    ]
  },
  {
    code: "POMPA",
    name: "Pompa",
    group: "MEP",
    period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit",
      "Pengecekan terminasi panel pompa",
      "Pemeriksaan bearing pompa",
      "Pengecekan valve pompa",
      "Pengecekan gearbox pompa",
      "Pengecekan strainer",
      "Pengecekan pressure gauge",
      "Pengecekan fan pompa",
      "Pemeriksaan panel kontrol pompa",
      "Pengecekan selector switch",
      "Pengecekan pilot lamp",
      "Pengecekan kabel instalasi",
      "Tegangan R-N",
      "Tegangan S-N",
      "Tegangan T-N",
      "Tegangan R-S",
      "Tegangan R-T",
      "Tegangan S-T",
      "Ampere R",
      "Ampere S",
      "Ampere T",
      "Pengecekan TOR pompa"
    ]
  },
  {
    code: "PNEUMATIC_TUBE",
    name: "Pneumatic Tube",
    group: "MEP",
    period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit",
      "Pengecekan motor listrik",
      "Pengecekan sensor",
      "Pengecekan jalur rel penggerak",
      "Pemeriksaan PCB main board",
      "Pemeriksaan konektor PCB",
      "Pengecekan layar monitor",
      "Pengecekan seal packing",
      "Pengecekan tombol keypad",
      "Pengecekan alarm sensor",
      "Pengecekan pipa instalasi",
      "Pengecekan tabung carrier",
      "Pengecekan keranjang carrier",
      "Pengecekan rak carrier",
      "Cek tegangan input PCB"
    ]
  },
  {
    code: "FIRE_ALARM",
    name: "Fire Alarm",
    group: "MEP",
    period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit",
      "Pemeriksaan smoke detector",
      "Pemeriksaan zona-zona",
      "Pemeriksaan hydrant",
      "Pemeriksaan panel fire alarm",
      "Instalasi pengkabelan",
      "Pemeriksaan zona panel",
      "Tegangan R-N",
      "Tegangan S-N",
      "Tegangan T-N",
      "Tegangan R-S",
      "Tegangan R-T",
      "Tegangan S-T",
      "Ampere operasional"
    ]
  },
  {
    code: "SOUND_SYSTEM",
    name: "Sound System",
    group: "MEP",
    period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit",
      "Pemeriksaan amplifier",
      "Pemeriksaan speaker",
      "Pemeriksaan instalasi pengkabelan",
      "Pemeriksaan microphone",
      "Pemeriksaan volume"
    ]
  },
  {
    code: "CHILLER",
    name: "Chiller",
    group: "MEP",
    period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit",
      "Pengecekan pipa instalasi water chiller",
      "Pengecekan strainer",
      "Pengecekan pressure gauge",
      "Pengecekan fan",
      "Pengecekan motorise",
      "Pengecekan flow switch",
      "Pengecekan filter dryer",
      "Pengecekan evaporator",
      "Pengecekan condensor",
      "Pengecekan compresor",
      "Pengecekan expansion valve",
      "Pengecekan PHE-shell & tube",
      "Pengecekan panel kontrol",
      "Pengecekan display chiller",
      "Phase R-S",
      "Phase R-T",
      "Phase S-T",
      "Phase R-N",
      "Phase S-N",
      "Phase T-N",
      "Phase-R COM1/2/3",
      "Phase-S COM1/2/3",
      "Phase-T COM1/2/3",
      "Phase-R FAN1/2/3",
      "Phase-S FAN1/2/3",
      "Phase-T FAN1/2/3",
      "Temperatur In",
      "Temperatur Out",
      "Pressure water in",
      "Low pressure COM1/2/3 (Freon)",
      "High pressure COM1/2/3 (Freon)"
    ]
  },
  {
    code: "EXHAUST_FAN",
    name: "Exhaust Fan",
    group: "MEP",
    period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit",
      "Pengecekan motor fan",
      "Pemeriksaan bearing",
      "Pengecekan ducting",
      "Pengecekan membran",
      "Pengecekan kabel instalasi",
      "Pengecekan terminal sambungan",
      "Pengecekan baling-baling fan",
      "Pemeriksaan mounting",
      "Pengecekan vanbelt",
      "Tegangan R-N / S-N / T-N",
      "Tegangan R-S / R-T / S-T",
      "Ampere R / S / T"
    ]
  },
  {
    code: "WATER_HEATER",
    name: "Water Heater",
    group: "MEP",
    period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit",
      "Pemeriksaan panel control",
      "Pemeriksaan tangki",
      "Pemeriksaan remote control",
      "Pemeriksaan instalasi pemipaan",
      "Pemeriksaan compressor",
      "Tegangan R-N / S-N / T-N",
      "Tegangan R-S / R-T / S-T",
      "Ampere operasional",
      "Tekanan freon HP",
      "Tekanan freon LP"
    ]
  },
  {
    code: "REVERSE_OSMOSIS",
    name: "Reverse Osmosis (RO)",
    group: "MEP",
    period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit",
      "Pengecekan terminasi panel pompa",
      "Pemeriksaan bearing pompa",
      "Pengecekan valve pompa",
      "Pengecekan gearbox pompa",
      "Pengecekan filter-filter",
      "Pengecekan pressure gauge",
      "Pengecekan fan pompa",
      "Pemeriksaan tank air baku",
      "Pemeriksaan tank air produk",
      "Pengecekan lampu UV",
      "Pengecekan LPM",
      "Pemeriksaan indikator air",
      "Tegangan R-N / S-N / T-N",
      "Tegangan R-S / R-T / S-T",
      "Ampere operasional"
    ]
  },
  // ===== HVAC — AC (Bulanan) =====
  {
    code: "AC_HVAC",
    name: "AC / HVAC (per unit)",
    group: "HVAC",
    period: "Bulanan",
    checklist: [
      "Cek fungsi remote kontrol / thermostat (Normal/Error)",
      "Cek fungsi kontrol BAS (Normal/Error)",
      "Cek temperatur CWS dan CWR (°C)",
      "Cek strainer (Clean/Dirty)",
      "Motorize valve (Open/Close)",
      "Cek fan",
      "Cek fan vibration / belt",
      "Cek kebisingan (<40 dB)",
      "Cek kondisi cooling coil / evaporator",
      "Cek kondisi filter (Clean/Dirty)",
      "Cleaning housing dan support",
      "Cek kondisi insulation",
      "Cek panel kontrol",
      "Cleaning drain (Ya/Tidak)",
      "Tegangan R-N / S-N / T-N",
      "Tegangan R-S / R-T / S-T",
      "Ampere R / S / T",
      "Air flow (m/s)"
    ]
  },
  // ===== PANEL (Bulanan / 2 Bulan) =====
  {
    code: "PANEL_LISTRIK",
    name: "Panel Listrik (LVMDP/SDP/PP)",
    group: "PANEL",
    period: "Bulanan / 2 Bulan",
    checklist: [
      "Voltage R-S (395V ≤ 380V ≥ 365V)",
      "Voltage S-T (395V ≤ 380V ≥ 365V)",
      "Voltage R-T (395V ≤ 380V ≥ 365V)",
      "Voltage R-N (235V ≤ 220V ≥ 205V)",
      "Voltage S-N (235V ≤ 220V ≥ 205V)",
      "Voltage T-N (235V ≤ 220V ≥ 205V)",
      "Ampere R (max 80%)",
      "Ampere S (max 80%)",
      "Ampere T (max 80%)",
      "Ampere N (must be 0)",
      "Ampere Ground (must be 0)",
      "Temp kabel R/S/T/N (<50°C)",
      "Temp kontaktor (<50°C)",
      "Tahanan ground to body (<5 ohm)",
      "Kunci panel (ada/tidak)",
      "Bekas terbakar (ada/tidak)",
      "Kekencangan baut / cable shoe / lug",
      "Body panel (bersih/kotor)",
      "Lampu pilot (berfungsi/tidak)",
      "Push button (berfungsi/tidak)",
      "Selector switch (berfungsi/tidak)",
      "Exhaust panel (berfungsi/tidak)",
      "Kebersihan panel (bersih/kotor)",
      "Catatan & kesimpulan"
    ]
  },
  // ===== LIFT (MEP Schedule) =====
  {
    code: "LIFT",
    name: "Lift (Passenger / Service / Bersih)",
    group: "LIFT",
    period: "Bulanan",
    checklist: [
      "Pemeriksaan motor traksi & gearbox",
      "Pemeriksaan tali baja (rope) & pulley",
      "Pemeriksaan brake / rem",
      "Pemeriksaan rail & roller guide",
      "Pemeriksaan door operator & sensor pintu",
      "Pemeriksaan car panel & COP (Car Operating Panel)",
      "Pemeriksaan hall panel / HOP tiap lantai",
      "Pemeriksaan kabel travelling & limit switch",
      "Pemeriksaan governor & safety gear",
      "Pemeriksaan emergency lamp & interphone",
      "Pemeriksaan lighting kabin",
      "Pelumasan komponen bergerak",
      "Test running naik / turun seluruh lantai",
      "Catatan tindakan & analisa kerusakan"
    ]
  }
];
const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
];
const _DATA = [
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-060",
    "name": "Pompa filter A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-061",
    "name": "Pompa filter B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-062",
    "name": "Pompa cadridge A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-063",
    "name": "Pompa cadridge B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-064",
    "name": "Pompa High pressure A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-065",
    "name": "Pompa High pressure B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-066",
    "name": "Pompa dosing ACID",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-067",
    "name": "Pompa dosing biocide",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-068",
    "name": "Pompa softener A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-069",
    "name": "Pompa softener B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-070",
    "name": "Pompa distribusi A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-071",
    "name": "Pompa distribusi B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-072",
    "name": "Pompa Filter 1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-073",
    "name": "Pompa Filter 1 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-074",
    "name": "Pompa tranfer A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-075",
    "name": "Pompa tranfer B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-076",
    "name": "Pompa filter 2 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-077",
    "name": "Pompa filter 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-078",
    "name": "Pompa distribusi 2 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-079",
    "name": "Pompa distribusi 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-083",
    "name": "Sound System Gedung",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-084",
    "name": "Sound System Paging (Car Call)",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Januari",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-014",
    "name": "Chiller Water Pump ( CHWP ) 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-015",
    "name": "Chiller Water Pump ( CHWP ) 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-016",
    "name": "Chiller Water Pump ( CHWP ) 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-017",
    "name": "Chiller Water Pump ( CHWP ) 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-018",
    "name": "Chiller Water Pump ( CHWP ) 5",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-019",
    "name": "UPS (OT 1)",
    "location": "KORIDOR OT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-020",
    "name": "UPS (OT 2)",
    "location": "KORIDOR OT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-021",
    "name": "UPS ( MRI, CT-Scan, Flouroscopy, X-Ray )",
    "location": "LANTAI 6",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-022",
    "name": "UPS (1,2,3,5,6,7,8)",
    "location": "LANTAI 9",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-023",
    "name": "UPS (IT)",
    "location": "LANTAI 9",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-024",
    "name": "UPS (R. Mesin Cathlab)",
    "location": "R. MESIN CATHLAB LT. 6",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-025",
    "name": "GWT Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-026",
    "name": "GWT Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-027",
    "name": "pompa hydrant Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-028",
    "name": "pompa hydrant Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-029",
    "name": "Mortuary sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-030",
    "name": "Mortuary sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-031",
    "name": "CSSD sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-032",
    "name": "CSSD sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-033",
    "name": "Musholla sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-034",
    "name": "Musholla sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-035",
    "name": "Pos Security Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-036",
    "name": "Pos Security Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-037",
    "name": "Pompa Taman B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-038",
    "name": "Geastrape A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-039",
    "name": "Geastrape B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-040",
    "name": "STP A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-041",
    "name": "STP B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-042",
    "name": "Netralisir A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-043",
    "name": "Netralisir B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-044",
    "name": "Pompa transfer GWT 1",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-045",
    "name": "Pompa transfer GWT 2",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-056",
    "name": "Genset 1",
    "location": "LANTAI 1",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-057",
    "name": "Genset 2",
    "location": "LANTAI 1",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-080",
    "name": "Pompa Jockey",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-081",
    "name": "Pompa Electric",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-082",
    "name": "Pompa Diesel",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Februari",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-046",
    "name": "Pompa boster 1",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-047",
    "name": "Pompa boster 2",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-048",
    "name": "Pompa boster 3",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-049",
    "name": "Heat pump 1",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-050",
    "name": "Heat pump 2",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-051",
    "name": "Heat pump 3",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-052",
    "name": "Pompa Sirkulasi  1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-053",
    "name": "Pompa Sirkulasi  2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-054",
    "name": "Pompa Sirkulasi 1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-055",
    "name": "Pompa Sirkulasi 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-058",
    "name": "MM JUS Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-059",
    "name": "MM JUS Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Maret",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-060",
    "name": "Pompa filter A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-061",
    "name": "Pompa filter B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-062",
    "name": "Pompa cadridge A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-063",
    "name": "Pompa cadridge B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-064",
    "name": "Pompa High pressure A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-065",
    "name": "Pompa High pressure B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-066",
    "name": "Pompa dosing ACID",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-067",
    "name": "Pompa dosing biocide",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-068",
    "name": "Pompa softener A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-069",
    "name": "Pompa softener B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-070",
    "name": "Pompa distribusi A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-071",
    "name": "Pompa distribusi B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-072",
    "name": "Pompa Filter 1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-073",
    "name": "Pompa Filter 1 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-074",
    "name": "Pompa tranfer A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-075",
    "name": "Pompa tranfer B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-076",
    "name": "Pompa filter 2 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-077",
    "name": "Pompa filter 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-078",
    "name": "Pompa distribusi 2 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-079",
    "name": "Pompa distribusi 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-083",
    "name": "Sound System Gedung",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-084",
    "name": "Sound System Paging (Car Call)",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "April",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-014",
    "name": "Chiller Water Pump ( CHWP ) 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-015",
    "name": "Chiller Water Pump ( CHWP ) 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-016",
    "name": "Chiller Water Pump ( CHWP ) 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-017",
    "name": "Chiller Water Pump ( CHWP ) 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-018",
    "name": "Chiller Water Pump ( CHWP ) 5",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-019",
    "name": "UPS (OT 1)",
    "location": "KORIDOR OT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-020",
    "name": "UPS (OT 2)",
    "location": "KORIDOR OT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-021",
    "name": "UPS ( MRI, CT-Scan, Flouroscopy, X-Ray )",
    "location": "LANTAI 6",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-022",
    "name": "UPS (1,2,3,5,6,7,8)",
    "location": "LANTAI 9",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-023",
    "name": "UPS (IT)",
    "location": "LANTAI 9",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-024",
    "name": "UPS (R. Mesin Cathlab)",
    "location": "R. MESIN CATHLAB LT. 6",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-025",
    "name": "GWT Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-026",
    "name": "GWT Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-027",
    "name": "pompa hydrant Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-028",
    "name": "pompa hydrant Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-029",
    "name": "Mortuary sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-030",
    "name": "Mortuary sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-031",
    "name": "CSSD sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-032",
    "name": "CSSD sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-033",
    "name": "Musholla sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-034",
    "name": "Musholla sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-035",
    "name": "Pos Security Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-036",
    "name": "Pos Security Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-037",
    "name": "Pompa Taman B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-038",
    "name": "Geastrape A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-039",
    "name": "Geastrape B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-040",
    "name": "STP A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-041",
    "name": "STP B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-042",
    "name": "Netralisir A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-043",
    "name": "Netralisir B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-044",
    "name": "Pompa transfer GWT 1",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-045",
    "name": "Pompa transfer GWT 2",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-056",
    "name": "Genset 1",
    "location": "LANTAI 1",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-057",
    "name": "Genset 2",
    "location": "LANTAI 1",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-080",
    "name": "Pompa Jockey",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-081",
    "name": "Pompa Electric",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-082",
    "name": "Pompa Diesel",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Mei",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-046",
    "name": "Pompa boster 1",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-047",
    "name": "Pompa boster 2",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-048",
    "name": "Pompa boster 3",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-049",
    "name": "Heat pump 1",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-050",
    "name": "Heat pump 2",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-051",
    "name": "Heat pump 3",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-052",
    "name": "Pompa Sirkulasi  1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-053",
    "name": "Pompa Sirkulasi  2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-054",
    "name": "Pompa Sirkulasi 1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-055",
    "name": "Pompa Sirkulasi 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-058",
    "name": "MM JUS Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-059",
    "name": "MM JUS Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juni",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-060",
    "name": "Pompa filter A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-061",
    "name": "Pompa filter B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-062",
    "name": "Pompa cadridge A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-063",
    "name": "Pompa cadridge B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-064",
    "name": "Pompa High pressure A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-065",
    "name": "Pompa High pressure B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-066",
    "name": "Pompa dosing ACID",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-067",
    "name": "Pompa dosing biocide",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-068",
    "name": "Pompa softener A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-069",
    "name": "Pompa softener B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-070",
    "name": "Pompa distribusi A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-071",
    "name": "Pompa distribusi B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-072",
    "name": "Pompa Filter 1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-073",
    "name": "Pompa Filter 1 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-074",
    "name": "Pompa tranfer A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-075",
    "name": "Pompa tranfer B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-076",
    "name": "Pompa filter 2 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-077",
    "name": "Pompa filter 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-078",
    "name": "Pompa distribusi 2 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-079",
    "name": "Pompa distribusi 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-083",
    "name": "Sound System Gedung",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-084",
    "name": "Sound System Paging (Car Call)",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Juli",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-014",
    "name": "Chiller Water Pump ( CHWP ) 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-015",
    "name": "Chiller Water Pump ( CHWP ) 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-016",
    "name": "Chiller Water Pump ( CHWP ) 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-017",
    "name": "Chiller Water Pump ( CHWP ) 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-018",
    "name": "Chiller Water Pump ( CHWP ) 5",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-019",
    "name": "UPS (OT 1)",
    "location": "KORIDOR OT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-020",
    "name": "UPS (OT 2)",
    "location": "KORIDOR OT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-021",
    "name": "UPS ( MRI, CT-Scan, Flouroscopy, X-Ray )",
    "location": "LANTAI 6",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-022",
    "name": "UPS (1,2,3,5,6,7,8)",
    "location": "LANTAI 9",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-023",
    "name": "UPS (IT)",
    "location": "LANTAI 9",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-024",
    "name": "UPS (R. Mesin Cathlab)",
    "location": "R. MESIN CATHLAB LT. 6",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-025",
    "name": "GWT Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-026",
    "name": "GWT Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-027",
    "name": "pompa hydrant Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-028",
    "name": "pompa hydrant Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-029",
    "name": "Mortuary sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-030",
    "name": "Mortuary sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-031",
    "name": "CSSD sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-032",
    "name": "CSSD sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-033",
    "name": "Musholla sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-034",
    "name": "Musholla sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-035",
    "name": "Pos Security Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-036",
    "name": "Pos Security Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-037",
    "name": "Pompa Taman B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-038",
    "name": "Geastrape A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-039",
    "name": "Geastrape B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-040",
    "name": "STP A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-041",
    "name": "STP B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-042",
    "name": "Netralisir A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-043",
    "name": "Netralisir B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-044",
    "name": "Pompa transfer GWT 1",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-045",
    "name": "Pompa transfer GWT 2",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-056",
    "name": "Genset 1",
    "location": "LANTAI 1",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-057",
    "name": "Genset 2",
    "location": "LANTAI 1",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-080",
    "name": "Pompa Jockey",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-081",
    "name": "Pompa Electric",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-082",
    "name": "Pompa Diesel",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Agustus",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-046",
    "name": "Pompa boster 1",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-047",
    "name": "Pompa boster 2",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-048",
    "name": "Pompa boster 3",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-049",
    "name": "Heat pump 1",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-050",
    "name": "Heat pump 2",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-051",
    "name": "Heat pump 3",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-052",
    "name": "Pompa Sirkulasi  1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-053",
    "name": "Pompa Sirkulasi  2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-054",
    "name": "Pompa Sirkulasi 1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-055",
    "name": "Pompa Sirkulasi 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-058",
    "name": "MM JUS Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-059",
    "name": "MM JUS Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "September",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-060",
    "name": "Pompa filter A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-061",
    "name": "Pompa filter B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-062",
    "name": "Pompa cadridge A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-063",
    "name": "Pompa cadridge B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-064",
    "name": "Pompa High pressure A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-065",
    "name": "Pompa High pressure B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-066",
    "name": "Pompa dosing ACID",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-067",
    "name": "Pompa dosing biocide",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-068",
    "name": "Pompa softener A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-069",
    "name": "Pompa softener B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-070",
    "name": "Pompa distribusi A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-071",
    "name": "Pompa distribusi B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-072",
    "name": "Pompa Filter 1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-073",
    "name": "Pompa Filter 1 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-074",
    "name": "Pompa tranfer A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-075",
    "name": "Pompa tranfer B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-076",
    "name": "Pompa filter 2 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-077",
    "name": "Pompa filter 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-078",
    "name": "Pompa distribusi 2 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-079",
    "name": "Pompa distribusi 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-083",
    "name": "Sound System Gedung",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-084",
    "name": "Sound System Paging (Car Call)",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Oktober",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-014",
    "name": "Chiller Water Pump ( CHWP ) 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-015",
    "name": "Chiller Water Pump ( CHWP ) 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-016",
    "name": "Chiller Water Pump ( CHWP ) 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-017",
    "name": "Chiller Water Pump ( CHWP ) 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-018",
    "name": "Chiller Water Pump ( CHWP ) 5",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-019",
    "name": "UPS (OT 1)",
    "location": "KORIDOR OT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-020",
    "name": "UPS (OT 2)",
    "location": "KORIDOR OT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-021",
    "name": "UPS ( MRI, CT-Scan, Flouroscopy, X-Ray )",
    "location": "LANTAI 6",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-022",
    "name": "UPS (1,2,3,5,6,7,8)",
    "location": "LANTAI 9",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-023",
    "name": "UPS (IT)",
    "location": "LANTAI 9",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-024",
    "name": "UPS (R. Mesin Cathlab)",
    "location": "R. MESIN CATHLAB LT. 6",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-025",
    "name": "GWT Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-026",
    "name": "GWT Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-027",
    "name": "pompa hydrant Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-028",
    "name": "pompa hydrant Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-029",
    "name": "Mortuary sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-030",
    "name": "Mortuary sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-031",
    "name": "CSSD sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-032",
    "name": "CSSD sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-033",
    "name": "Musholla sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-034",
    "name": "Musholla sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-035",
    "name": "Pos Security Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-036",
    "name": "Pos Security Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-037",
    "name": "Pompa Taman B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-038",
    "name": "Geastrape A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-039",
    "name": "Geastrape B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-040",
    "name": "STP A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-041",
    "name": "STP B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-042",
    "name": "Netralisir A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-043",
    "name": "Netralisir B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-044",
    "name": "Pompa transfer GWT 1",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-045",
    "name": "Pompa transfer GWT 2",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-056",
    "name": "Genset 1",
    "location": "LANTAI 1",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-057",
    "name": "Genset 2",
    "location": "LANTAI 1",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-080",
    "name": "Pompa Jockey",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-081",
    "name": "Pompa Electric",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-082",
    "name": "Pompa Diesel",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "November",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-001",
    "name": "(Lift passanger A)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-002",
    "name": "(Lift passanger B)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Mitsubishi)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-003",
    "name": "(Lift passanger C)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-004",
    "name": "(Lift passanger D)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-005",
    "name": "(Lift passanger E)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-006",
    "name": "(Lift Service kotor)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-007",
    "name": "(Lift bersih)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-008",
    "name": "(Lift bed kuning)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-009",
    "name": "(Lift bed biru)",
    "location": "LANTAI 10",
    "periode": "1 Bulan (Kone)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-010",
    "name": "Chiller 1",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-011",
    "name": "Chiller 2",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-012",
    "name": "Chiller 3",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-013",
    "name": "Chiller 4",
    "location": "LANTAI 10",
    "periode": "1 Bulan (PT JTI)"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-046",
    "name": "Pompa boster 1",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-047",
    "name": "Pompa boster 2",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-048",
    "name": "Pompa boster 3",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-049",
    "name": "Heat pump 1",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-050",
    "name": "Heat pump 2",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-051",
    "name": "Heat pump 3",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-052",
    "name": "Pompa Sirkulasi  1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-053",
    "name": "Pompa Sirkulasi  2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-054",
    "name": "Pompa Sirkulasi 1 A",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-055",
    "name": "Pompa Sirkulasi 2 B",
    "location": "LANTAI 10",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-058",
    "name": "MM JUS Sumpit B",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-059",
    "name": "MM JUS Sumpit A",
    "location": "BESMENT",
    "periode": "Periode 3 Bulan"
  },
  {
    "group": "MEP",
    "month": "Desember",
    "code": "MEP-MHKN-085",
    "name": "MCFA",
    "location": "LANTAI 1",
    "periode": "Periode 1 Bulan"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-B.01",
    "name": "AHU AHU-B.01",
    "location": "BS / R.Jenazah",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-B.02",
    "name": "AHU AHU-B.02",
    "location": "BS / CSSD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-B.03",
    "name": "AHU AHU-B.03",
    "location": "BS / Gudang kitchen",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-B.04",
    "name": "AHU AHU-B.04",
    "location": "BS / R.FMS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-B.01",
    "name": "SPLIT  IU-B.01",
    "location": "BS / AC Split R. jenazah",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-B.02",
    "name": "SPLIT DUCT IU-B.02",
    "location": "BS / LVMDP",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-B.03",
    "name": "SPLIT  IU-B.03",
    "location": "BS / LVMDP",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-B.04",
    "name": "SPLIT  IU-B.04",
    "location": "BS / Subserver",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-B.05",
    "name": "SPLIT  IU-B.05",
    "location": "BS / Rekam medice",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-B.06",
    "name": "SPLIT  IU-B.06",
    "location": "BS / R. SJS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-B.07",
    "name": "SPLIT  IU-B.07",
    "location": "BS / TPS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-B.08",
    "name": "SPLIT  IU-B.08",
    "location": "BS / R. sampah medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-B.09",
    "name": "SPLIT  IU-B.09",
    "location": "BS / R.PKG",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-B.10",
    "name": "SPLIT  IU-B.10",
    "location": "BS / Mushola",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-B.11",
    "name": "SPLIT  IU-B.11",
    "location": "BS / R. sampah non medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.01",
    "name": "AHU AHU-1.01",
    "location": "LT.1 / Lobby utama",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.02",
    "name": "AHU AHU-1.02",
    "location": "LT.1 / R.post operasi OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.03",
    "name": "AHU AHU-1.03",
    "location": "LT.1 / koridor lobby",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.04",
    "name": "AHU AHU-1.04",
    "location": "LT.1 / IGD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.05",
    "name": "AHU AHU-1.05",
    "location": "LT.1 / Lobby kasir",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.06",
    "name": "AHU AHU-1.06",
    "location": "LT.1 / R.Konsultasi",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.07",
    "name": "AHU AHU-1.07",
    "location": "LT.1 / Endoscopy",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.08",
    "name": "AHU AHU-1.08",
    "location": "LT.1 / Koridor UPS OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.09",
    "name": "AHU AHU-1.09",
    "location": "LT.1 / Tahta",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.10",
    "name": "AHU  AHU-1.10",
    "location": "LT.1 / NS IGD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.11",
    "name": "AHU  AHU-1.11",
    "location": "LT.1 / Poly TNC",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-1.12",
    "name": "AHU  AHU-1.12",
    "location": "LT.1 / Koridor OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-1.01",
    "name": "SPLIT  IU-1.01",
    "location": "LT.1 / TNC dr.andri",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-1.02",
    "name": "SPLIT  IU-1.02",
    "location": "LT.1 / Subserver",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-1.03",
    "name": "AC IU-1.03",
    "location": "LT.1 / Pain management",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-2.01",
    "name": "AHU  AHU-2.01",
    "location": "LT.2 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-2.02",
    "name": "AHU  AHU-2.02",
    "location": "LT.2 / X Ray",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-2.03",
    "name": "AHU  AHU-2.03",
    "location": "LT.2 / CT Scan",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-2.04",
    "name": "AHU  AHU-2.04",
    "location": "LT.2 / Flouroscopy",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-2.05",
    "name": "AHU  AHU-2.05",
    "location": "LT.2 / Poly mata",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-2.06",
    "name": "AHU  AHU-2.06",
    "location": "LT.2 / Ruangan 08",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-2.07",
    "name": "AHU  AHU-2.07",
    "location": "LT.2 / Ruangan 07",
    "periode": "3BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "IU-2.01",
    "name": "SPLIT D IU-2.01",
    "location": "LT.2 / MRI",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-2.08",
    "name": "AHU  AHU-2.08",
    "location": "LT.2 / Dining room",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Januari",
    "code": "AHU-2.09",
    "name": "AHU  AHU-2.09",
    "location": "LT.2 / Poly lt.2",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-2.10",
    "name": "AHU  AHU-2.10",
    "location": "LT.2 / Mammo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-2.11",
    "name": "AHU  AHU-2.11",
    "location": "LT.2 / NS MCU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-3.01",
    "name": "AHU  AHU-3.01",
    "location": "LT.3 / Depan poly no.5",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-3.02",
    "name": "AHU  AHU-3.02",
    "location": "LT.3 / Poly lantai 3",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-3.03",
    "name": "AHU  AHU-3.03",
    "location": "LT.3 / LAB",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-3.04",
    "name": "AHU  AHU-3.04",
    "location": "LT.3 / Farmasi",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-3.05",
    "name": "AHU  AHU-3.05",
    "location": "LT.3 / Sport medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-3.06",
    "name": "AHU  AHU-3.06",
    "location": "LT.3 / NS sport medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-3.07",
    "name": "AHU  AHU-3.07",
    "location": "LT.3 / Koridor lantai 3",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.01",
    "name": "AHU  AHU-5.01",
    "location": "LT.5 / 5001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.02",
    "name": "AHU  AHU-5.02",
    "location": "LT.5 / 5002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.03",
    "name": "AHU  AHU-5.03",
    "location": "LT.5 / 5003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.04",
    "name": "AHU  AHU-5.04",
    "location": "LT.5 / 5005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.05",
    "name": "AHU  AHU-5.05",
    "location": "LT.5 / 5006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.06",
    "name": "AHU  AHU-5.06",
    "location": "LT.5 / 5007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.07",
    "name": "AHU  AHU-5.07",
    "location": "LT.5 / 5008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.08",
    "name": "AHU  AHU-5.08",
    "location": "LT.5 / 5009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.09",
    "name": "AHU  AHU-5.09",
    "location": "LT.5 / 5010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.10",
    "name": "AHU  AHU-5.10",
    "location": "LT.5 / 5011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.11",
    "name": "AHU  AHU-5.11",
    "location": "LT.5 / 5012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.12",
    "name": "AHU  AHU-5.12",
    "location": "LT.5 / 5015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-5.13",
    "name": "AHU  AHU-5.13",
    "location": "LT.5 / Koridor lantai 5",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "IU-5.01",
    "name": "SPLIT  IU-5.01",
    "location": "LT.5 / 5016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "IU-5.02",
    "name": "SPLIT  IU-5.02",
    "location": "LT.5 / 5017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "IU-5.03",
    "name": "SPLIT  IU-5.03",
    "location": "LT.5 / 5018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "IU-5.04",
    "name": "SPLIT  IU-5.04",
    "location": "LT.5 / 5019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "IU-5.05",
    "name": "SPLIT  IU-5.05",
    "location": "LT.5 / 5020",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "IU-5.06",
    "name": "SPLIT  IU-5.06",
    "location": "LT.5 / 5021",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-6.01",
    "name": "AHU  AHU-6.01",
    "location": "LT.6 / NS Kemo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-6.01",
    "name": "FCU  FCU-6.01",
    "location": "LT.6 / Ruang kemo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-6.02",
    "name": "AHU  AHU-6.02",
    "location": "LT.6 / HD/depan lift",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-6.03",
    "name": "AHU  AHU-6.03",
    "location": "LT.6 / ICU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-6.04",
    "name": "AHU  AHU-6.04",
    "location": "LT.6 / NICU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-6.05",
    "name": "AHU  AHU-6.05",
    "location": "LT.6 / LDR",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-6.06",
    "name": "AHU  AHU-6.06",
    "location": "LT.6 / Koridor lantai 6",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "IU-6.01",
    "name": "SPLIT D IU-6.01",
    "location": "LT.6 / R.UPS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.01",
    "name": "FCU  FCU-7.01",
    "location": "LT.7 / 7001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-7.01",
    "name": "AHU AHU-7.01",
    "location": "LT.7 / 7002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.02",
    "name": "FCU  FCU-7.02",
    "location": "LT.7 / 7003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.03",
    "name": "FCU  FCU-7.03",
    "location": "LT.7 / 7005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.04",
    "name": "FCU  FCU-7.04",
    "location": "LT.7 / 7006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.05",
    "name": "FCU  FCU-7.05",
    "location": "LT.7 / 7007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.06",
    "name": "FCU  FCU-7.06",
    "location": "LT.7 / 7008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.07",
    "name": "FCU  FCU-7.07",
    "location": "LT.7 / 7009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.08",
    "name": "FCU  FCU-7.08",
    "location": "LT.7 / 7010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.09",
    "name": "FCU  FCU-7.09",
    "location": "LT.7 / 7011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.10",
    "name": "FCU  FCU-7.10",
    "location": "LT.7 / 7012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.11",
    "name": "FCU  FCU-7.11",
    "location": "LT.7 / 7015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.12",
    "name": "FCU  FCU-7.12",
    "location": "LT.7 / 7016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.13",
    "name": "FCU  FCU-7.13",
    "location": "LT.7 / 7017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.14",
    "name": "FCU  FCU-7.14",
    "location": "LT.7 / 7018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "FCU-7.15",
    "name": "FCU  FCU-7.15",
    "location": "LT.7 / 7019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-7.02",
    "name": "AHU  AHU-7.02",
    "location": "LT.7 / NS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Februari",
    "code": "AHU-7.03",
    "name": "AHU  AHU-7.03",
    "location": "LT.7 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.01",
    "name": "FCU  FCU-8.01",
    "location": "LT.8 / R.Tunggu 8001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-8.01",
    "name": "AHU  AHU-8.01",
    "location": "LT.8 / R.pasien 8001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-8.02",
    "name": "AHU  AHU-8.02",
    "location": "LT.8 / 8002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.02",
    "name": "FCU  FCU-8.02",
    "location": "LT.8 / 8003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-8.03",
    "name": "AHU  AHU-8.03",
    "location": "LT.8 / 8005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.03",
    "name": "FCU  FCU-8.03",
    "location": "LT.8 / 8006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.04",
    "name": "FCU  FCU-8.04",
    "location": "LT.8 / 8007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.05",
    "name": "FCU  FCU-8.05",
    "location": "LT.8 / 8008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.06",
    "name": "FCU  FCU-8.06",
    "location": "LT.8 / 8009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.07",
    "name": "FCU  FCU-8.07",
    "location": "LT.8 / 8010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.08",
    "name": "FCU  FCU-8.08",
    "location": "LT.8 / 8011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.09",
    "name": "FCU  FCU-8.09",
    "location": "LT.8 / 8012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-8.04",
    "name": "AHU  AHU-8.04",
    "location": "LT.8 / 8015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.10",
    "name": "FCU  FCU-8.10",
    "location": "LT.8 / 8016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.11",
    "name": "FCU  FCU-8.11",
    "location": "LT.8 / 8017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "FCU-8.12",
    "name": "FCU  FCU-8.12",
    "location": "LT.8 / 8018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-8.05",
    "name": "AHU  AHU-8.05",
    "location": "LT.8 / 8019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-8.06",
    "name": "AHU  AHU-8.06",
    "location": "LT.8 / NS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-8.07",
    "name": "AHU  AHU-8.07",
    "location": "LT.8 / R.Head Nurse",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-8.08",
    "name": "AHU  AHU-8.08",
    "location": "LT.8 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-9.01",
    "name": "AHU  AHU-9.01",
    "location": "LT.9 / Poly lt.9",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-9.02",
    "name": "AHU  AHU-9.02",
    "location": "LT.9 / dr.erawan",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-9.03",
    "name": "AHU  AHU-9.03",
    "location": "LT.9 / Ruangan 10",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-9.04",
    "name": "AHU  AHU-9.04",
    "location": "LT.9 / dr.lounge",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-9.05",
    "name": "AHU  AHU-9.05",
    "location": "LT.9 / R.Meeting",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-9.06",
    "name": "AHU  AHU-9.06",
    "location": "LT.9 / Koridor MO",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-9.07",
    "name": "AHU  AHU-9.07",
    "location": "LT.9 / Sekdir",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-9.08",
    "name": "AHU  AHU-9.08",
    "location": "LT.9 / Kitchen",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-9.09",
    "name": "AHU  AHU-9.09",
    "location": "LT.9 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "AHU-9.10",
    "name": "AHU  AHU-9.10",
    "location": "LT.9 / Ruang IT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "IU-9.01",
    "name": "SPLIT  IU-9.01",
    "location": "LT.9 / Server IT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "IU-9.02",
    "name": "SPLIT  IU-9.02",
    "location": "LT.9 / Ruang lift Bed",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "IU-9.03",
    "name": "SPLIT  IU-9.03",
    "location": "LT.10 / R.Lift pasenger",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "IU-9.04",
    "name": "SPLIT  IU-9.04",
    "location": "LT.10 / R.lift bersih",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Maret",
    "code": "IU-9.05",
    "name": "SPLIT  IU-9.05",
    "location": "LT.10 / R.lift kotor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-B.01",
    "name": "AHU AHU-B.01",
    "location": "BS / R.Jenazah",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-B.02",
    "name": "AHU AHU-B.02",
    "location": "BS / CSSD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-B.03",
    "name": "AHU AHU-B.03",
    "location": "BS / Gudang kitchen",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-B.04",
    "name": "AHU AHU-B.04",
    "location": "BS / R.FMS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-B.01",
    "name": "SPLIT  IU-B.01",
    "location": "BS / AC Split R. jenazah",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-B.02",
    "name": "SPLIT DUCT IU-B.02",
    "location": "BS / LVMDP",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-B.03",
    "name": "SPLIT  IU-B.03",
    "location": "BS / LVMDP",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-B.04",
    "name": "SPLIT  IU-B.04",
    "location": "BS / Subserver",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-B.05",
    "name": "SPLIT  IU-B.05",
    "location": "BS / Rekam medice",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-B.06",
    "name": "SPLIT  IU-B.06",
    "location": "BS / R. SJS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-B.07",
    "name": "SPLIT  IU-B.07",
    "location": "BS / TPS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-B.08",
    "name": "SPLIT  IU-B.08",
    "location": "BS / R. sampah medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-B.09",
    "name": "SPLIT  IU-B.09",
    "location": "BS / R.PKG",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-B.10",
    "name": "SPLIT  IU-B.10",
    "location": "BS / Mushola",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-B.11",
    "name": "SPLIT  IU-B.11",
    "location": "BS / R. sampah non medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.01",
    "name": "AHU AHU-1.01",
    "location": "LT.1 / Lobby utama",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.02",
    "name": "AHU AHU-1.02",
    "location": "LT.1 / R.post operasi OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.03",
    "name": "AHU AHU-1.03",
    "location": "LT.1 / koridor lobby",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.04",
    "name": "AHU AHU-1.04",
    "location": "LT.1 / IGD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.05",
    "name": "AHU AHU-1.05",
    "location": "LT.1 / Lobby kasir",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.06",
    "name": "AHU AHU-1.06",
    "location": "LT.1 / R.Konsultasi",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.07",
    "name": "AHU AHU-1.07",
    "location": "LT.1 / Endoscopy",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.08",
    "name": "AHU AHU-1.08",
    "location": "LT.1 / Koridor UPS OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.09",
    "name": "AHU AHU-1.09",
    "location": "LT.1 / Tahta",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.10",
    "name": "AHU  AHU-1.10",
    "location": "LT.1 / NS IGD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.11",
    "name": "AHU  AHU-1.11",
    "location": "LT.1 / Poly TNC",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-1.12",
    "name": "AHU  AHU-1.12",
    "location": "LT.1 / Koridor OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-1.01",
    "name": "SPLIT  IU-1.01",
    "location": "LT.1 / TNC dr.andri",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-1.02",
    "name": "SPLIT  IU-1.02",
    "location": "LT.1 / Subserver",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-1.03",
    "name": "AC IU-1.03",
    "location": "LT.1 / Pain management",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-2.01",
    "name": "AHU  AHU-2.01",
    "location": "LT.2 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-2.02",
    "name": "AHU  AHU-2.02",
    "location": "LT.2 / X Ray",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-2.03",
    "name": "AHU  AHU-2.03",
    "location": "LT.2 / CT Scan",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-2.04",
    "name": "AHU  AHU-2.04",
    "location": "LT.2 / Flouroscopy",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-2.05",
    "name": "AHU  AHU-2.05",
    "location": "LT.2 / Poly mata",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-2.06",
    "name": "AHU  AHU-2.06",
    "location": "LT.2 / Ruangan 08",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-2.07",
    "name": "AHU  AHU-2.07",
    "location": "LT.2 / Ruangan 07",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "IU-2.01",
    "name": "SPLIT D IU-2.01",
    "location": "LT.2 / MRI",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-2.08",
    "name": "AHU  AHU-2.08",
    "location": "LT.2 / Dining room",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "April",
    "code": "AHU-2.09",
    "name": "AHU  AHU-2.09",
    "location": "LT.2 / Poly lt.2",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-2.10",
    "name": "AHU  AHU-2.10",
    "location": "LT.2 / Mammo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-2.11",
    "name": "AHU  AHU-2.11",
    "location": "LT.2 / NS MCU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-3.01",
    "name": "AHU  AHU-3.01",
    "location": "LT.3 / Depan poly no.5",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-3.02",
    "name": "AHU  AHU-3.02",
    "location": "LT.3 / Poly lantai 3",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-3.03",
    "name": "AHU  AHU-3.03",
    "location": "LT.3 / LAB",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-3.04",
    "name": "AHU  AHU-3.04",
    "location": "LT.3 / Farmasi",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-3.05",
    "name": "AHU  AHU-3.05",
    "location": "LT.3 / Sport medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-3.06",
    "name": "AHU  AHU-3.06",
    "location": "LT.3 / NS sport medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-3.07",
    "name": "AHU  AHU-3.07",
    "location": "LT.3 / Koridor lantai 3",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.01",
    "name": "AHU  AHU-5.01",
    "location": "LT.5 / 5001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.02",
    "name": "AHU  AHU-5.02",
    "location": "LT.5 / 5002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.03",
    "name": "AHU  AHU-5.03",
    "location": "LT.5 / 5003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.04",
    "name": "AHU  AHU-5.04",
    "location": "LT.5 / 5005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.05",
    "name": "AHU  AHU-5.05",
    "location": "LT.5 / 5006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.06",
    "name": "AHU  AHU-5.06",
    "location": "LT.5 / 5007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.07",
    "name": "AHU  AHU-5.07",
    "location": "LT.5 / 5008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.08",
    "name": "AHU  AHU-5.08",
    "location": "LT.5 / 5009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.09",
    "name": "AHU  AHU-5.09",
    "location": "LT.5 / 5010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.10",
    "name": "AHU  AHU-5.10",
    "location": "LT.5 / 5011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.11",
    "name": "AHU  AHU-5.11",
    "location": "LT.5 / 5012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.12",
    "name": "AHU  AHU-5.12",
    "location": "LT.5 / 5015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-5.13",
    "name": "AHU  AHU-5.13",
    "location": "LT.5 / Koridor lantai 5",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "IU-5.01",
    "name": "SPLIT  IU-5.01",
    "location": "LT.5 / 5016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "IU-5.02",
    "name": "SPLIT  IU-5.02",
    "location": "LT.5 / 5017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "IU-5.03",
    "name": "SPLIT  IU-5.03",
    "location": "LT.5 / 5018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "IU-5.04",
    "name": "SPLIT  IU-5.04",
    "location": "LT.5 / 5019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "IU-5.05",
    "name": "SPLIT  IU-5.05",
    "location": "LT.5 / 5020",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "IU-5.06",
    "name": "SPLIT  IU-5.06",
    "location": "LT.5 / 5021",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-6.01",
    "name": "AHU  AHU-6.01",
    "location": "LT.6 / NS Kemo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-6.01",
    "name": "FCU  FCU-6.01",
    "location": "LT.6 / Ruang kemo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-6.02",
    "name": "AHU  AHU-6.02",
    "location": "LT.6 / HD/depan lift",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-6.03",
    "name": "AHU  AHU-6.03",
    "location": "LT.6 / ICU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-6.04",
    "name": "AHU  AHU-6.04",
    "location": "LT.6 / NICU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-6.05",
    "name": "AHU  AHU-6.05",
    "location": "LT.6 / LDR",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-6.06",
    "name": "AHU  AHU-6.06",
    "location": "LT.6 / Koridor lantai 6",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "IU-6.01",
    "name": "SPLIT D IU-6.01",
    "location": "LT.6 / R.UPS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.01",
    "name": "FCU  FCU-7.01",
    "location": "LT.7 / 7001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-7.01",
    "name": "AHU AHU-7.01",
    "location": "LT.7 / 7002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.02",
    "name": "FCU  FCU-7.02",
    "location": "LT.7 / 7003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.03",
    "name": "FCU  FCU-7.03",
    "location": "LT.7 / 7005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.04",
    "name": "FCU  FCU-7.04",
    "location": "LT.7 / 7006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.05",
    "name": "FCU  FCU-7.05",
    "location": "LT.7 / 7007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.06",
    "name": "FCU  FCU-7.06",
    "location": "LT.7 / 7008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.07",
    "name": "FCU  FCU-7.07",
    "location": "LT.7 / 7009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.08",
    "name": "FCU  FCU-7.08",
    "location": "LT.7 / 7010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.09",
    "name": "FCU  FCU-7.09",
    "location": "LT.7 / 7011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.10",
    "name": "FCU  FCU-7.10",
    "location": "LT.7 / 7012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.11",
    "name": "FCU  FCU-7.11",
    "location": "LT.7 / 7015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.12",
    "name": "FCU  FCU-7.12",
    "location": "LT.7 / 7016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.13",
    "name": "FCU  FCU-7.13",
    "location": "LT.7 / 7017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.14",
    "name": "FCU  FCU-7.14",
    "location": "LT.7 / 7018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "FCU-7.15",
    "name": "FCU  FCU-7.15",
    "location": "LT.7 / 7019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-7.02",
    "name": "AHU  AHU-7.02",
    "location": "LT.7 / NS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Mei",
    "code": "AHU-7.03",
    "name": "AHU  AHU-7.03",
    "location": "LT.7 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.01",
    "name": "FCU  FCU-8.01",
    "location": "LT.8 / R.Tunggu 8001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-8.01",
    "name": "AHU  AHU-8.01",
    "location": "LT.8 / R.pasien 8001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-8.02",
    "name": "AHU  AHU-8.02",
    "location": "LT.8 / 8002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.02",
    "name": "FCU  FCU-8.02",
    "location": "LT.8 / 8003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-8.03",
    "name": "AHU  AHU-8.03",
    "location": "LT.8 / 8005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.03",
    "name": "FCU  FCU-8.03",
    "location": "LT.8 / 8006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.04",
    "name": "FCU  FCU-8.04",
    "location": "LT.8 / 8007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.05",
    "name": "FCU  FCU-8.05",
    "location": "LT.8 / 8008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.06",
    "name": "FCU  FCU-8.06",
    "location": "LT.8 / 8009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.07",
    "name": "FCU  FCU-8.07",
    "location": "LT.8 / 8010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.08",
    "name": "FCU  FCU-8.08",
    "location": "LT.8 / 8011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.09",
    "name": "FCU  FCU-8.09",
    "location": "LT.8 / 8012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-8.04",
    "name": "AHU  AHU-8.04",
    "location": "LT.8 / 8015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.10",
    "name": "FCU  FCU-8.10",
    "location": "LT.8 / 8016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.11",
    "name": "FCU  FCU-8.11",
    "location": "LT.8 / 8017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "FCU-8.12",
    "name": "FCU  FCU-8.12",
    "location": "LT.8 / 8018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-8.05",
    "name": "AHU  AHU-8.05",
    "location": "LT.8 / 8019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-8.06",
    "name": "AHU  AHU-8.06",
    "location": "LT.8 / NS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-8.07",
    "name": "AHU  AHU-8.07",
    "location": "LT.8 / R.Head Nurse",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-8.08",
    "name": "AHU  AHU-8.08",
    "location": "LT.8 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-9.01",
    "name": "AHU  AHU-9.01",
    "location": "LT.9 / Poly lt.9",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-9.02",
    "name": "AHU  AHU-9.02",
    "location": "LT.9 / dr.erawan",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-9.03",
    "name": "AHU  AHU-9.03",
    "location": "LT.9 / Ruangan 10",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-9.04",
    "name": "AHU  AHU-9.04",
    "location": "LT.9 / dr.lounge",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-9.05",
    "name": "AHU  AHU-9.05",
    "location": "LT.9 / R.Meeting",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-9.06",
    "name": "AHU  AHU-9.06",
    "location": "LT.9 / Koridor MO",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-9.07",
    "name": "AHU  AHU-9.07",
    "location": "LT.9 / Sekdir",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-9.08",
    "name": "AHU  AHU-9.08",
    "location": "LT.9 / Kitchen",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-9.09",
    "name": "AHU  AHU-9.09",
    "location": "LT.9 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "AHU-9.10",
    "name": "AHU  AHU-9.10",
    "location": "LT.9 / Ruang IT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "IU-9.01",
    "name": "SPLIT  IU-9.01",
    "location": "LT.9 / Server IT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "IU-9.02",
    "name": "SPLIT  IU-9.02",
    "location": "LT.9 / Ruang lift Bed",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "IU-9.03",
    "name": "SPLIT  IU-9.03",
    "location": "LT.10 / R.Lift pasenger",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "IU-9.04",
    "name": "SPLIT  IU-9.04",
    "location": "LT.10 / R.lift bersih",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juni",
    "code": "IU-9.05",
    "name": "SPLIT  IU-9.05",
    "location": "LT.10 / R.lift kotor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-B.01",
    "name": "AHU AHU-B.01",
    "location": "BS / R.Jenazah",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-B.02",
    "name": "AHU AHU-B.02",
    "location": "BS / CSSD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-B.03",
    "name": "AHU AHU-B.03",
    "location": "BS / Gudang kitchen",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-B.04",
    "name": "AHU AHU-B.04",
    "location": "BS / R.FMS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-B.01",
    "name": "SPLIT  IU-B.01",
    "location": "BS / AC Split R. jenazah",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-B.02",
    "name": "SPLIT DUCT IU-B.02",
    "location": "BS / LVMDP",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-B.03",
    "name": "SPLIT  IU-B.03",
    "location": "BS / LVMDP",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-B.04",
    "name": "SPLIT  IU-B.04",
    "location": "BS / Subserver",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-B.05",
    "name": "SPLIT  IU-B.05",
    "location": "BS / Rekam medice",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-B.06",
    "name": "SPLIT  IU-B.06",
    "location": "BS / R. SJS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-B.07",
    "name": "SPLIT  IU-B.07",
    "location": "BS / TPS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-B.08",
    "name": "SPLIT  IU-B.08",
    "location": "BS / R. sampah medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-B.09",
    "name": "SPLIT  IU-B.09",
    "location": "BS / R.PKG",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-B.10",
    "name": "SPLIT  IU-B.10",
    "location": "BS / Mushola",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-B.11",
    "name": "SPLIT  IU-B.11",
    "location": "BS / R. sampah non medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.01",
    "name": "AHU AHU-1.01",
    "location": "LT.1 / Lobby utama",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.02",
    "name": "AHU AHU-1.02",
    "location": "LT.1 / R.post operasi OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.03",
    "name": "AHU AHU-1.03",
    "location": "LT.1 / koridor lobby",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.04",
    "name": "AHU AHU-1.04",
    "location": "LT.1 / IGD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.05",
    "name": "AHU AHU-1.05",
    "location": "LT.1 / Lobby kasir",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.06",
    "name": "AHU AHU-1.06",
    "location": "LT.1 / R.Konsultasi",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.07",
    "name": "AHU AHU-1.07",
    "location": "LT.1 / Endoscopy",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.08",
    "name": "AHU AHU-1.08",
    "location": "LT.1 / Koridor UPS OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.09",
    "name": "AHU AHU-1.09",
    "location": "LT.1 / Tahta",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.10",
    "name": "AHU  AHU-1.10",
    "location": "LT.1 / NS IGD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.11",
    "name": "AHU  AHU-1.11",
    "location": "LT.1 / Poly TNC",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-1.12",
    "name": "AHU  AHU-1.12",
    "location": "LT.1 / Koridor OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-1.01",
    "name": "SPLIT  IU-1.01",
    "location": "LT.1 / TNC dr.andri",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-1.02",
    "name": "SPLIT  IU-1.02",
    "location": "LT.1 / Subserver",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-1.03",
    "name": "AC IU-1.03",
    "location": "LT.1 / Pain management",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-2.01",
    "name": "AHU  AHU-2.01",
    "location": "LT.2 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-2.02",
    "name": "AHU  AHU-2.02",
    "location": "LT.2 / X Ray",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-2.03",
    "name": "AHU  AHU-2.03",
    "location": "LT.2 / CT Scan",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-2.04",
    "name": "AHU  AHU-2.04",
    "location": "LT.2 / Flouroscopy",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-2.05",
    "name": "AHU  AHU-2.05",
    "location": "LT.2 / Poly mata",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-2.06",
    "name": "AHU  AHU-2.06",
    "location": "LT.2 / Ruangan 08",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-2.07",
    "name": "AHU  AHU-2.07",
    "location": "LT.2 / Ruangan 07",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "IU-2.01",
    "name": "SPLIT D IU-2.01",
    "location": "LT.2 / MRI",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-2.08",
    "name": "AHU  AHU-2.08",
    "location": "LT.2 / Dining room",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Juli",
    "code": "AHU-2.09",
    "name": "AHU  AHU-2.09",
    "location": "LT.2 / Poly lt.2",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-2.10",
    "name": "AHU  AHU-2.10",
    "location": "LT.2 / Mammo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-2.11",
    "name": "AHU  AHU-2.11",
    "location": "LT.2 / NS MCU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-3.01",
    "name": "AHU  AHU-3.01",
    "location": "LT.3 / Depan poly no.5",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-3.02",
    "name": "AHU  AHU-3.02",
    "location": "LT.3 / Poly lantai 3",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-3.03",
    "name": "AHU  AHU-3.03",
    "location": "LT.3 / LAB",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-3.04",
    "name": "AHU  AHU-3.04",
    "location": "LT.3 / Farmasi",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-3.05",
    "name": "AHU  AHU-3.05",
    "location": "LT.3 / Sport medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-3.06",
    "name": "AHU  AHU-3.06",
    "location": "LT.3 / NS sport medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-3.07",
    "name": "AHU  AHU-3.07",
    "location": "LT.3 / Koridor lantai 3",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.01",
    "name": "AHU  AHU-5.01",
    "location": "LT.5 / 5001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.02",
    "name": "AHU  AHU-5.02",
    "location": "LT.5 / 5002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.03",
    "name": "AHU  AHU-5.03",
    "location": "LT.5 / 5003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.04",
    "name": "AHU  AHU-5.04",
    "location": "LT.5 / 5005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.05",
    "name": "AHU  AHU-5.05",
    "location": "LT.5 / 5006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.06",
    "name": "AHU  AHU-5.06",
    "location": "LT.5 / 5007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.07",
    "name": "AHU  AHU-5.07",
    "location": "LT.5 / 5008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.08",
    "name": "AHU  AHU-5.08",
    "location": "LT.5 / 5009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.09",
    "name": "AHU  AHU-5.09",
    "location": "LT.5 / 5010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.10",
    "name": "AHU  AHU-5.10",
    "location": "LT.5 / 5011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.11",
    "name": "AHU  AHU-5.11",
    "location": "LT.5 / 5012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.12",
    "name": "AHU  AHU-5.12",
    "location": "LT.5 / 5015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-5.13",
    "name": "AHU  AHU-5.13",
    "location": "LT.5 / Koridor lantai 5",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "IU-5.01",
    "name": "SPLIT  IU-5.01",
    "location": "LT.5 / 5016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "IU-5.02",
    "name": "SPLIT  IU-5.02",
    "location": "LT.5 / 5017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "IU-5.03",
    "name": "SPLIT  IU-5.03",
    "location": "LT.5 / 5018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "IU-5.04",
    "name": "SPLIT  IU-5.04",
    "location": "LT.5 / 5019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "IU-5.05",
    "name": "SPLIT  IU-5.05",
    "location": "LT.5 / 5020",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "IU-5.06",
    "name": "SPLIT  IU-5.06",
    "location": "LT.5 / 5021",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-6.01",
    "name": "AHU  AHU-6.01",
    "location": "LT.6 / NS Kemo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-6.01",
    "name": "FCU  FCU-6.01",
    "location": "LT.6 / Ruang kemo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-6.02",
    "name": "AHU  AHU-6.02",
    "location": "LT.6 / HD/depan lift",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-6.03",
    "name": "AHU  AHU-6.03",
    "location": "LT.6 / ICU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-6.04",
    "name": "AHU  AHU-6.04",
    "location": "LT.6 / NICU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-6.05",
    "name": "AHU  AHU-6.05",
    "location": "LT.6 / LDR",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-6.06",
    "name": "AHU  AHU-6.06",
    "location": "LT.6 / Koridor lantai 6",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "IU-6.01",
    "name": "SPLIT D IU-6.01",
    "location": "LT.6 / R.UPS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.01",
    "name": "FCU  FCU-7.01",
    "location": "LT.7 / 7001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-7.01",
    "name": "AHU AHU-7.01",
    "location": "LT.7 / 7002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.02",
    "name": "FCU  FCU-7.02",
    "location": "LT.7 / 7003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.03",
    "name": "FCU  FCU-7.03",
    "location": "LT.7 / 7005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.04",
    "name": "FCU  FCU-7.04",
    "location": "LT.7 / 7006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.05",
    "name": "FCU  FCU-7.05",
    "location": "LT.7 / 7007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.06",
    "name": "FCU  FCU-7.06",
    "location": "LT.7 / 7008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.07",
    "name": "FCU  FCU-7.07",
    "location": "LT.7 / 7009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.08",
    "name": "FCU  FCU-7.08",
    "location": "LT.7 / 7010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.09",
    "name": "FCU  FCU-7.09",
    "location": "LT.7 / 7011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.10",
    "name": "FCU  FCU-7.10",
    "location": "LT.7 / 7012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.11",
    "name": "FCU  FCU-7.11",
    "location": "LT.7 / 7015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.12",
    "name": "FCU  FCU-7.12",
    "location": "LT.7 / 7016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.13",
    "name": "FCU  FCU-7.13",
    "location": "LT.7 / 7017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.14",
    "name": "FCU  FCU-7.14",
    "location": "LT.7 / 7018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "FCU-7.15",
    "name": "FCU  FCU-7.15",
    "location": "LT.7 / 7019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-7.02",
    "name": "AHU  AHU-7.02",
    "location": "LT.7 / NS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Agustus",
    "code": "AHU-7.03",
    "name": "AHU  AHU-7.03",
    "location": "LT.7 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.01",
    "name": "FCU  FCU-8.01",
    "location": "LT.8 / R.Tunggu 8001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-8.01",
    "name": "AHU  AHU-8.01",
    "location": "LT.8 / R.pasien 8001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-8.02",
    "name": "AHU  AHU-8.02",
    "location": "LT.8 / 8002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.02",
    "name": "FCU  FCU-8.02",
    "location": "LT.8 / 8003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-8.03",
    "name": "AHU  AHU-8.03",
    "location": "LT.8 / 8005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.03",
    "name": "FCU  FCU-8.03",
    "location": "LT.8 / 8006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.04",
    "name": "FCU  FCU-8.04",
    "location": "LT.8 / 8007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.05",
    "name": "FCU  FCU-8.05",
    "location": "LT.8 / 8008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.06",
    "name": "FCU  FCU-8.06",
    "location": "LT.8 / 8009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.07",
    "name": "FCU  FCU-8.07",
    "location": "LT.8 / 8010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.08",
    "name": "FCU  FCU-8.08",
    "location": "LT.8 / 8011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.09",
    "name": "FCU  FCU-8.09",
    "location": "LT.8 / 8012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-8.04",
    "name": "AHU  AHU-8.04",
    "location": "LT.8 / 8015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.10",
    "name": "FCU  FCU-8.10",
    "location": "LT.8 / 8016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.11",
    "name": "FCU  FCU-8.11",
    "location": "LT.8 / 8017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "FCU-8.12",
    "name": "FCU  FCU-8.12",
    "location": "LT.8 / 8018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-8.05",
    "name": "AHU  AHU-8.05",
    "location": "LT.8 / 8019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-8.06",
    "name": "AHU  AHU-8.06",
    "location": "LT.8 / NS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-8.07",
    "name": "AHU  AHU-8.07",
    "location": "LT.8 / R.Head Nurse",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-8.08",
    "name": "AHU  AHU-8.08",
    "location": "LT.8 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-9.01",
    "name": "AHU  AHU-9.01",
    "location": "LT.9 / Poly lt.9",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-9.02",
    "name": "AHU  AHU-9.02",
    "location": "LT.9 / dr.erawan",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-9.03",
    "name": "AHU  AHU-9.03",
    "location": "LT.9 / Ruangan 10",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-9.04",
    "name": "AHU  AHU-9.04",
    "location": "LT.9 / dr.lounge",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-9.05",
    "name": "AHU  AHU-9.05",
    "location": "LT.9 / R.Meeting",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-9.06",
    "name": "AHU  AHU-9.06",
    "location": "LT.9 / Koridor MO",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-9.07",
    "name": "AHU  AHU-9.07",
    "location": "LT.9 / Sekdir",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-9.08",
    "name": "AHU  AHU-9.08",
    "location": "LT.9 / Kitchen",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-9.09",
    "name": "AHU  AHU-9.09",
    "location": "LT.9 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "AHU-9.10",
    "name": "AHU  AHU-9.10",
    "location": "LT.9 / Ruang IT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "IU-9.01",
    "name": "SPLIT  IU-9.01",
    "location": "LT.9 / Server IT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "IU-9.02",
    "name": "SPLIT  IU-9.02",
    "location": "LT.9 / Ruang lift Bed",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "IU-9.03",
    "name": "SPLIT  IU-9.03",
    "location": "LT.10 / R.Lift pasenger",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "IU-9.04",
    "name": "SPLIT  IU-9.04",
    "location": "LT.10 / R.lift bersih",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "September",
    "code": "IU-9.05",
    "name": "SPLIT  IU-9.05",
    "location": "LT.10 / R.lift kotor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-B.01",
    "name": "AHU AHU-B.01",
    "location": "BS / R.Jenazah",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-B.02",
    "name": "AHU AHU-B.02",
    "location": "BS / CSSD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-B.03",
    "name": "AHU AHU-B.03",
    "location": "BS / Gudang kitchen",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-B.04",
    "name": "AHU AHU-B.04",
    "location": "BS / R.FMS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-B.01",
    "name": "SPLIT  IU-B.01",
    "location": "BS / AC Split R. jenazah",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-B.02",
    "name": "SPLIT DUCT IU-B.02",
    "location": "BS / LVMDP",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-B.03",
    "name": "SPLIT  IU-B.03",
    "location": "BS / LVMDP",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-B.04",
    "name": "SPLIT  IU-B.04",
    "location": "BS / Subserver",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-B.05",
    "name": "SPLIT  IU-B.05",
    "location": "BS / Rekam medice",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-B.06",
    "name": "SPLIT  IU-B.06",
    "location": "BS / R. SJS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-B.07",
    "name": "SPLIT  IU-B.07",
    "location": "BS / TPS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-B.08",
    "name": "SPLIT  IU-B.08",
    "location": "BS / R. sampah medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-B.09",
    "name": "SPLIT  IU-B.09",
    "location": "BS / R.PKG",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-B.10",
    "name": "SPLIT  IU-B.10",
    "location": "BS / Mushola",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-B.11",
    "name": "SPLIT  IU-B.11",
    "location": "BS / R. sampah non medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.01",
    "name": "AHU AHU-1.01",
    "location": "LT.1 / Lobby utama",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.02",
    "name": "AHU AHU-1.02",
    "location": "LT.1 / R.post operasi OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.03",
    "name": "AHU AHU-1.03",
    "location": "LT.1 / koridor lobby",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.04",
    "name": "AHU AHU-1.04",
    "location": "LT.1 / IGD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.05",
    "name": "AHU AHU-1.05",
    "location": "LT.1 / Lobby kasir",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.06",
    "name": "AHU AHU-1.06",
    "location": "LT.1 / R.Konsultasi",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.07",
    "name": "AHU AHU-1.07",
    "location": "LT.1 / Endoscopy",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.08",
    "name": "AHU AHU-1.08",
    "location": "LT.1 / Koridor UPS OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.09",
    "name": "AHU AHU-1.09",
    "location": "LT.1 / Tahta",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.10",
    "name": "AHU  AHU-1.10",
    "location": "LT.1 / NS IGD",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.11",
    "name": "AHU  AHU-1.11",
    "location": "LT.1 / Poly TNC",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-1.12",
    "name": "AHU  AHU-1.12",
    "location": "LT.1 / Koridor OT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-1.01",
    "name": "SPLIT  IU-1.01",
    "location": "LT.1 / TNC dr.andri",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-1.02",
    "name": "SPLIT  IU-1.02",
    "location": "LT.1 / Subserver",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-1.03",
    "name": "AC IU-1.03",
    "location": "LT.1 / Pain management",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-2.01",
    "name": "AHU  AHU-2.01",
    "location": "LT.2 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-2.02",
    "name": "AHU  AHU-2.02",
    "location": "LT.2 / X Ray",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-2.03",
    "name": "AHU  AHU-2.03",
    "location": "LT.2 / CT Scan",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-2.04",
    "name": "AHU  AHU-2.04",
    "location": "LT.2 / Flouroscopy",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-2.05",
    "name": "AHU  AHU-2.05",
    "location": "LT.2 / Poly mata",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-2.06",
    "name": "AHU  AHU-2.06",
    "location": "LT.2 / Ruangan 08",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-2.07",
    "name": "AHU  AHU-2.07",
    "location": "LT.2 / Ruangan 07",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "IU-2.01",
    "name": "SPLIT D IU-2.01",
    "location": "LT.2 / MRI",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-2.08",
    "name": "AHU  AHU-2.08",
    "location": "LT.2 / Dining room",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Oktober",
    "code": "AHU-2.09",
    "name": "AHU  AHU-2.09",
    "location": "LT.2 / Poly lt.2",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-2.10",
    "name": "AHU  AHU-2.10",
    "location": "LT.2 / Mammo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-2.11",
    "name": "AHU  AHU-2.11",
    "location": "LT.2 / NS MCU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-3.01",
    "name": "AHU  AHU-3.01",
    "location": "LT.3 / Depan poly no.5",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-3.02",
    "name": "AHU  AHU-3.02",
    "location": "LT.3 / Poly lantai 3",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-3.03",
    "name": "AHU  AHU-3.03",
    "location": "LT.3 / LAB",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-3.04",
    "name": "AHU  AHU-3.04",
    "location": "LT.3 / Farmasi",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-3.05",
    "name": "AHU  AHU-3.05",
    "location": "LT.3 / Sport medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-3.06",
    "name": "AHU  AHU-3.06",
    "location": "LT.3 / NS sport medis",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-3.07",
    "name": "AHU  AHU-3.07",
    "location": "LT.3 / Koridor lantai 3",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.01",
    "name": "AHU  AHU-5.01",
    "location": "LT.5 / 5001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.02",
    "name": "AHU  AHU-5.02",
    "location": "LT.5 / 5002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.03",
    "name": "AHU  AHU-5.03",
    "location": "LT.5 / 5003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.04",
    "name": "AHU  AHU-5.04",
    "location": "LT.5 / 5005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.05",
    "name": "AHU  AHU-5.05",
    "location": "LT.5 / 5006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.06",
    "name": "AHU  AHU-5.06",
    "location": "LT.5 / 5007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.07",
    "name": "AHU  AHU-5.07",
    "location": "LT.5 / 5008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.08",
    "name": "AHU  AHU-5.08",
    "location": "LT.5 / 5009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.09",
    "name": "AHU  AHU-5.09",
    "location": "LT.5 / 5010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.10",
    "name": "AHU  AHU-5.10",
    "location": "LT.5 / 5011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.11",
    "name": "AHU  AHU-5.11",
    "location": "LT.5 / 5012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.12",
    "name": "AHU  AHU-5.12",
    "location": "LT.5 / 5015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-5.13",
    "name": "AHU  AHU-5.13",
    "location": "LT.5 / Koridor lantai 5",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "IU-5.01",
    "name": "SPLIT  IU-5.01",
    "location": "LT.5 / 5016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "IU-5.02",
    "name": "SPLIT  IU-5.02",
    "location": "LT.5 / 5017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "IU-5.03",
    "name": "SPLIT  IU-5.03",
    "location": "LT.5 / 5018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "IU-5.04",
    "name": "SPLIT  IU-5.04",
    "location": "LT.5 / 5019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "IU-5.05",
    "name": "SPLIT  IU-5.05",
    "location": "LT.5 / 5020",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "IU-5.06",
    "name": "SPLIT  IU-5.06",
    "location": "LT.5 / 5021",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-6.01",
    "name": "AHU  AHU-6.01",
    "location": "LT.6 / NS Kemo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-6.01",
    "name": "FCU  FCU-6.01",
    "location": "LT.6 / Ruang kemo",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-6.02",
    "name": "AHU  AHU-6.02",
    "location": "LT.6 / HD/depan lift",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-6.03",
    "name": "AHU  AHU-6.03",
    "location": "LT.6 / ICU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-6.04",
    "name": "AHU  AHU-6.04",
    "location": "LT.6 / NICU",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-6.05",
    "name": "AHU  AHU-6.05",
    "location": "LT.6 / LDR",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-6.06",
    "name": "AHU  AHU-6.06",
    "location": "LT.6 / Koridor lantai 6",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "IU-6.01",
    "name": "SPLIT D IU-6.01",
    "location": "LT.6 / R.UPS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.01",
    "name": "FCU  FCU-7.01",
    "location": "LT.7 / 7001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-7.01",
    "name": "AHU AHU-7.01",
    "location": "LT.7 / 7002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.02",
    "name": "FCU  FCU-7.02",
    "location": "LT.7 / 7003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.03",
    "name": "FCU  FCU-7.03",
    "location": "LT.7 / 7005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.04",
    "name": "FCU  FCU-7.04",
    "location": "LT.7 / 7006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.05",
    "name": "FCU  FCU-7.05",
    "location": "LT.7 / 7007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.06",
    "name": "FCU  FCU-7.06",
    "location": "LT.7 / 7008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.07",
    "name": "FCU  FCU-7.07",
    "location": "LT.7 / 7009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.08",
    "name": "FCU  FCU-7.08",
    "location": "LT.7 / 7010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.09",
    "name": "FCU  FCU-7.09",
    "location": "LT.7 / 7011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.10",
    "name": "FCU  FCU-7.10",
    "location": "LT.7 / 7012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.11",
    "name": "FCU  FCU-7.11",
    "location": "LT.7 / 7015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.12",
    "name": "FCU  FCU-7.12",
    "location": "LT.7 / 7016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.13",
    "name": "FCU  FCU-7.13",
    "location": "LT.7 / 7017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.14",
    "name": "FCU  FCU-7.14",
    "location": "LT.7 / 7018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "FCU-7.15",
    "name": "FCU  FCU-7.15",
    "location": "LT.7 / 7019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-7.02",
    "name": "AHU  AHU-7.02",
    "location": "LT.7 / NS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "November",
    "code": "AHU-7.03",
    "name": "AHU  AHU-7.03",
    "location": "LT.7 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.01",
    "name": "FCU  FCU-8.01",
    "location": "LT.8 / R.Tunggu 8001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-8.01",
    "name": "AHU  AHU-8.01",
    "location": "LT.8 / R.pasien 8001",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-8.02",
    "name": "AHU  AHU-8.02",
    "location": "LT.8 / 8002",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.02",
    "name": "FCU  FCU-8.02",
    "location": "LT.8 / 8003",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-8.03",
    "name": "AHU  AHU-8.03",
    "location": "LT.8 / 8005",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.03",
    "name": "FCU  FCU-8.03",
    "location": "LT.8 / 8006",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.04",
    "name": "FCU  FCU-8.04",
    "location": "LT.8 / 8007",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.05",
    "name": "FCU  FCU-8.05",
    "location": "LT.8 / 8008",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.06",
    "name": "FCU  FCU-8.06",
    "location": "LT.8 / 8009",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.07",
    "name": "FCU  FCU-8.07",
    "location": "LT.8 / 8010",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.08",
    "name": "FCU  FCU-8.08",
    "location": "LT.8 / 8011",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.09",
    "name": "FCU  FCU-8.09",
    "location": "LT.8 / 8012",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-8.04",
    "name": "AHU  AHU-8.04",
    "location": "LT.8 / 8015",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.10",
    "name": "FCU  FCU-8.10",
    "location": "LT.8 / 8016",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.11",
    "name": "FCU  FCU-8.11",
    "location": "LT.8 / 8017",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "FCU-8.12",
    "name": "FCU  FCU-8.12",
    "location": "LT.8 / 8018",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-8.05",
    "name": "AHU  AHU-8.05",
    "location": "LT.8 / 8019",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-8.06",
    "name": "AHU  AHU-8.06",
    "location": "LT.8 / NS",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-8.07",
    "name": "AHU  AHU-8.07",
    "location": "LT.8 / R.Head Nurse",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-8.08",
    "name": "AHU  AHU-8.08",
    "location": "LT.8 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-9.01",
    "name": "AHU  AHU-9.01",
    "location": "LT.9 / Poly lt.9",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-9.02",
    "name": "AHU  AHU-9.02",
    "location": "LT.9 / dr.erawan",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-9.03",
    "name": "AHU  AHU-9.03",
    "location": "LT.9 / Ruangan 10",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-9.04",
    "name": "AHU  AHU-9.04",
    "location": "LT.9 / dr.lounge",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-9.05",
    "name": "AHU  AHU-9.05",
    "location": "LT.9 / R.Meeting",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-9.06",
    "name": "AHU  AHU-9.06",
    "location": "LT.9 / Koridor MO",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-9.07",
    "name": "AHU  AHU-9.07",
    "location": "LT.9 / Sekdir",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-9.08",
    "name": "AHU  AHU-9.08",
    "location": "LT.9 / Kitchen",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-9.09",
    "name": "AHU  AHU-9.09",
    "location": "LT.9 / Koridor",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "AHU-9.10",
    "name": "AHU  AHU-9.10",
    "location": "LT.9 / Ruang IT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "IU-9.01",
    "name": "SPLIT  IU-9.01",
    "location": "LT.9 / Server IT",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "IU-9.02",
    "name": "SPLIT  IU-9.02",
    "location": "LT.9 / Ruang lift Bed",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "IU-9.03",
    "name": "SPLIT  IU-9.03",
    "location": "LT.10 / R.Lift pasenger",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "IU-9.04",
    "name": "SPLIT  IU-9.04",
    "location": "LT.10 / R.lift bersih",
    "periode": "3 BULAN"
  },
  {
    "group": "HVAC",
    "month": "Desember",
    "code": "IU-9.05",
    "name": "SPLIT  IU-9.05",
    "location": "LT.10 / R.lift kotor",
    "periode": "3 BULAN"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PKG 1",
    "name": "PKG 1",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PKG 2",
    "name": "PKG 2",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD Basement",
    "name": "PD Basement",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP HVAC lt B",
    "name": "PP HVAC lt B",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Parkir",
    "name": "PP Parkir",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "SDB emergensi",
    "name": "SDB emergensi",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD Pompa",
    "name": "PD Pompa",
    "location": "BS / R.GWT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD Hydrant",
    "name": "PD Hydrant",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP main pump",
    "name": "PP main pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Jokey pump",
    "name": "PP Jokey pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Diesel pump",
    "name": "PP Diesel pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP solar",
    "name": "PP solar",
    "location": "BS / R.SOLAR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Dumwaiter 1",
    "name": "PP Dumwaiter 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Dumbwaiter 2",
    "name": "PP Dumbwaiter 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Luar POS 1",
    "name": "PP Luar POS 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP sumpit 1",
    "name": "PP sumpit 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP sumpit 2",
    "name": "PP sumpit 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP sumpit 3",
    "name": "PP sumpit 3",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP sumpit 4",
    "name": "PP sumpit 4",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP sumpit 5",
    "name": "PP sumpit 5",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP sumpit 6",
    "name": "PP sumpit 6",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP sumpit Geastrep",
    "name": "PP sumpit Geastrep",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP STP",
    "name": "PP STP",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Netralisir",
    "name": "PP Netralisir",
    "location": "BS / PARKIRAN MOTOR BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP CONTROL",
    "name": "PP CONTROL",
    "location": "BS / R.CONTROL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP.OT",
    "name": "PP.OT",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "P.UPS.OP",
    "name": "P.UPS.OP",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD.EMERGENSI",
    "name": "PD.EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "P.UPS-EMERGENSI",
    "name": "P.UPS-EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP OT",
    "name": "PP OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP UPS OT",
    "name": "PP UPS OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP MEDICAL GAS",
    "name": "PP MEDICAL GAS",
    "location": "LT1 / R.PANEL GAS MEDIS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Isolasi emergensi",
    "name": "PP Isolasi emergensi",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD lt 1",
    "name": "PD lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP HVAC Lt 1",
    "name": "PP HVAC Lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Aerocom",
    "name": "PP Aerocom",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP AHU OT",
    "name": "PP AHU OT",
    "location": "LT1 / UNIT AHU OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP TK 1",
    "name": "PP TK 1",
    "location": "LT1 / SAMPING ATM LOBBY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD Lt 2",
    "name": "PD Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP HVAC Lt 2",
    "name": "PP HVAC Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP UPS lt 2",
    "name": "PP UPS lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP MRI",
    "name": "PP MRI",
    "location": "LT2 / R.MRI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Fluroskopy",
    "name": "PP Fluroskopy",
    "location": "LT2 / R.FLOROSCOPY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP X Ray",
    "name": "PP X Ray",
    "location": "LT2 / R.X RAY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Radiology",
    "name": "PP Radiology",
    "location": "LT2 / NS.RADIOLOGI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP MCU",
    "name": "PP MCU",
    "location": "LT2 / DEPAN NS MCU",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP OPD LT2",
    "name": "PP OPD LT2",
    "location": "LT2 / POLY UMUM",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Rehab medik",
    "name": "PP Rehab medik",
    "location": "LT3 / NS.REHAB MEDIC",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD.LT 3",
    "name": "PD.LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP HVAC LT 3",
    "name": "PP HVAC LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP UPS LT3",
    "name": "PP UPS LT3",
    "location": "LT3 / POLI LT.3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP OPD LT3",
    "name": "PP OPD LT3",
    "location": "LT3 / OPD LT 3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP UPS LAB LT3",
    "name": "PP UPS LAB LT3",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP FARMACY",
    "name": "PP FARMACY",
    "location": "LT3 / R.PHARMACY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP LAB",
    "name": "PP LAB",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD LT5",
    "name": "PD LT5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP.VAC LT.5",
    "name": "PP.VAC LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP UPS LT.5",
    "name": "PP UPS LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD lt 6",
    "name": "PD lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP HVAC lt 6",
    "name": "PP HVAC lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD UPS 1 lt 6",
    "name": "PD UPS 1 lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD UPS 2  lt 6",
    "name": "PD UPS 2  lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP LDR",
    "name": "PP LDR",
    "location": "LT6 / R.LDR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP ODC",
    "name": "PP ODC",
    "location": "LT6 / R.KEMOTERAPI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "P.UPS HD",
    "name": "P.UPS HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP HD",
    "name": "PP HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD lt 7",
    "name": "PD lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP HVAC lt 7",
    "name": "PP HVAC lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP UPS lt 7",
    "name": "PP UPS lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD lt 8",
    "name": "PD lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP HVAC lt 8",
    "name": "PP HVAC lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP UPS lt 8",
    "name": "PP UPS lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD lt 9",
    "name": "PD lt 9",
    "location": "LT9 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP HVAC lt 9",
    "name": "PP HVAC lt 9",
    "location": "LT9 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Office",
    "name": "PP Office",
    "location": "LT9 / R. POLY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP IT",
    "name": "PP IT",
    "location": "LT9 / R. IT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PP Kitchen",
    "name": "PP Kitchen",
    "location": "LT9 / R.KICHEN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "DB Chiller",
    "name": "DB Chiller",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Januari",
    "code": "PD emergensi",
    "name": "PD emergensi",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PD.LIFT",
    "name": "PD.LIFT",
    "location": "LT.10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PP LIFT SERVICE 1",
    "name": "PP LIFT SERVICE 1",
    "location": "LT.10 / RUMAH LIFT SERVICE KOTOR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PP LIFT SERVICE 2",
    "name": "PP LIFT SERVICE 2",
    "location": "LT.10 / RUMAH LIFT SERVICE BERSIH",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PP.VAC",
    "name": "PP.VAC",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PP MEETING ROOM",
    "name": "PP MEETING ROOM",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PP FUCTIVITION",
    "name": "PP FUCTIVITION",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PP.PF 1",
    "name": "PP.PF 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PP.PF 2",
    "name": "PP.PF 2",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PP.STAF LIFT",
    "name": "PP.STAF LIFT",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PP-LIFT PUBLIC 1",
    "name": "PP-LIFT PUBLIC 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "TRAFO 1",
    "name": "TRAFO 1",
    "location": "BS / LVMDP",
    "periode": "Periode 1 tahun"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PUTR 1",
    "name": "PUTR 1",
    "location": "BS / LVMDP",
    "periode": "Periode 1 Tahun"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "PUTR 2",
    "name": "PUTR 2",
    "location": "BS / LVMDP",
    "periode": "Periode 1 Tahun"
  },
  {
    "group": "PANEL",
    "month": "Februari",
    "code": "TRAFO 2",
    "name": "TRAFO 2",
    "location": "BS / LVMDP",
    "periode": "Periode 1 tahun"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PKG 1",
    "name": "PKG 1",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PKG 2",
    "name": "PKG 2",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD Basement",
    "name": "PD Basement",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP HVAC lt B",
    "name": "PP HVAC lt B",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Parkir",
    "name": "PP Parkir",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "SDB emergensi",
    "name": "SDB emergensi",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD Pompa",
    "name": "PD Pompa",
    "location": "BS / R.GWT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD Hydrant",
    "name": "PD Hydrant",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP main pump",
    "name": "PP main pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Jokey pump",
    "name": "PP Jokey pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Diesel pump",
    "name": "PP Diesel pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP solar",
    "name": "PP solar",
    "location": "BS / R.SOLAR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Dumwaiter 1",
    "name": "PP Dumwaiter 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Dumbwaiter 2",
    "name": "PP Dumbwaiter 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Tenant",
    "name": "PP Tenant",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP sumpit 1",
    "name": "PP sumpit 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP sumpit 2",
    "name": "PP sumpit 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP sumpit 3",
    "name": "PP sumpit 3",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP sumpit 4",
    "name": "PP sumpit 4",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP sumpit 5",
    "name": "PP sumpit 5",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP sumpit 6",
    "name": "PP sumpit 6",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP sumpit Geastrep",
    "name": "PP sumpit Geastrep",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP STP",
    "name": "PP STP",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Netralisir",
    "name": "PP Netralisir",
    "location": "BS / PARKIRAN MOTOR BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP CONTROL",
    "name": "PP CONTROL",
    "location": "BS / R.CONTROL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP.OT",
    "name": "PP.OT",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "P.UPS.OP",
    "name": "P.UPS.OP",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD.EMERGENSI",
    "name": "PD.EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "P.UPS-EMERGENSI",
    "name": "P.UPS-EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP OT",
    "name": "PP OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP UPS OT",
    "name": "PP UPS OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP MEDICAL GAS",
    "name": "PP MEDICAL GAS",
    "location": "LT1 / R.PANEL GAS MEDIS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Isolasi emergensi",
    "name": "PP Isolasi emergensi",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD lt 1",
    "name": "PD lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP HVAC Lt 1",
    "name": "PP HVAC Lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Aerocom",
    "name": "PP Aerocom",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP AHU OT",
    "name": "PP AHU OT",
    "location": "LT1 / UNIT AHU OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP TK 1",
    "name": "PP TK 1",
    "location": "LT1 / SAMPING ATM LOBBY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD Lt 2",
    "name": "PD Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP HVAC Lt 2",
    "name": "PP HVAC Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP UPS lt 2",
    "name": "PP UPS lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP MRI",
    "name": "PP MRI",
    "location": "LT2 / R.MRI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Fluroskopy",
    "name": "PP Fluroskopy",
    "location": "LT2 / R.FLOROSCOPY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP X Ray",
    "name": "PP X Ray",
    "location": "LT2 / R.X RAY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Radiology",
    "name": "PP Radiology",
    "location": "LT2 / NS.RADIOLOGI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP MCU",
    "name": "PP MCU",
    "location": "LT2 / DEPAN NS MCU",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP OPD LT2",
    "name": "PP OPD LT2",
    "location": "LT2 / POLY UMUM",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Rehab medik",
    "name": "PP Rehab medik",
    "location": "LT3 / NS.REHAB MEDIC",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD.LT 3",
    "name": "PD.LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP HVAC LT 3",
    "name": "PP HVAC LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP UPS LT3",
    "name": "PP UPS LT3",
    "location": "LT3 / POLI LT.3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP OPD LT3",
    "name": "PP OPD LT3",
    "location": "LT3 / OPD LT 3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP UPS LAB LT3",
    "name": "PP UPS LAB LT3",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP FARMACY",
    "name": "PP FARMACY",
    "location": "LT3 / R.PHARMACY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP LAB",
    "name": "PP LAB",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD LT5",
    "name": "PD LT5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP.VAC LT.5",
    "name": "PP.VAC LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP UPS LT.5",
    "name": "PP UPS LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD lt 6",
    "name": "PD lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP HVAC lt 6",
    "name": "PP HVAC lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD UPS 1 lt 6",
    "name": "PD UPS 1 lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD UPS 2  lt 6",
    "name": "PD UPS 2  lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP LDR",
    "name": "PP LDR",
    "location": "LT6 / R.LDR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP ODC",
    "name": "PP ODC",
    "location": "LT6 / R.KEMOTERAPI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "P.UPS HD",
    "name": "P.UPS HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP HD",
    "name": "PP HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD lt 7",
    "name": "PD lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP HVAC lt 7",
    "name": "PP HVAC lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP UPS lt 7",
    "name": "PP UPS lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD lt 8",
    "name": "PD lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP HVAC lt 8",
    "name": "PP HVAC lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP UPS lt 8",
    "name": "PP UPS lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD lt 9",
    "name": "PD lt 9",
    "location": "LT9 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP HVAC lt 9",
    "name": "PP HVAC lt 9",
    "location": "LT9 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Office",
    "name": "PP Office",
    "location": "LT9 / R. POLY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP IT",
    "name": "PP IT",
    "location": "LT9 / R. IT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PP Kitchen",
    "name": "PP Kitchen",
    "location": "LT9 / R.KICHEN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "DB Chiller",
    "name": "DB Chiller",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Maret",
    "code": "PD emergensi",
    "name": "PD emergensi",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "April",
    "code": "PD.LIFT",
    "name": "PD.LIFT",
    "location": "LT.10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "April",
    "code": "PP LIFT SERVICE 1",
    "name": "PP LIFT SERVICE 1",
    "location": "LT.10 / RUMAH LIFT SERVICE KOTOR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "April",
    "code": "PP LIFT SERVICE 2",
    "name": "PP LIFT SERVICE 2",
    "location": "LT.10 / RUMAH LIFT SERVICE BERSIH",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "April",
    "code": "PP.VAC",
    "name": "PP.VAC",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "April",
    "code": "PP MEETING ROOM",
    "name": "PP MEETING ROOM",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "April",
    "code": "PP FUCTIVITION",
    "name": "PP FUCTIVITION",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "April",
    "code": "PP.PF 1",
    "name": "PP.PF 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "April",
    "code": "PP.PF 2",
    "name": "PP.PF 2",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "April",
    "code": "PP.STAF LIFT",
    "name": "PP.STAF LIFT",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "April",
    "code": "PP-LIFT PUBLIC 1",
    "name": "PP-LIFT PUBLIC 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PKG 1",
    "name": "PKG 1",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PKG 2",
    "name": "PKG 2",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD Basement",
    "name": "PD Basement",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP HVAC lt B",
    "name": "PP HVAC lt B",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Parkir",
    "name": "PP Parkir",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "SDB emergensi",
    "name": "SDB emergensi",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD Pompa",
    "name": "PD Pompa",
    "location": "BS / R.GWT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD Hydrant",
    "name": "PD Hydrant",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP main pump",
    "name": "PP main pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Jokey pump",
    "name": "PP Jokey pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Diesel pump",
    "name": "PP Diesel pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP solar",
    "name": "PP solar",
    "location": "BS / R.SOLAR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Dumwaiter 1",
    "name": "PP Dumwaiter 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Dumbwaiter 2",
    "name": "PP Dumbwaiter 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Tenant",
    "name": "PP Tenant",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP sumpit 1",
    "name": "PP sumpit 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP sumpit 2",
    "name": "PP sumpit 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP sumpit 3",
    "name": "PP sumpit 3",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP sumpit 4",
    "name": "PP sumpit 4",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP sumpit 5",
    "name": "PP sumpit 5",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP sumpit 6",
    "name": "PP sumpit 6",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP sumpit Geastrep",
    "name": "PP sumpit Geastrep",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP STP",
    "name": "PP STP",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Netralisir",
    "name": "PP Netralisir",
    "location": "BS / PARKIRAN MOTOR BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP CONTROL",
    "name": "PP CONTROL",
    "location": "BS / R.CONTROL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP.OT",
    "name": "PP.OT",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "P.UPS.OP",
    "name": "P.UPS.OP",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD.EMERGENSI",
    "name": "PD.EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "P.UPS-EMERGENSI",
    "name": "P.UPS-EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP OT",
    "name": "PP OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP UPS OT",
    "name": "PP UPS OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP MEDICAL GAS",
    "name": "PP MEDICAL GAS",
    "location": "LT1 / R.PANEL GAS MEDIS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Isolasi emergensi",
    "name": "PP Isolasi emergensi",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD lt 1",
    "name": "PD lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP HVAC Lt 1",
    "name": "PP HVAC Lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Aerocom",
    "name": "PP Aerocom",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP AHU OT",
    "name": "PP AHU OT",
    "location": "LT1 / UNIT AHU OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP TK 1",
    "name": "PP TK 1",
    "location": "LT1 / SAMPING ATM LOBBY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD Lt 2",
    "name": "PD Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP HVAC Lt 2",
    "name": "PP HVAC Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP UPS lt 2",
    "name": "PP UPS lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP MRI",
    "name": "PP MRI",
    "location": "LT2 / R.MRI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Fluroskopy",
    "name": "PP Fluroskopy",
    "location": "LT2 / R.FLOROSCOPY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP X Ray",
    "name": "PP X Ray",
    "location": "LT2 / R.X RAY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Radiology",
    "name": "PP Radiology",
    "location": "LT2 / NS.RADIOLOGI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP MCU",
    "name": "PP MCU",
    "location": "LT2 / DEPAN NS MCU",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP OPD LT2",
    "name": "PP OPD LT2",
    "location": "LT2 / POLY UMUM",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Rehab medik",
    "name": "PP Rehab medik",
    "location": "LT3 / NS.REHAB MEDIC",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD.LT 3",
    "name": "PD.LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP HVAC LT 3",
    "name": "PP HVAC LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP UPS LT3",
    "name": "PP UPS LT3",
    "location": "LT3 / POLI LT.3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP OPD LT3",
    "name": "PP OPD LT3",
    "location": "LT3 / OPD LT 3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP UPS LAB LT3",
    "name": "PP UPS LAB LT3",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP FARMACY",
    "name": "PP FARMACY",
    "location": "LT3 / R.PHARMACY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP LAB",
    "name": "PP LAB",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD LT5",
    "name": "PD LT5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP.VAC LT.5",
    "name": "PP.VAC LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP UPS LT.5",
    "name": "PP UPS LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD lt 6",
    "name": "PD lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP HVAC lt 6",
    "name": "PP HVAC lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD UPS 1 lt 6",
    "name": "PD UPS 1 lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD UPS 2  lt 6",
    "name": "PD UPS 2  lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP LDR",
    "name": "PP LDR",
    "location": "LT6 / R.LDR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP ODC",
    "name": "PP ODC",
    "location": "LT6 / R.KEMOTERAPI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "P.UPS HD",
    "name": "P.UPS HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP HD",
    "name": "PP HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD lt 7",
    "name": "PD lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP HVAC lt 7",
    "name": "PP HVAC lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP UPS lt 7",
    "name": "PP UPS lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD lt 8",
    "name": "PD lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP HVAC lt 8",
    "name": "PP HVAC lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP UPS lt 8",
    "name": "PP UPS lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD lt 9",
    "name": "PD lt 9",
    "location": "LT9 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP HVAC lt 9",
    "name": "PP HVAC lt 9",
    "location": "LT9 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Office",
    "name": "PP Office",
    "location": "LT9 / R. POLY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP IT",
    "name": "PP IT",
    "location": "LT9 / R. IT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PP Kitchen",
    "name": "PP Kitchen",
    "location": "LT9 / R.KICHEN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "DB Chiller",
    "name": "DB Chiller",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Mei",
    "code": "PD emergensi",
    "name": "PD emergensi",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juni",
    "code": "PD.LIFT",
    "name": "PD.LIFT",
    "location": "LT.10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juni",
    "code": "PP LIFT SERVICE 1",
    "name": "PP LIFT SERVICE 1",
    "location": "LT.10 / RUMAH LIFT SERVICE KOTOR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juni",
    "code": "PP LIFT SERVICE 2",
    "name": "PP LIFT SERVICE 2",
    "location": "LT.10 / RUMAH LIFT SERVICE BERSIH",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juni",
    "code": "PP.VAC",
    "name": "PP.VAC",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juni",
    "code": "PP MEETING ROOM",
    "name": "PP MEETING ROOM",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juni",
    "code": "PP FUCTIVITION",
    "name": "PP FUCTIVITION",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juni",
    "code": "PP.PF 1",
    "name": "PP.PF 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juni",
    "code": "PP.PF 2",
    "name": "PP.PF 2",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juni",
    "code": "PP.STAF LIFT",
    "name": "PP.STAF LIFT",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juni",
    "code": "PP-LIFT PUBLIC 1",
    "name": "PP-LIFT PUBLIC 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PKG 1",
    "name": "PKG 1",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PKG 2",
    "name": "PKG 2",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD Basement",
    "name": "PD Basement",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP HVAC lt B",
    "name": "PP HVAC lt B",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Parkir",
    "name": "PP Parkir",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "SDB emergensi",
    "name": "SDB emergensi",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD Pompa",
    "name": "PD Pompa",
    "location": "BS / R.GWT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD Hydrant",
    "name": "PD Hydrant",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP main pump",
    "name": "PP main pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Jokey pump",
    "name": "PP Jokey pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Diesel pump",
    "name": "PP Diesel pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP solar",
    "name": "PP solar",
    "location": "BS / R.SOLAR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Dumwaiter 1",
    "name": "PP Dumwaiter 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Dumbwaiter 2",
    "name": "PP Dumbwaiter 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Tenant",
    "name": "PP Tenant",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP sumpit 1",
    "name": "PP sumpit 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP sumpit 2",
    "name": "PP sumpit 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP sumpit 3",
    "name": "PP sumpit 3",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP sumpit 4",
    "name": "PP sumpit 4",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP sumpit 5",
    "name": "PP sumpit 5",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP sumpit 6",
    "name": "PP sumpit 6",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP sumpit Geastrep",
    "name": "PP sumpit Geastrep",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP STP",
    "name": "PP STP",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Netralisir",
    "name": "PP Netralisir",
    "location": "BS / PARKIRAN MOTOR BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP CONTROL",
    "name": "PP CONTROL",
    "location": "BS / R.CONTROL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP.OT",
    "name": "PP.OT",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "P.UPS.OP",
    "name": "P.UPS.OP",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD.EMERGENSI",
    "name": "PD.EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "P.UPS-EMERGENSI",
    "name": "P.UPS-EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP OT",
    "name": "PP OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP UPS OT",
    "name": "PP UPS OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP MEDICAL GAS",
    "name": "PP MEDICAL GAS",
    "location": "LT1 / R.PANEL GAS MEDIS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Isolasi emergensi",
    "name": "PP Isolasi emergensi",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD lt 1",
    "name": "PD lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP HVAC Lt 1",
    "name": "PP HVAC Lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Aerocom",
    "name": "PP Aerocom",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP AHU OT",
    "name": "PP AHU OT",
    "location": "LT1 / UNIT AHU OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP TK 1",
    "name": "PP TK 1",
    "location": "LT1 / SAMPING ATM LOBBY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD Lt 2",
    "name": "PD Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP HVAC Lt 2",
    "name": "PP HVAC Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP UPS lt 2",
    "name": "PP UPS lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP MRI",
    "name": "PP MRI",
    "location": "LT2 / R.MRI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Fluroskopy",
    "name": "PP Fluroskopy",
    "location": "LT2 / R.FLOROSCOPY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP X Ray",
    "name": "PP X Ray",
    "location": "LT2 / R.X RAY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Radiology",
    "name": "PP Radiology",
    "location": "LT2 / NS.RADIOLOGI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP MCU",
    "name": "PP MCU",
    "location": "LT2 / DEPAN NS MCU",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP OPD LT2",
    "name": "PP OPD LT2",
    "location": "LT2 / POLY UMUM",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Rehab medik",
    "name": "PP Rehab medik",
    "location": "LT3 / NS.REHAB MEDIC",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD.LT 3",
    "name": "PD.LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP HVAC LT 3",
    "name": "PP HVAC LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP UPS LT3",
    "name": "PP UPS LT3",
    "location": "LT3 / POLI LT.3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP OPD LT3",
    "name": "PP OPD LT3",
    "location": "LT3 / OPD LT 3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP UPS LAB LT3",
    "name": "PP UPS LAB LT3",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP FARMACY",
    "name": "PP FARMACY",
    "location": "LT3 / R.PHARMACY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP LAB",
    "name": "PP LAB",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD LT5",
    "name": "PD LT5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP.VAC LT.5",
    "name": "PP.VAC LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP UPS LT.5",
    "name": "PP UPS LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD lt 6",
    "name": "PD lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP HVAC lt 6",
    "name": "PP HVAC lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD UPS 1 lt 6",
    "name": "PD UPS 1 lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD UPS 2  lt 6",
    "name": "PD UPS 2  lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP LDR",
    "name": "PP LDR",
    "location": "LT6 / R.LDR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP ODC",
    "name": "PP ODC",
    "location": "LT6 / R.KEMOTERAPI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "P.UPS HD",
    "name": "P.UPS HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP HD",
    "name": "PP HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD lt 7",
    "name": "PD lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP HVAC lt 7",
    "name": "PP HVAC lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP UPS lt 7",
    "name": "PP UPS lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD lt 8",
    "name": "PD lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP HVAC lt 8",
    "name": "PP HVAC lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP UPS lt 8",
    "name": "PP UPS lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD lt 9",
    "name": "PD lt 9",
    "location": "LT9 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP HVAC lt 9",
    "name": "PP HVAC lt 9",
    "location": "LT9 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Office",
    "name": "PP Office",
    "location": "LT9 / R. POLY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP IT",
    "name": "PP IT",
    "location": "LT9 / R. IT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PP Kitchen",
    "name": "PP Kitchen",
    "location": "LT9 / R.KICHEN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "DB Chiller",
    "name": "DB Chiller",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Juli",
    "code": "PD emergensi",
    "name": "PD emergensi",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Agustus",
    "code": "PD.LIFT",
    "name": "PD.LIFT",
    "location": "LT.10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Agustus",
    "code": "PP LIFT SERVICE 1",
    "name": "PP LIFT SERVICE 1",
    "location": "LT.10 / RUMAH LIFT SERVICE KOTOR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Agustus",
    "code": "PP LIFT SERVICE 2",
    "name": "PP LIFT SERVICE 2",
    "location": "LT.10 / RUMAH LIFT SERVICE BERSIH",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Agustus",
    "code": "PP.VAC",
    "name": "PP.VAC",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Agustus",
    "code": "PP MEETING ROOM",
    "name": "PP MEETING ROOM",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Agustus",
    "code": "PP FUCTIVITION",
    "name": "PP FUCTIVITION",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Agustus",
    "code": "PP.PF 1",
    "name": "PP.PF 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Agustus",
    "code": "PP.PF 2",
    "name": "PP.PF 2",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Agustus",
    "code": "PP.STAF LIFT",
    "name": "PP.STAF LIFT",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Agustus",
    "code": "PP-LIFT PUBLIC 1",
    "name": "PP-LIFT PUBLIC 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PKG 1",
    "name": "PKG 1",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PKG 2",
    "name": "PKG 2",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD Basement",
    "name": "PD Basement",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP HVAC lt B",
    "name": "PP HVAC lt B",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Parkir",
    "name": "PP Parkir",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "SDB emergensi",
    "name": "SDB emergensi",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD Pompa",
    "name": "PD Pompa",
    "location": "BS / R.GWT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD Hydrant",
    "name": "PD Hydrant",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP main pump",
    "name": "PP main pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Jokey pump",
    "name": "PP Jokey pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Diesel pump",
    "name": "PP Diesel pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP solar",
    "name": "PP solar",
    "location": "BS / R.SOLAR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Dumwaiter 1",
    "name": "PP Dumwaiter 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Dumbwaiter 2",
    "name": "PP Dumbwaiter 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Tenant",
    "name": "PP Tenant",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP sumpit 1",
    "name": "PP sumpit 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP sumpit 2",
    "name": "PP sumpit 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP sumpit 3",
    "name": "PP sumpit 3",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP sumpit 4",
    "name": "PP sumpit 4",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP sumpit 5",
    "name": "PP sumpit 5",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP sumpit 6",
    "name": "PP sumpit 6",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP sumpit Geastrep",
    "name": "PP sumpit Geastrep",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP STP",
    "name": "PP STP",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Netralisir",
    "name": "PP Netralisir",
    "location": "BS / PARKIRAN MOTOR BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP CONTROL",
    "name": "PP CONTROL",
    "location": "BS / R.CONTROL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP.OT",
    "name": "PP.OT",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "P.UPS.OP",
    "name": "P.UPS.OP",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD.EMERGENSI",
    "name": "PD.EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "P.UPS-EMERGENSI",
    "name": "P.UPS-EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP OT",
    "name": "PP OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP UPS OT",
    "name": "PP UPS OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP MEDICAL GAS",
    "name": "PP MEDICAL GAS",
    "location": "LT1 / R.PANEL GAS MEDIS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Isolasi emergensi",
    "name": "PP Isolasi emergensi",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD lt 1",
    "name": "PD lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP HVAC Lt 1",
    "name": "PP HVAC Lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Aerocom",
    "name": "PP Aerocom",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP AHU OT",
    "name": "PP AHU OT",
    "location": "LT1 / UNIT AHU OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP TK 1",
    "name": "PP TK 1",
    "location": "LT1 / SAMPING ATM LOBBY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD Lt 2",
    "name": "PD Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP HVAC Lt 2",
    "name": "PP HVAC Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP UPS lt 2",
    "name": "PP UPS lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP MRI",
    "name": "PP MRI",
    "location": "LT2 / R.MRI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Fluroskopy",
    "name": "PP Fluroskopy",
    "location": "LT2 / R.FLOROSCOPY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP X Ray",
    "name": "PP X Ray",
    "location": "LT2 / R.X RAY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Radiology",
    "name": "PP Radiology",
    "location": "LT2 / NS.RADIOLOGI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP MCU",
    "name": "PP MCU",
    "location": "LT2 / DEPAN NS MCU",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP OPD LT2",
    "name": "PP OPD LT2",
    "location": "LT2 / POLY UMUM",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Rehab medik",
    "name": "PP Rehab medik",
    "location": "LT3 / NS.REHAB MEDIC",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD.LT 3",
    "name": "PD.LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP HVAC LT 3",
    "name": "PP HVAC LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP UPS LT3",
    "name": "PP UPS LT3",
    "location": "LT3 / POLI LT.3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP OPD LT3",
    "name": "PP OPD LT3",
    "location": "LT3 / OPD LT 3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP UPS LAB LT3",
    "name": "PP UPS LAB LT3",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP FARMACY",
    "name": "PP FARMACY",
    "location": "LT3 / R.PHARMACY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP LAB",
    "name": "PP LAB",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD LT5",
    "name": "PD LT5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP.VAC LT.5",
    "name": "PP.VAC LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP UPS LT.5",
    "name": "PP UPS LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD lt 6",
    "name": "PD lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP HVAC lt 6",
    "name": "PP HVAC lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD UPS 1 lt 6",
    "name": "PD UPS 1 lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD UPS 2  lt 6",
    "name": "PD UPS 2  lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP LDR",
    "name": "PP LDR",
    "location": "LT6 / R.LDR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP ODC",
    "name": "PP ODC",
    "location": "LT6 / R.KEMOTERAPI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "P.UPS HD",
    "name": "P.UPS HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP HD",
    "name": "PP HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD lt 7",
    "name": "PD lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP HVAC lt 7",
    "name": "PP HVAC lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP UPS lt 7",
    "name": "PP UPS lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD lt 8",
    "name": "PD lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP HVAC lt 8",
    "name": "PP HVAC lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP UPS lt 8",
    "name": "PP UPS lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD lt 9",
    "name": "PD lt 9",
    "location": "LT9 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP HVAC lt 9",
    "name": "PP HVAC lt 9",
    "location": "LT9 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Office",
    "name": "PP Office",
    "location": "LT9 / R. POLY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP IT",
    "name": "PP IT",
    "location": "LT9 / R. IT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PP Kitchen",
    "name": "PP Kitchen",
    "location": "LT9 / R.KICHEN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "DB Chiller",
    "name": "DB Chiller",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "September",
    "code": "PD emergensi",
    "name": "PD emergensi",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Oktober",
    "code": "PD.LIFT",
    "name": "PD.LIFT",
    "location": "LT.10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Oktober",
    "code": "PP LIFT SERVICE 1",
    "name": "PP LIFT SERVICE 1",
    "location": "LT.10 / RUMAH LIFT SERVICE KOTOR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Oktober",
    "code": "PP LIFT SERVICE 2",
    "name": "PP LIFT SERVICE 2",
    "location": "LT.10 / RUMAH LIFT SERVICE BERSIH",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Oktober",
    "code": "PP.VAC",
    "name": "PP.VAC",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Oktober",
    "code": "PP MEETING ROOM",
    "name": "PP MEETING ROOM",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Oktober",
    "code": "PP FUCTIVITION",
    "name": "PP FUCTIVITION",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Oktober",
    "code": "PP.PF 1",
    "name": "PP.PF 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Oktober",
    "code": "PP.PF 2",
    "name": "PP.PF 2",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Oktober",
    "code": "PP.STAF LIFT",
    "name": "PP.STAF LIFT",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Oktober",
    "code": "PP-LIFT PUBLIC 1",
    "name": "PP-LIFT PUBLIC 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PKG 1",
    "name": "PKG 1",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PKG 2",
    "name": "PKG 2",
    "location": "BS / R.PKG",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD Basement",
    "name": "PD Basement",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP HVAC lt B",
    "name": "PP HVAC lt B",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Parkir",
    "name": "PP Parkir",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "SDB emergensi",
    "name": "SDB emergensi",
    "location": "BS / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD Pompa",
    "name": "PD Pompa",
    "location": "BS / R.GWT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD Hydrant",
    "name": "PD Hydrant",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP main pump",
    "name": "PP main pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Jokey pump",
    "name": "PP Jokey pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Diesel pump",
    "name": "PP Diesel pump",
    "location": "BS / R.HIDRAN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP solar",
    "name": "PP solar",
    "location": "BS / R.SOLAR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Dumwaiter 1",
    "name": "PP Dumwaiter 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Dumbwaiter 2",
    "name": "PP Dumbwaiter 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Tenant",
    "name": "PP Tenant",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP sumpit 1",
    "name": "PP sumpit 1",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP sumpit 2",
    "name": "PP sumpit 2",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP sumpit 3",
    "name": "PP sumpit 3",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP sumpit 4",
    "name": "PP sumpit 4",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP sumpit 5",
    "name": "PP sumpit 5",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP sumpit 6",
    "name": "PP sumpit 6",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP sumpit Geastrep",
    "name": "PP sumpit Geastrep",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP STP",
    "name": "PP STP",
    "location": "BS / AREA BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Netralisir",
    "name": "PP Netralisir",
    "location": "BS / PARKIRAN MOTOR BESMENT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP CONTROL",
    "name": "PP CONTROL",
    "location": "BS / R.CONTROL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP.OT",
    "name": "PP.OT",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "P.UPS.OP",
    "name": "P.UPS.OP",
    "location": "LT1 / KORIDOR EXIT OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD.EMERGENSI",
    "name": "PD.EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "P.UPS-EMERGENSI",
    "name": "P.UPS-EMERGENSI",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP OT",
    "name": "PP OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP UPS OT",
    "name": "PP UPS OT",
    "location": "LT1 / R.UPS OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP MEDICAL GAS",
    "name": "PP MEDICAL GAS",
    "location": "LT1 / R.PANEL GAS MEDIS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Isolasi emergensi",
    "name": "PP Isolasi emergensi",
    "location": "LT1 / KORIDOR IGD",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD lt 1",
    "name": "PD lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP HVAC Lt 1",
    "name": "PP HVAC Lt 1",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Aerocom",
    "name": "PP Aerocom",
    "location": "LT1 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP AHU OT",
    "name": "PP AHU OT",
    "location": "LT1 / UNIT AHU OT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP TK 1",
    "name": "PP TK 1",
    "location": "LT1 / SAMPING ATM LOBBY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD Lt 2",
    "name": "PD Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP HVAC Lt 2",
    "name": "PP HVAC Lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP UPS lt 2",
    "name": "PP UPS lt 2",
    "location": "LT2 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP MRI",
    "name": "PP MRI",
    "location": "LT2 / R.MRI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Fluroskopy",
    "name": "PP Fluroskopy",
    "location": "LT2 / R.FLOROSCOPY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP X Ray",
    "name": "PP X Ray",
    "location": "LT2 / R.X RAY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Radiology",
    "name": "PP Radiology",
    "location": "LT2 / NS.RADIOLOGI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP MCU",
    "name": "PP MCU",
    "location": "LT2 / DEPAN NS MCU",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP OPD LT2",
    "name": "PP OPD LT2",
    "location": "LT2 / POLY UMUM",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Rehab medik",
    "name": "PP Rehab medik",
    "location": "LT3 / NS.REHAB MEDIC",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD.LT 3",
    "name": "PD.LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP HVAC LT 3",
    "name": "PP HVAC LT 3",
    "location": "LT3 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP UPS LT3",
    "name": "PP UPS LT3",
    "location": "LT3 / POLI LT.3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP OPD LT3",
    "name": "PP OPD LT3",
    "location": "LT3 / OPD LT 3",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP UPS LAB LT3",
    "name": "PP UPS LAB LT3",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP FARMACY",
    "name": "PP FARMACY",
    "location": "LT3 / R.PHARMACY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP LAB",
    "name": "PP LAB",
    "location": "LT3 / R.LAB",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD LT5",
    "name": "PD LT5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP.VAC LT.5",
    "name": "PP.VAC LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP UPS LT.5",
    "name": "PP UPS LT.5",
    "location": "LT5 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD lt 6",
    "name": "PD lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP HVAC lt 6",
    "name": "PP HVAC lt 6",
    "location": "LT6 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD UPS 1 lt 6",
    "name": "PD UPS 1 lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD UPS 2  lt 6",
    "name": "PD UPS 2  lt 6",
    "location": "LT6 / R.UPS",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP LDR",
    "name": "PP LDR",
    "location": "LT6 / R.LDR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP ODC",
    "name": "PP ODC",
    "location": "LT6 / R.KEMOTERAPI",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "P.UPS HD",
    "name": "P.UPS HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP HD",
    "name": "PP HD",
    "location": "LT6 / RUANG RO",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD lt 7",
    "name": "PD lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP HVAC lt 7",
    "name": "PP HVAC lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP UPS lt 7",
    "name": "PP UPS lt 7",
    "location": "LT7 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD lt 8",
    "name": "PD lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP HVAC lt 8",
    "name": "PP HVAC lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP UPS lt 8",
    "name": "PP UPS lt 8",
    "location": "LT8 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD lt 9",
    "name": "PD lt 9",
    "location": "LT9 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP HVAC lt 9",
    "name": "PP HVAC lt 9",
    "location": "LT9 / R. PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Office",
    "name": "PP Office",
    "location": "LT9 / R. POLY",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP IT",
    "name": "PP IT",
    "location": "LT9 / R. IT",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PP Kitchen",
    "name": "PP Kitchen",
    "location": "LT9 / R.KICHEN",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "DB Chiller",
    "name": "DB Chiller",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "November",
    "code": "PD emergensi",
    "name": "PD emergensi",
    "location": "LT10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Desember",
    "code": "PD.LIFT",
    "name": "PD.LIFT",
    "location": "LT.10 / R.PANEL",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Desember",
    "code": "PP LIFT SERVICE 1",
    "name": "PP LIFT SERVICE 1",
    "location": "LT.10 / RUMAH LIFT SERVICE KOTOR",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Desember",
    "code": "PP LIFT SERVICE 2",
    "name": "PP LIFT SERVICE 2",
    "location": "LT.10 / RUMAH LIFT SERVICE BERSIH",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Desember",
    "code": "PP.VAC",
    "name": "PP.VAC",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Desember",
    "code": "PP MEETING ROOM",
    "name": "PP MEETING ROOM",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Desember",
    "code": "PP FUCTIVITION",
    "name": "PP FUCTIVITION",
    "location": "LT.10 / RUMAH POMPA BUSTER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Desember",
    "code": "PP.PF 1",
    "name": "PP.PF 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Desember",
    "code": "PP.PF 2",
    "name": "PP.PF 2",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Desember",
    "code": "PP.STAF LIFT",
    "name": "PP.STAF LIFT",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  },
  {
    "group": "PANEL",
    "month": "Desember",
    "code": "PP-LIFT PUBLIC 1",
    "name": "PP-LIFT PUBLIC 1",
    "location": "LT.10 / RUMAH LIFT PESSENGER",
    "periode": "Periode 2 Bulan"
  }
];
const PM_SCHEDULE = _DATA;
function QRScannerDialog({
  open,
  onOpenChange,
  onDetected
}) {
  const containerId = "qr-reader-container";
  const scannerRef = useRef(null);
  const [error, setError] = useState(null);
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
          () => {
          }
        );
        if (!cancelled) setStarting(false);
      } catch (e) {
        setError(e?.message ?? "Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.");
        setStarting(false);
      }
    };
    const stop = async () => {
      const s = scannerRef.current;
      scannerRef.current = null;
      if (!s) return;
      try {
        if (s.isScanning) await s.stop();
      } catch {
      }
      try {
        await s.clear();
      } catch {
      }
    };
    start();
    return () => {
      cancelled = true;
      stop();
    };
  }, [open]);
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ScanLine, { className: "h-4 w-4" }),
        " Scan QR Alat"
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { className: "text-xs", children: "Arahkan kamera ke QR code alat. Hasil scan akan otomatis dipakai untuk pencarian." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-square w-full overflow-hidden rounded-md border bg-black", children: [
      /* @__PURE__ */ jsx("div", { id: containerId, className: "h-full w-full [&_video]:h-full [&_video]:w-full [&_video]:object-cover" }),
      starting && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-white", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-5 w-5 animate-spin" }),
        " Memuat kamera…"
      ] })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive", children: error }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Tutup" }) })
  ] }) });
}
function SignaturePad({
  onChange,
  height = 160
}) {
  const canvasRef = useRef(null);
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
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#111";
  }, []);
  function getPos(e) {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function start(e) {
    drawing.current = true;
    empty.current = false;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    e.target.setPointerCapture(e.pointerId);
  }
  function move(e) {
    if (!drawing.current) return;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    onChange?.(canvasRef.current.toDataURL("image/png"));
    force((n) => n + 1);
  }
  function clear() {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    empty.current = true;
    onChange?.(null);
    force((n) => n + 1);
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-md border bg-white", children: /* @__PURE__ */ jsx(
      "canvas",
      {
        ref: canvasRef,
        style: { width: "100%", height, touchAction: "none", display: "block" },
        onPointerDown: start,
        onPointerMove: move,
        onPointerUp: end,
        onPointerLeave: end
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[11px] text-muted-foreground", children: [
      /* @__PURE__ */ jsx("span", { children: empty.current ? "Belum ada tanda tangan" : "Tanda tangan tersimpan" }),
      /* @__PURE__ */ jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: clear, className: "h-7", children: [
        /* @__PURE__ */ jsx(Eraser, { className: "mr-1 h-3.5 w-3.5" }),
        " Hapus"
      ] })
    ] })
  ] });
}
function checklistForItem(it) {
  const upper = it.name.toUpperCase();
  const matchers = [
    [/LIFT|BED|PASSANGER|SERVICE KOTOR|BERSIH/, "LIFT"],
    [/CHILLER/, "CHILLER"],
    [/UPS/, "UPS"],
    [/GENSET/, "GENSET"],
    [/POMPA|PUMP/, "POMPA"],
    [/PNEUMATIC|TUBE/, "PNEUMATIC_TUBE"],
    [/FIRE ALARM|MCFA/, "FIRE_ALARM"],
    [/SOUND|SPEAKER|TOA/, "SOUND_SYSTEM"],
    [/EXHAUST|FAN/, "EXHAUST_FAN"],
    [/WATER HEATER|HEATER/, "WATER_HEATER"],
    [/RO|REVERSE OSMOSIS/, "REVERSE_OSMOSIS"],
    [/AHU|FCU|AC |HVAC|SPLIT|VRV|CASSETTE/, "AC_HVAC"],
    [/PANEL|LVMDP|SDP|PP |MDP/, "PANEL_LISTRIK"]
  ];
  for (const [re, code] of matchers) {
    if (re.test(upper)) {
      const cat = PM_CATALOG.find((c) => c.code === code);
      if (cat) return cat.checklist;
    }
  }
  if (it.group === "HVAC") return PM_CATALOG.find((c) => c.code === "AC_HVAC")?.checklist ?? [];
  if (it.group === "PANEL") return PM_CATALOG.find((c) => c.code === "PANEL_LISTRIK")?.checklist ?? [];
  return [];
}
function PMItemDetailDialog({
  open,
  onOpenChange,
  item,
  onCreateTicket
}) {
  const checklist = useMemo(() => item ? checklistForItem(item) : [], [item]);
  const { user } = useAuth();
  const qc = useQueryClient();
  const [values, setValues] = useState({});
  const [pic, setPic] = useState("");
  const [remarks, setRemarks] = useState("");
  const [date, setDate] = useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [photos, setPhotos] = useState([]);
  const [signature, setSignature] = useState(null);
  const [signerName, setSignerName] = useState("");
  const fileRef = useRef(null);
  useEffect(() => {
    if (open) {
      setValues({});
      setPic("");
      setRemarks("");
      setDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
      setPhotos([]);
      setSignature(null);
      setSignerName("");
    }
  }, [open, item?.code]);
  function addFiles(list) {
    if (!list) return;
    const next = [];
    for (const f of Array.from(list)) {
      if (!f.type.startsWith("image/")) continue;
      if (f.size > 8 * 1024 * 1024) {
        toast.error(`${f.name} > 8MB, dilewati`);
        continue;
      }
      next.push({ id: crypto.randomUUID(), file: f, preview: URL.createObjectURL(f) });
    }
    setPhotos((p) => [...p, ...next]);
  }
  function removePhoto(id) {
    setPhotos((p) => {
      const x = p.find((y) => y.id === id);
      if (x) URL.revokeObjectURL(x.preview);
      return p.filter((y) => y.id !== id);
    });
  }
  async function uploadEvidence() {
    const uid = user.id;
    const stamp = Date.now();
    const photoUrls = [];
    for (let i = 0; i < photos.length; i++) {
      const ph = photos[i];
      const ext = ph.file.name.split(".").pop() || "jpg";
      const path = `${uid}/${item.code}/${stamp}-${i}.${ext}`;
      const { error } = await supabase.storage.from("pm-evidence").upload(path, ph.file, { upsert: false });
      if (error) throw error;
      photoUrls.push(path);
    }
    let sigPath = null;
    if (signature) {
      const blob = await (await fetch(signature)).blob();
      sigPath = `${uid}/${item.code}/${stamp}-signature.png`;
      const { error } = await supabase.storage.from("pm-evidence").upload(sigPath, blob, { upsert: false, contentType: "image/png" });
      if (error) throw error;
    }
    return { photo_urls: photoUrls, signature_url: sigPath };
  }
  const saveMut = useMutation({
    mutationFn: async () => {
      if (!item) return;
      const { photo_urls, signature_url } = await uploadEvidence();
      const results = checklist.map((c) => ({ item: c, value: values[c] ?? "" }));
      const lines = [
        `Kode: ${item.code}`,
        `Periode: ${item.periode}`,
        `Bulan: ${item.month}`,
        `PIC: ${pic || "—"}`,
        `Penandatangan: ${signerName || "—"}`,
        "",
        "Hasil Checklist PM:",
        ...results.map((r, i) => `${i + 1}. ${r.item} : ${r.value || "-"}`),
        "",
        remarks ? `Catatan: ${remarks}` : ""
      ].filter(Boolean).join("\n");
      const { error } = await supabase.from("preventive_maintenance").insert({
        asset_name: `${item.name} (${item.code})`,
        location: item.location,
        description: `PM ${item.group} — ${item.name}`,
        scheduled_date: date,
        completed_date: date,
        priority: "medium",
        status: "completed",
        notes: lines,
        created_by: user.id,
        photo_urls,
        signature_url,
        signer_name: signerName || pic || null,
        checklist_results: results
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Hasil PM tersimpan");
      qc.invalidateQueries({ queryKey: ["pm"] });
      onOpenChange(false);
    },
    onError: (e) => toast.error(e.message)
  });
  if (!item) return null;
  function downloadQR() {
    const canvas = document.getElementById("pm-detail-qr");
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${item.code}.png`;
    a.click();
  }
  function printQR() {
    const canvas = document.getElementById("pm-detail-qr");
    if (!canvas || !item) return;
    const url = canvas.toDataURL("image/png");
    const w = window.open("", "_blank", "width=400,height=520");
    if (!w) return;
    w.document.write(`<html><head><title>${item.code}</title></head><body style="font-family:sans-serif;text-align:center;padding:24px">
      <img src="${url}" style="width:260px;height:260px"/>
      <div style="margin-top:12px;font-weight:600">${item.name}</div>
      <div style="font-family:monospace;color:#555">${item.code}</div>
      <div style="color:#666;font-size:12px;margin-top:4px">${item.location} • ${item.periode}</div>
      <script>window.onload=()=>window.print()<\/script>
    </body></html>`);
    w.document.close();
  }
  function downloadDraftPDF() {
    if (!item) return;
    const html = `<html><head><title>PM ${item.code}</title>
      <style>body{font-family:Arial,sans-serif;padding:24px;color:#111}h1{font-size:18px;margin:0 0 4px}h2{font-size:13px;margin:16px 0 6px;border-bottom:1px solid #ccc;padding-bottom:4px}table{width:100%;border-collapse:collapse;font-size:12px}td,th{border:1px solid #ccc;padding:6px;text-align:left;vertical-align:top}.meta{font-size:12px;color:#444;margin-bottom:8px}.sig{margin-top:24px;display:flex;gap:32px}.sig div{flex:1;text-align:center}.sig img{max-height:80px}</style>
      </head><body>
      <h1>Laporan Preventive Maintenance</h1>
      <div class="meta"><b>${item.name}</b> (${item.code}) • ${item.location} • ${item.periode} • ${item.month}</div>
      <div class="meta">Tanggal: ${date} • PIC: ${pic || "—"}</div>
      <h2>Checklist Pemeriksaan</h2>
      <table><thead><tr><th style="width:30px">#</th><th>Item</th><th style="width:35%">Hasil</th></tr></thead><tbody>
      ${checklist.map((c, i) => `<tr><td>${i + 1}</td><td>${c}</td><td>${(values[c] ?? "").replace(/</g, "&lt;") || "—"}</td></tr>`).join("")}
      </tbody></table>
      ${remarks ? `<h2>Catatan</h2><div style="font-size:12px;white-space:pre-wrap">${remarks.replace(/</g, "&lt;")}</div>` : ""}
      <div class="sig">
        <div><div style="border-top:1px solid #555;padding-top:4px;font-size:11px">${signerName || "Teknisi"}</div>
          ${signature ? `<img src="${signature}"/>` : ""}
        </div>
      </div>
      <script>window.onload=()=>window.print()<\/script>
    </body></html>`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
  }
  const filledCount = checklist.filter((c) => (values[c] ?? "").trim() !== "").length;
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "font-mono text-[10px]", children: item.group }),
        item.name
      ] }),
      /* @__PURE__ */ jsxs(DialogDescription, { className: "text-xs", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono", children: item.code }),
        " • ",
        item.location || "—",
        " • ",
        item.periode || "—"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "checklist", className: "flex-1 overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "self-start", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "checklist", children: "Checklist" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "evidence", children: "Foto & TTD" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "info", children: "Info & QR" })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "checklist", className: "flex-1 overflow-auto space-y-3 mt-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Tanggal PM" }),
            /* @__PURE__ */ jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1 sm:col-span-2", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "PIC / Teknisi" }),
            /* @__PURE__ */ jsx(Input, { value: pic, onChange: (e) => setPic(e.target.value), placeholder: "Nama teknisi" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-md border", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b bg-muted/40 px-3 py-2 text-xs", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
              "Checklist Pemeriksaan (",
              checklist.length,
              " item)"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
              "Terisi: ",
              /* @__PURE__ */ jsx("b", { className: "text-foreground", children: filledCount }),
              "/",
              checklist.length
            ] })
          ] }),
          checklist.length === 0 ? /* @__PURE__ */ jsx("p", { className: "p-4 text-xs text-muted-foreground", children: "Belum ada referensi checklist khusus untuk alat ini." }) : /* @__PURE__ */ jsx("div", { className: "max-h-[40vh] overflow-auto divide-y", children: checklist.map((c, i) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-1 px-3 py-2 sm:grid-cols-[1fr_220px] sm:items-center sm:gap-3", children: [
            /* @__PURE__ */ jsxs(Label, { className: "text-xs leading-snug", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground tabular-nums mr-1", children: [
                String(i + 1).padStart(2, "0"),
                "."
              ] }),
              c
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                className: "h-8 text-xs",
                placeholder: "Hasil / nilai / OK",
                value: values[c] ?? "",
                onChange: (e) => setValues({ ...values, [c]: e.target.value })
              }
            )
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Catatan / Temuan" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              rows: 2,
              value: remarks,
              onChange: (e) => setRemarks(e.target.value),
              placeholder: "Catatan tambahan, kerusakan, tindakan…"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "evidence", className: "flex-1 overflow-auto space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold", children: [
              "Foto Bukti (",
              photos.length,
              ")"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: /* @__PURE__ */ jsxs(Button, { type: "button", size: "sm", variant: "outline", onClick: () => fileRef.current?.click(), children: [
              /* @__PURE__ */ jsx(Camera, { className: "mr-1 h-3.5 w-3.5" }),
              " Tambah Foto"
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: "image/*",
              multiple: true,
              capture: "environment",
              className: "hidden",
              onChange: (e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }
            }
          ),
          photos.length === 0 ? /* @__PURE__ */ jsx("p", { className: "rounded-md border border-dashed p-6 text-center text-xs text-muted-foreground", children: "Belum ada foto. Klik “Tambah Foto” untuk mengambil dari kamera atau galeri." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 sm:grid-cols-4", children: photos.map((p) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx("img", { src: p.preview, alt: "", className: "aspect-square w-full rounded-md object-cover border" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => removePhoto(p.id),
                className: "absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100",
                children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
              }
            )
          ] }, p.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs font-semibold", children: "Tanda Tangan Online" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: signerName,
              onChange: (e) => setSignerName(e.target.value),
              placeholder: "Nama penandatangan",
              className: "h-8 text-xs"
            }
          ),
          /* @__PURE__ */ jsx(SignaturePad, { onChange: setSignature })
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "info", className: "flex-1 overflow-auto mt-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 rounded-md border bg-white p-4 text-center", children: [
        /* @__PURE__ */ jsx(QRCodeCanvas, { id: "pm-detail-qr", value: item.code, size: 220, includeMargin: true, level: "M" }),
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[11px] text-muted-foreground", children: item.code }),
        /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: item.name }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
          item.location,
          " • ",
          item.periode
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 mt-2", children: [
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: downloadQR, children: [
            /* @__PURE__ */ jsx(Download, { className: "mr-1 h-3.5 w-3.5" }),
            " PNG"
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: printQR, children: [
            /* @__PURE__ */ jsx(Printer, { className: "mr-1 h-3.5 w-3.5" }),
            " Cetak QR"
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2 sm:gap-2", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: downloadDraftPDF, children: [
        /* @__PURE__ */ jsx(FileText, { className: "mr-1.5 h-3.5 w-3.5" }),
        " Cetak / PDF"
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => {
        onCreateTicket(item);
        onOpenChange(false);
      }, children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-1.5 h-3.5 w-3.5" }),
        " Buat Tiket Saja"
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => saveMut.mutate(), disabled: saveMut.isPending || checklist.length === 0, children: [
        saveMut.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "mr-1.5 h-3.5 w-3.5" }),
        "Simpan Hasil PM"
      ] })
    ] })
  ] }) });
}
async function signPath(path) {
  const { data } = await supabase.storage.from("pm-evidence").createSignedUrl(path, 3600);
  return data?.signedUrl ?? null;
}
function PMResultDialog({
  open,
  onOpenChange,
  row
}) {
  const [photos, setPhotos] = useState([]);
  const [sig, setSig] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!open || !row) return;
    setLoading(true);
    (async () => {
      const urls = await Promise.all((row.photo_urls ?? []).map(signPath));
      setPhotos(urls.filter(Boolean));
      setSig(row.signature_url ? await signPath(row.signature_url) : null);
      setLoading(false);
    })();
  }, [open, row?.id]);
  if (!row) return null;
  function downloadCSV() {
    const rows = [
      ["Ticket", row.ticket_no],
      ["Aset", row.asset_name],
      ["Lokasi", row.location ?? ""],
      ["Jadwal", row.scheduled_date],
      ["Selesai", row.completed_date ?? ""],
      ["Status", row.status],
      ["Penandatangan", row.signer_name ?? ""],
      [],
      ["No", "Item", "Hasil"],
      ...(row.checklist_results ?? []).map((r, i) => [String(i + 1), r.item, r.value])
    ];
    const csv = rows.map(
      (r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")
    ).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${row.ticket_no}.csv`;
    a.click();
  }
  function printPDF() {
    const r = row;
    const html = `<html><head><title>${r.ticket_no}</title>
      <style>body{font-family:Arial,sans-serif;padding:24px;color:#111}h1{font-size:18px;margin:0 0 4px}h2{font-size:13px;margin:16px 0 6px;border-bottom:1px solid #ccc;padding-bottom:4px}table{width:100%;border-collapse:collapse;font-size:12px}td,th{border:1px solid #ccc;padding:6px;text-align:left;vertical-align:top}.meta{font-size:12px;color:#444;margin-bottom:4px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.grid img{width:100%;height:120px;object-fit:cover;border:1px solid #ccc}.sig img{max-height:90px}</style>
      </head><body>
      <h1>Laporan Preventive Maintenance</h1>
      <div class="meta"><b>${r.ticket_no}</b> — ${r.asset_name}</div>
      <div class="meta">Lokasi: ${r.location ?? "—"} • Jadwal: ${r.scheduled_date} • Selesai: ${r.completed_date ?? "—"}</div>
      <div class="meta">Status: ${r.status} • Penandatangan: ${r.signer_name ?? "—"}</div>
      <h2>Checklist</h2>
      <table><thead><tr><th style="width:30px">#</th><th>Item</th><th style="width:35%">Hasil</th></tr></thead><tbody>
      ${(r.checklist_results ?? []).map((x, i) => `<tr><td>${i + 1}</td><td>${x.item}</td><td>${x.value || "—"}</td></tr>`).join("") || `<tr><td colspan="3">${(r.notes ?? "").replace(/</g, "&lt;").replace(/\n/g, "<br/>")}</td></tr>`}
      </tbody></table>
      ${photos.length ? `<h2>Foto Bukti</h2><div class="grid">${photos.map((u) => `<img src="${u}"/>`).join("")}</div>` : ""}
      ${sig ? `<h2>Tanda Tangan</h2><div class="sig"><img src="${sig}"/><div style="border-top:1px solid #555;display:inline-block;padding-top:4px;font-size:11px;min-width:200px">${r.signer_name ?? ""}</div></div>` : ""}
      <script>window.onload=()=>setTimeout(()=>window.print(),300)<\/script>
    </body></html>`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
  }
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "font-mono text-[10px]", children: row.ticket_no }),
        row.asset_name
      ] }),
      /* @__PURE__ */ jsxs(DialogDescription, { className: "text-xs", children: [
        row.location ?? "—",
        " • Jadwal ",
        row.scheduled_date,
        " • Selesai ",
        row.completed_date ?? "—"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-auto space-y-4", children: [
      loading && /* @__PURE__ */ jsx("div", { className: "flex justify-center py-6", children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-1 text-xs font-semibold", children: "Hasil Checklist" }),
        row.checklist_results && row.checklist_results.length > 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-md border divide-y text-xs", children: row.checklist_results.map((r, i) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[28px_1fr_180px] gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ jsxs("span", { className: "tabular-nums text-muted-foreground", children: [
            i + 1,
            "."
          ] }),
          /* @__PURE__ */ jsx("span", { children: r.item }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: r.value || "—" })
        ] }, i)) }) : /* @__PURE__ */ jsx("pre", { className: "whitespace-pre-wrap rounded-md border bg-muted/40 p-2 text-xs", children: row.notes ?? "—" })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("h4", { className: "mb-1 text-xs font-semibold", children: [
          "Foto Bukti (",
          photos.length,
          ")"
        ] }),
        photos.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Tidak ada foto." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 sm:grid-cols-4", children: photos.map((u, i) => /* @__PURE__ */ jsx("a", { href: u, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsx("img", { src: u, alt: "", className: "aspect-square w-full rounded-md object-cover border" }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-1 text-xs font-semibold", children: "Tanda Tangan" }),
        sig ? /* @__PURE__ */ jsxs("div", { className: "rounded-md border bg-white p-2 inline-block", children: [
          /* @__PURE__ */ jsx("img", { src: sig, alt: "signature", className: "max-h-32" }),
          /* @__PURE__ */ jsx("div", { className: "mt-1 border-t pt-1 text-center text-[11px]", children: row.signer_name ?? "—" })
        ] }) : /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Belum ada tanda tangan." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2 sm:gap-2", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: downloadCSV, children: [
        /* @__PURE__ */ jsx(Download, { className: "mr-1.5 h-3.5 w-3.5" }),
        " CSV"
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: printPDF, children: [
        /* @__PURE__ */ jsx(FileText, { className: "mr-1.5 h-3.5 w-3.5" }),
        " Cetak / PDF"
      ] })
    ] })
  ] }) });
}
function PMPage() {
  const qc = useQueryClient();
  const {
    user,
    isAdmin
  } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [viewRow, setViewRow] = useState(null);
  const {
    data = [],
    isLoading
  } = useQuery({
    queryKey: ["pm"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("preventive_maintenance").select("*").order("scheduled_date", {
        ascending: false
      });
      if (error) throw error;
      return data2;
    }
  });
  const filtered = useMemo(() => data.filter((r) => [r.asset_name, r.location, r.ticket_no].some((v) => (v ?? "").toLowerCase().includes(search.toLowerCase()))), [data, search]);
  const createMut = useMutation({
    mutationFn: async (form) => {
      const {
        error
      } = await supabase.from("preventive_maintenance").insert({
        ...form,
        created_by: user.id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Pekerjaan ditambahkan");
      qc.invalidateQueries({
        queryKey: ["pm"]
      });
      setOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const updateStatus = useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      const {
        error
      } = await supabase.from("preventive_maintenance").update({
        status,
        completed_date: status === "completed" ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : null
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["pm"]
    }),
    onError: (e) => toast.error(e.message)
  });
  const delMut = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("preventive_maintenance").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Data dihapus");
      qc.invalidateQueries({
        queryKey: ["pm"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Preventive Maintenance", description: "Penjadwalan & monitoring pekerjaan PM aset gedung." }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "tickets", className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "tickets", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "mr-1.5 h-4 w-4" }),
          " Jadwal & Tiket PM"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "catalog", children: [
          /* @__PURE__ */ jsx(ClipboardList, { className: "mr-1.5 h-4 w-4" }),
          " Daftar PM Bulanan"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "tickets", className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { placeholder: "Cari aset / tiket / kode QR…", className: "w-72 pl-8", value: search, onChange: (e) => setSearch(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setScannerOpen(true), children: [
            /* @__PURE__ */ jsx(ScanLine, { className: "mr-2 h-4 w-4" }),
            " Scan QR"
          ] }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => exportAllCSV(filtered), children: [
            /* @__PURE__ */ jsx(Download, { className: "mr-2 h-4 w-4" }),
            " Export CSV"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
              /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
              " Tambah PM"
            ] }) }),
            /* @__PURE__ */ jsx(CreatePMDialog, { onSubmit: (f) => createMut.mutate(f), pending: createMut.isPending })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Tiket" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Aset" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Lokasi" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Jadwal" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Prioritas" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsx(TableHead, { className: "w-32 text-right", children: "Aksi" })
          ] }) }),
          /* @__PURE__ */ jsxs(TableBody, { children: [
            isLoading && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 7, className: "py-10 text-center text-muted-foreground", children: /* @__PURE__ */ jsx(Loader2, { className: "mx-auto h-5 w-5 animate-spin" }) }) }),
            !isLoading && filtered.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 7, className: "py-10 text-center text-muted-foreground", children: "Belum ada data." }) }),
            filtered.map((r) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-mono text-xs", children: r.ticket_no }),
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: r.asset_name }),
              /* @__PURE__ */ jsx(TableCell, { children: r.location ?? "—" }),
              /* @__PURE__ */ jsx(TableCell, { children: r.scheduled_date }),
              /* @__PURE__ */ jsx(TableCell, { className: "capitalize", children: r.priority }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(Select, { value: r.status, onValueChange: (v) => updateStatus.mutate({
                id: r.id,
                status: v
              }), children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8 w-36 text-xs", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsx(SelectContent, { children: ["pending", "in_progress", "completed", "overdue", "approved", "rejected"].map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s, children: /* @__PURE__ */ jsx(StatusBadge, { status: s }) }, s)) })
              ] }) }),
              /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => setViewRow(r), title: "Lihat hasil PM", children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) }),
                isAdmin && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
                  if (confirm("Hapus data ini?")) delMut.mutate(r.id);
                }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
              ] })
            ] }, r.id))
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "catalog", children: /* @__PURE__ */ jsx(PMCatalogView, { onSchedule: (cat) => {
        const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        createMut.mutate({
          asset_name: cat.name,
          location: "",
          description: `PM Bulanan ${cat.name} — ${cat.checklist.length} item pemeriksaan`,
          scheduled_date: today,
          priority: "medium",
          notes: cat.checklist.map((c, i) => `${i + 1}. ${c}`).join("\n")
        });
      }, onScheduleItem: (it) => {
        const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        const checklist = checklistForItem(it);
        const notes = [`Kode: ${it.code}`, `Periode: ${it.periode}`, `Bulan: ${it.month}`, "", ...checklist.length ? ["Checklist PM:", ...checklist.map((c, i) => `${i + 1}. ${c}`)] : []].join("\n");
        createMut.mutate({
          asset_name: `${it.name} (${it.code})`,
          location: it.location,
          description: `PM ${it.group} — ${it.name} di ${it.location}`,
          scheduled_date: today,
          priority: "medium",
          notes
        });
      } }) })
    ] }),
    /* @__PURE__ */ jsx(QRScannerDialog, { open: scannerOpen, onOpenChange: setScannerOpen, onDetected: (text) => {
      setSearch(text);
      toast.success(`QR terdeteksi: ${text}`);
    } }),
    /* @__PURE__ */ jsx(PMResultDialog, { open: !!viewRow, onOpenChange: (v) => !v && setViewRow(null), row: viewRow })
  ] });
}
function exportAllCSV(rows) {
  const header = ["Ticket", "Aset", "Lokasi", "Jadwal", "Selesai", "Status", "Prioritas", "Penandatangan", "Catatan"];
  const lines = [header, ...rows.map((r) => [r.ticket_no, r.asset_name, r.location ?? "", r.scheduled_date, r.completed_date ?? "", r.status, r.priority, r.signer_name ?? "", (r.notes ?? "").replace(/\n/g, " | ")])];
  const csv = lines.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8"
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `pm-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
}
function PMCatalogView({
  onSchedule,
  onScheduleItem
}) {
  const [group, setGroup] = useState("ALL");
  const [month, setMonth] = useState(MONTHS_ID[(/* @__PURE__ */ new Date()).getMonth()]);
  const [scheduleSearch, setScheduleSearch] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const items = useMemo(() => group === "ALL" ? PM_CATALOG : PM_CATALOG.filter((c) => c.group === group), [group]);
  const monthSchedule = useMemo(() => {
    const q = scheduleSearch.trim().toLowerCase();
    return PM_SCHEDULE.filter((s) => s.month === month).filter((s) => group === "ALL" || group === "LIFT" ? true : s.group === group).filter((s) => q ? [s.code, s.name, s.location, s.periode].some((v) => v.toLowerCase().includes(q)) : true);
  }, [month, group, scheduleSearch]);
  const grouped = useMemo(() => {
    const m = {};
    for (const it of monthSchedule) (m[it.group] ||= []).push(it);
    return m;
  }, [monthSchedule]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: "Daftar PM yang harus dilakukan tiap bulan" }),
        /* @__PURE__ */ jsxs(CardDescription, { children: [
          "Sumber: ",
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "PREVENTIVE MEP / HVAC / PANEL MHKN — Master" }),
          ". Pilih bulan & kelompok untuk melihat daftar alat beserta lokasinya."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-wrap items-end gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Bulan" }),
          /* @__PURE__ */ jsxs(Select, { value: month, onValueChange: setMonth, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: MONTHS_ID.map((m) => /* @__PURE__ */ jsx(SelectItem, { value: m, children: m }, m)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Kelompok" }),
          /* @__PURE__ */ jsxs(Select, { value: group, onValueChange: setGroup, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "ALL", children: "Semua" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "MEP", children: "MEP" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "HVAC", children: "HVAC" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "PANEL", children: "Panel" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "LIFT", children: "Lift (checklist)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 flex-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Cari alat / lokasi / kode QR" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { className: "pl-8", placeholder: "Mis. Chiller, AHU, PP HVAC, LANTAI 3, MEP-MHKN-001…", value: scheduleSearch, onChange: (e) => setScheduleSearch(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setScannerOpen(true), children: [
          /* @__PURE__ */ jsx(ScanLine, { className: "mr-2 h-4 w-4" }),
          " Scan QR"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ml-auto text-sm text-muted-foreground", children: [
          "Total alat bulan ini:",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: monthSchedule.length })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2", children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4" }),
          " Jadwal Alat — ",
          month
        ] }),
        /* @__PURE__ */ jsxs(CardDescription, { children: [
          "Daftar alat & lokasi yang harus di-PM pada bulan ",
          month,
          " (dari master Excel)."
        ] })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: Object.keys(grouped).length === 0 ? /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-sm text-muted-foreground", children: "Tidak ada alat terjadwal untuk filter ini." }) : Object.entries(grouped).map(([g, list]) => /* @__PURE__ */ jsxs("div", { className: "border-t first:border-t-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-muted/40 px-4 py-2 text-xs font-semibold", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "font-mono text-[10px]", children: g }),
          /* @__PURE__ */ jsxs("span", { children: [
            list.length,
            " alat"
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { className: "w-40", children: "Kode" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Nama Alat" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Lokasi" }),
            /* @__PURE__ */ jsx(TableHead, { className: "w-40", children: "Periode" }),
            /* @__PURE__ */ jsx(TableHead, { className: "w-20 text-center", children: "Cek" }),
            /* @__PURE__ */ jsx(TableHead, { className: "w-44 text-right", children: "Aksi" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: list.map((it, i) => {
            const checkCount = checklistForItem(it).length;
            return /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-mono text-xs", children: it.code }),
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: it.name }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-sm text-muted-foreground", children: it.location || "—" }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-xs", children: it.periode || "—" }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "text-[10px]", children: [
                checkCount,
                " item"
              ] }) }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1.5", children: [
                /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => setDetailItem(it), children: [
                  /* @__PURE__ */ jsx(Eye, { className: "mr-1 h-3.5 w-3.5" }),
                  " Detail"
                ] }),
                /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => onScheduleItem(it), children: [
                  /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-3.5 w-3.5" }),
                  " Tiket"
                ] })
              ] }) })
            ] }, `${g}-${i}-${it.code}`);
          }) })
        ] })
      ] }, g)) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: "Referensi Checklist PM (per kategori)" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Item pemeriksaan standar untuk tiap kategori alat." })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "p-2 sm:p-4", children: /* @__PURE__ */ jsx(Accordion, { type: "multiple", className: "w-full", children: items.map((cat) => /* @__PURE__ */ jsxs(AccordionItem, { value: cat.code, children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "hover:no-underline", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-3 pr-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "font-mono text-[10px]", children: cat.group }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: cat.name }),
          /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "text-[10px]", children: [
            cat.checklist.length,
            " item"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: cat.period })
        ] }) }),
        /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("ol", { className: "grid grid-cols-1 gap-x-6 gap-y-1.5 pl-1 text-sm sm:grid-cols-2 lg:grid-cols-3", children: cat.checklist.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground tabular-nums", children: [
              String(i + 1).padStart(2, "0"),
              "."
            ] }),
            /* @__PURE__ */ jsx("span", { children: item })
          ] }, i)) }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => onSchedule(cat), children: [
            /* @__PURE__ */ jsx(Plus, { className: "mr-1.5 h-3.5 w-3.5" }),
            " Jadwalkan PM ",
            month
          ] }) })
        ] }) })
      ] }, cat.code)) }) })
    ] }),
    /* @__PURE__ */ jsx(QRScannerDialog, { open: scannerOpen, onOpenChange: setScannerOpen, onDetected: (text) => setScheduleSearch(text) }),
    /* @__PURE__ */ jsx(PMItemDetailDialog, { open: !!detailItem, onOpenChange: (v) => {
      if (!v) setDetailItem(null);
    }, item: detailItem, onCreateTicket: (it) => onScheduleItem(it) })
  ] });
}
function CreatePMDialog({
  onSubmit,
  pending
}) {
  const [form, setForm] = useState({
    asset_name: "",
    location: "",
    description: "",
    scheduled_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    priority: "medium",
    notes: ""
  });
  return /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Tambah Preventive Maintenance" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Lengkapi detail pekerjaan PM." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit(form);
    }, className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Nama Aset" }),
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
          /* @__PURE__ */ jsx(Label, { children: "Tanggal Jadwal" }),
          /* @__PURE__ */ jsx(Input, { type: "date", required: true, value: form.scheduled_date, onChange: (e) => setForm({
            ...form,
            scheduled_date: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Prioritas" }),
        /* @__PURE__ */ jsxs(Select, { value: form.priority, onValueChange: (v) => setForm({
          ...form,
          priority: v
        }), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "low", children: "Low" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "medium", children: "Medium" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "high", children: "High" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "critical", children: "Critical" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Label, { children: "Deskripsi" }),
        /* @__PURE__ */ jsx(Textarea, { value: form.description, onChange: (e) => setForm({
          ...form,
          description: e.target.value
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
  PMPage as component
};

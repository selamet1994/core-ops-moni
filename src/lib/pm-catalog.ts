// Master daftar Preventive Maintenance bulanan — diambil dari form master MHKN.
// Dipakai sebagai katalog referensi pada halaman FMS / Preventive Maintenance.

export type PMCategory = {
  code: string;
  name: string;
  group: "MEP" | "HVAC" | "PANEL" | "LIFT";
  period: string; // contoh: "Bulanan", "2 Bulan", dst.
  checklist: string[];
};

export const PM_CATALOG: PMCategory[] = [
  // ===== MEP — Form PM (Master) =====
  {
    code: "GENSET", name: "Genset", group: "MEP", period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit", "Pengecekan kondisi oli", "Pemeriksaan accu",
      "Pemeriksaan charger battery/accu", "Pengecekan air radiator", "Pengecekan filter udara",
      "Pengecekan filter oli", "Pengecekan filter solar", "Pengecekan roda / bantalan",
      "Pemeriksaan AMF (Automatic Main Failure)", "Pengecekan terminasi kabel kontrol",
      "Pengecekan tombol pengaman / emergency", "Pengecekan mur, baut, clip dan mounting",
      "Warming genset", "Engine RPM", "Service meter", "Generator frekuensi",
      "Battery", "Battery charger", "Pressure olie (Psi)",
    ],
  },
  {
    code: "UPS", name: "UPS", group: "MEP", period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit UPS", "Pengecekan terminasi panel UPS",
      "Pengecekan terminasi koneksi UPS", "Pengecekan terminasi koneksi battery",
      "Pemeriksaan display control UPS", "Pemeriksaan fan UPS", "Pengecekan selector switch",
      "Pengecekan push button", "Pengecekan pilot lamp", "Pengecekan kabel instalasi",
      "Pemeriksaan panel UPS", "Perawatan kebersihan panel UPS",
      "AC In", "AC Out", "Frequency", "Load", "Volt battery", "Temperatur",
    ],
  },
  {
    code: "POMPA", name: "Pompa", group: "MEP", period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit", "Pengecekan terminasi panel pompa", "Pemeriksaan bearing pompa",
      "Pengecekan valve pompa", "Pengecekan gearbox pompa", "Pengecekan strainer",
      "Pengecekan pressure gauge", "Pengecekan fan pompa", "Pemeriksaan panel kontrol pompa",
      "Pengecekan selector switch", "Pengecekan pilot lamp", "Pengecekan kabel instalasi",
      "Tegangan R-N", "Tegangan S-N", "Tegangan T-N", "Tegangan R-S", "Tegangan R-T", "Tegangan S-T",
      "Ampere R", "Ampere S", "Ampere T", "Pengecekan TOR pompa",
    ],
  },
  {
    code: "PNEUMATIC_TUBE", name: "Pneumatic Tube", group: "MEP", period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit", "Pengecekan motor listrik", "Pengecekan sensor",
      "Pengecekan jalur rel penggerak", "Pemeriksaan PCB main board", "Pemeriksaan konektor PCB",
      "Pengecekan layar monitor", "Pengecekan seal packing", "Pengecekan tombol keypad",
      "Pengecekan alarm sensor", "Pengecekan pipa instalasi", "Pengecekan tabung carrier",
      "Pengecekan keranjang carrier", "Pengecekan rak carrier", "Cek tegangan input PCB",
    ],
  },
  {
    code: "FIRE_ALARM", name: "Fire Alarm", group: "MEP", period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit", "Pemeriksaan smoke detector", "Pemeriksaan zona-zona",
      "Pemeriksaan hydrant", "Pemeriksaan panel fire alarm", "Instalasi pengkabelan",
      "Pemeriksaan zona panel",
      "Tegangan R-N", "Tegangan S-N", "Tegangan T-N", "Tegangan R-S", "Tegangan R-T", "Tegangan S-T",
      "Ampere operasional",
    ],
  },
  {
    code: "SOUND_SYSTEM", name: "Sound System", group: "MEP", period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit", "Pemeriksaan amplifier", "Pemeriksaan speaker",
      "Pemeriksaan instalasi pengkabelan", "Pemeriksaan microphone", "Pemeriksaan volume",
    ],
  },
  {
    code: "CHILLER", name: "Chiller", group: "MEP", period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit", "Pengecekan pipa instalasi water chiller", "Pengecekan strainer",
      "Pengecekan pressure gauge", "Pengecekan fan", "Pengecekan motorise", "Pengecekan flow switch",
      "Pengecekan filter dryer", "Pengecekan evaporator", "Pengecekan condensor", "Pengecekan compresor",
      "Pengecekan expansion valve", "Pengecekan PHE-shell & tube", "Pengecekan panel kontrol",
      "Pengecekan display chiller",
      "Phase R-S", "Phase R-T", "Phase S-T", "Phase R-N", "Phase S-N", "Phase T-N",
      "Phase-R COM1/2/3", "Phase-S COM1/2/3", "Phase-T COM1/2/3",
      "Phase-R FAN1/2/3", "Phase-S FAN1/2/3", "Phase-T FAN1/2/3",
      "Temperatur In", "Temperatur Out", "Pressure water in",
      "Low pressure COM1/2/3 (Freon)", "High pressure COM1/2/3 (Freon)",
    ],
  },
  {
    code: "EXHAUST_FAN", name: "Exhaust Fan", group: "MEP", period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit", "Pengecekan motor fan", "Pemeriksaan bearing", "Pengecekan ducting",
      "Pengecekan membran", "Pengecekan kabel instalasi", "Pengecekan terminal sambungan",
      "Pengecekan baling-baling fan", "Pemeriksaan mounting", "Pengecekan vanbelt",
      "Tegangan R-N / S-N / T-N", "Tegangan R-S / R-T / S-T", "Ampere R / S / T",
    ],
  },
  {
    code: "WATER_HEATER", name: "Water Heater", group: "MEP", period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit", "Pemeriksaan panel control", "Pemeriksaan tangki",
      "Pemeriksaan remote control", "Pemeriksaan instalasi pemipaan", "Pemeriksaan compressor",
      "Tegangan R-N / S-N / T-N", "Tegangan R-S / R-T / S-T",
      "Ampere operasional", "Tekanan freon HP", "Tekanan freon LP",
    ],
  },
  {
    code: "REVERSE_OSMOSIS", name: "Reverse Osmosis (RO)", group: "MEP", period: "Bulanan",
    checklist: [
      "Perawatan kebersihan unit", "Pengecekan terminasi panel pompa", "Pemeriksaan bearing pompa",
      "Pengecekan valve pompa", "Pengecekan gearbox pompa", "Pengecekan filter-filter",
      "Pengecekan pressure gauge", "Pengecekan fan pompa", "Pemeriksaan tank air baku",
      "Pemeriksaan tank air produk", "Pengecekan lampu UV", "Pengecekan LPM",
      "Pemeriksaan indikator air",
      "Tegangan R-N / S-N / T-N", "Tegangan R-S / R-T / S-T", "Ampere operasional",
    ],
  },

  // ===== HVAC — AC (Bulanan) =====
  {
    code: "AC_HVAC", name: "AC / HVAC (per unit)", group: "HVAC", period: "Bulanan",
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
      "Tegangan R-N / S-N / T-N", "Tegangan R-S / R-T / S-T", "Ampere R / S / T",
      "Air flow (m/s)",
    ],
  },

  // ===== PANEL (Bulanan / 2 Bulan) =====
  {
    code: "PANEL_LISTRIK", name: "Panel Listrik (LVMDP/SDP/PP)", group: "PANEL", period: "Bulanan / 2 Bulan",
    checklist: [
      "Voltage R-S (395V ≤ 380V ≥ 365V)",
      "Voltage S-T (395V ≤ 380V ≥ 365V)",
      "Voltage R-T (395V ≤ 380V ≥ 365V)",
      "Voltage R-N (235V ≤ 220V ≥ 205V)",
      "Voltage S-N (235V ≤ 220V ≥ 205V)",
      "Voltage T-N (235V ≤ 220V ≥ 205V)",
      "Ampere R (max 80%)", "Ampere S (max 80%)", "Ampere T (max 80%)",
      "Ampere N (must be 0)", "Ampere Ground (must be 0)",
      "Temp kabel R/S/T/N (<50°C)", "Temp kontaktor (<50°C)",
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
      "Catatan & kesimpulan",
    ],
  },

  // ===== LIFT (MEP Schedule) =====
  {
    code: "LIFT", name: "Lift (Passenger / Service / Bersih)", group: "LIFT", period: "Bulanan",
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
      "Catatan tindakan & analisa kerusakan",
    ],
  },
];

export const MONTHS_ID = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
];

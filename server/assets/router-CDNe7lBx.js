import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext } from "react";
import { s as supabase } from "./client-BX8CplE9.js";
import { Toaster as Toaster$1 } from "sonner";
const appCss = "/assets/styles-BkLHqIsv.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Ctx$1 = createContext(void 0);
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme");
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return /* @__PURE__ */ jsx(Ctx$1.Provider, { value: { theme, toggle: () => setTheme((t) => t === "light" ? "dark" : "light") }, children });
}
function useTheme() {
  const ctx = useContext(Ctx$1);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
const Ctx = createContext(void 0);
function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setTimeout(() => {
          supabase.from("user_roles").select("role").eq("user_id", s.user.id).then(({ data }) => {
            setRoles((data ?? []).map((r) => r.role));
          });
        }, 0);
      } else {
        setRoles([]);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  const value = {
    user,
    session,
    loading,
    roles,
    isAdmin: roles.includes("admin") || roles.includes("super_admin"),
    signOut: async () => {
      await supabase.auth.signOut();
    }
  };
  return /* @__PURE__ */ jsx(Ctx.Provider, { value, children });
}
function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Halaman tidak ditemukan." }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90", children: "Kembali" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-foreground", children: "Terjadi kesalahan" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Coba muat ulang halaman." }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
        children: "Coba lagi"
      }
    )
  ] }) });
}
const Route$b = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PM Studio — Preventive Maintenance FMS, GA & K3L" },
      { name: "description", content: "Sistem Preventive Maintenance & Monitoring operasional gedung untuk divisi FMS, GA dan K3L." },
      { property: "og:title", content: "PM Studio — Preventive Maintenance FMS, GA & K3L" },
      { name: "twitter:title", content: "PM Studio — Preventive Maintenance FMS, GA & K3L" },
      { property: "og:description", content: "Sistem Preventive Maintenance & Monitoring operasional gedung untuk divisi FMS, GA dan K3L." },
      { name: "twitter:description", content: "Sistem Preventive Maintenance & Monitoring operasional gedung untuk divisi FMS, GA dan K3L." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/80aea6f8-7e56-455a-bf21-7b2c0f7f1128/id-preview-7d29938a--fe5a5ce7-d6af-4e18-9dd5-7a9d6a734153.lovable.app-1781179057494.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/80aea6f8-7e56-455a-bf21-7b2c0f7f1128/id-preview-7d29938a--fe5a5ce7-d6af-4e18-9dd5-7a9d6a734153.lovable.app-1781179057494.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "id", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  const router2 = useRouter();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [queryClient, router2]);
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) }) });
}
const $$splitComponentImporter$9 = () => import("./auth-1O2R_SUF.js");
const Route$a = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Masuk — PM Studio"
    }, {
      name: "description",
      content: "Masuk ke sistem Preventive Maintenance FMS, GA & K3L."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./route-ZjukPihn.js");
const Route$9 = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const Route$8 = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  }
});
const $$splitComponentImporter$7 = () => import("./dashboard-j7UL1N1l.js");
const Route$7 = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — PM Studio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./k3l.waste-monitoring-DBXWO3Po.js");
const Route$6 = createFileRoute("/_authenticated/k3l/waste-monitoring")({
  head: () => ({
    meta: [{
      title: "Monitoring Limbah — K3L"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./ga.vehicle-monitoring-CnFxXO_F.js");
const Route$5 = createFileRoute("/_authenticated/ga/vehicle-monitoring")({
  head: () => ({
    meta: [{
      title: "Monitoring Kendaraan — GA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./fms.utility-tests-B4YxuZGY.js");
const Route$4 = createFileRoute("/_authenticated/fms/utility-tests")({
  head: () => ({
    meta: [{
      title: "Uji Fungsi Sistem Utilitas — FMS"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./fms.spare-parts-BqCYu-6g.js");
const Route$3 = createFileRoute("/_authenticated/fms/spare-parts")({
  head: () => ({
    meta: [{
      title: "Logistik Teknik — Spare Parts"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./fms.preventive-maintenance-Cp3dzfLS.js");
const Route$2 = createFileRoute("/_authenticated/fms/preventive-maintenance")({
  head: () => ({
    meta: [{
      title: "Preventive Maintenance — FMS"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./fms.equipment-history-CioM8mlR.js");
const Route$1 = createFileRoute("/_authenticated/fms/equipment-history")({
  head: () => ({
    meta: [{
      title: "Data History Peralatan — FMS"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./fms.daily-checklist-NsBUX6Lp.js");
const Route = createFileRoute("/_authenticated/fms/daily-checklist")({
  head: () => ({
    meta: [{
      title: "Daily Checklist MHKN — FMS"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AuthRoute = Route$a.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$b
});
const AuthenticatedRouteRoute = Route$9.update({
  id: "/_authenticated",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const AuthenticatedDashboardRoute = Route$7.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedK3lWasteMonitoringRoute = Route$6.update({
  id: "/k3l/waste-monitoring",
  path: "/k3l/waste-monitoring",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedGaVehicleMonitoringRoute = Route$5.update({
  id: "/ga/vehicle-monitoring",
  path: "/ga/vehicle-monitoring",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedFmsUtilityTestsRoute = Route$4.update({
  id: "/fms/utility-tests",
  path: "/fms/utility-tests",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedFmsSparePartsRoute = Route$3.update({
  id: "/fms/spare-parts",
  path: "/fms/spare-parts",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedFmsPreventiveMaintenanceRoute = Route$2.update({
  id: "/fms/preventive-maintenance",
  path: "/fms/preventive-maintenance",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedFmsEquipmentHistoryRoute = Route$1.update({
  id: "/fms/equipment-history",
  path: "/fms/equipment-history",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedFmsDailyChecklistRoute = Route.update({
  id: "/fms/daily-checklist",
  path: "/fms/daily-checklist",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedRouteRouteChildren = {
  AuthenticatedDashboardRoute,
  AuthenticatedFmsDailyChecklistRoute,
  AuthenticatedFmsEquipmentHistoryRoute,
  AuthenticatedFmsPreventiveMaintenanceRoute,
  AuthenticatedFmsSparePartsRoute,
  AuthenticatedFmsUtilityTestsRoute,
  AuthenticatedGaVehicleMonitoringRoute,
  AuthenticatedK3lWasteMonitoringRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  useAuth as a,
  router as r,
  useTheme as u
};

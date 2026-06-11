import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wrench,
  Car,
  Trash2,
  Building2,
  ShieldCheck,
  HardHat,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    items: [{ title: "Dashboard", url: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "FMS — Facility Management",
    icon: Building2,
    items: [
      { title: "Preventive Maintenance", url: "/fms/preventive-maintenance", icon: Wrench },
    ],
  },
  {
    label: "GA — General Affairs",
    icon: ShieldCheck,
    items: [
      { title: "Monitoring Kendaraan", url: "/ga/vehicle-monitoring", icon: Car },
    ],
  },
  {
    label: "K3L — Health, Safety, Env.",
    icon: HardHat,
    items: [
      { title: "Monitoring Limbah", url: "/k3l/waste-monitoring", icon: Trash2 },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-bold">
            PM
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground">PM Studio</span>
            <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/70">
              FMS · GA · K3L
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-DQ5v2DYb.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.js";
import { I as Input, B as Button } from "./button-DvaFYl8e.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { s as supabase } from "./client-BX8CplE9.js";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import { toast } from "sonner";
import { Building2, Loader2 } from "lucide-react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tabs";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@supabase/supabase-js";
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    supabase.auth.getSession().then(({
      data
    }) => {
      if (data.session) navigate({
        to: "/dashboard",
        replace: true
      });
    });
  }, [navigate]);
  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Selamat datang kembali");
    navigate({
      to: "/dashboard",
      replace: true
    });
  }
  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    const {
      error
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName
        }
      }
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Akun dibuat. Silakan masuk.");
  }
  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin
    });
    if (result.error) {
      setLoading(false);
      return toast.error(result.error.message);
    }
    if (result.redirected) return;
    navigate({
      to: "/dashboard",
      replace: true
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "grid min-h-screen w-full lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-md bg-primary-foreground/10", children: /* @__PURE__ */ jsx(Building2, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold", children: "PM Studio" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold leading-tight", children: "Preventive Maintenance & Monitoring" }),
        /* @__PURE__ */ jsx("p", { className: "text-primary-foreground/80", children: "Satu platform untuk FMS, GA, dan K3L — checklist harian, work order, inspeksi, dan laporan dalam satu dashboard." })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-primary-foreground/60", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " PM Studio"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-6 sm:p-12 bg-background", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Masuk ke sistem" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Gunakan akun terdaftar atau Google." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs(Tabs, { defaultValue: "signin", children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
            /* @__PURE__ */ jsx(TabsTrigger, { value: "signin", children: "Masuk" }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "signup", children: "Daftar" })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "signin", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSignIn, className: "space-y-3 pt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "si-email", children: "Email" }),
              /* @__PURE__ */ jsx(Input, { id: "si-email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "si-pass", children: "Password" }),
              /* @__PURE__ */ jsx(Input, { id: "si-pass", type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
              loading && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
              " Masuk"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSignUp, className: "space-y-3 pt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "su-name", children: "Nama lengkap" }),
              /* @__PURE__ */ jsx(Input, { id: "su-name", required: true, value: fullName, onChange: (e) => setFullName(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "su-email", children: "Email" }),
              /* @__PURE__ */ jsx(Input, { id: "su-email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "su-pass", children: "Password" }),
              /* @__PURE__ */ jsx(Input, { id: "su-pass", type: "password", minLength: 6, required: true, value: password, onChange: (e) => setPassword(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
              loading && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
              " Daftar"
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-border" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "atau" }),
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-border" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "w-full", onClick: handleGoogle, disabled: loading, children: [
          /* @__PURE__ */ jsxs("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z" }),
            /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
            /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.53 1 10.21 1 12s.43 3.47 1.18 4.96l3.66-2.84z" }),
            /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" })
          ] }),
          "Masuk dengan Google"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AuthPage as component
};

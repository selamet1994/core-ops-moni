import { createClient } from "@supabase/supabase-js";
function createSupabaseClient() {
  const SUPABASE_URL = "https://txmdzykapbmxcfbiwcff.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4bWR6eWthcGJteGNmYml3Y2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNzI1MDksImV4cCI6MjA5Njc0ODUwOX0.QxzgOnwh_mlRAMPtDMRIM1BX2IhCzhVvVs16pgr3qig";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
export {
  supabase as s
};

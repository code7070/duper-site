import { createClient } from "@supabase/supabase-js";

const supabase = () => {
  const supaUrl = process.env.NEXT_PUBLIC_supaUrl || "";
  const supaKey = process.env.NEXT_PUBLIC_supaKey || "";
  return createClient(supaUrl, supaKey);
};

export default supabase;

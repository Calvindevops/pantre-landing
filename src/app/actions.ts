"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function joinWaitlist(
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
  refCode?: string;
  position?: number;
}> {
  const email = formData.get("email") as string;
  const referredBy = formData.get("ref") as string | null;

  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email." };
  }

  // If referred, increment referrer's count
  if (referredBy) {
    await supabase.rpc("increment_referral_count", { code: referredBy });
  }

  const { data, error } = await supabase
    .from("waitlist")
    .insert({
      email,
      referred_by: referredBy || null,
    })
    .select("ref_code, position")
    .single();

  if (error) {
    if (error.code === "23505") {
      // Already exists — fetch their ref_code
      const { data: existing } = await supabase
        .from("waitlist")
        .select("ref_code, position")
        .eq("email", email)
        .single();
      return {
        success: true,
        message: "You're already on the list!",
        refCode: existing?.ref_code,
        position: existing?.position,
      };
    }
    return { success: false, message: "Something went wrong. Try again." };
  }

  return {
    success: true,
    message: "You're in! Share to move up the list.",
    refCode: data.ref_code,
    position: data.position,
  };
}

export async function getWaitlistCount(): Promise<number> {
  const { count } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export async function getWaitlistEntry(refCode: string) {
  const { data } = await supabase
    .from("waitlist")
    .select("ref_code, position, referral_count")
    .eq("ref_code", refCode)
    .single();
  return data;
}

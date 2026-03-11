"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function joinWaitlist(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email." };
  }

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return { success: true, message: "You're already on the list!" };
    }
    return { success: false, message: "Something went wrong. Try again." };
  }

  return { success: true, message: "You're in! We'll be in touch soon." };
}

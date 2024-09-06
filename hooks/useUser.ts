import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getUser() {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error("მომხმარებლის ავტორიზაციის დროს დაფიქსირდა შეცდომა");
      }

      if (!user) {
        throw new Error("მომხმარებელი ვერ მოიძებნა");
      }

      return user;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, getUser };
}

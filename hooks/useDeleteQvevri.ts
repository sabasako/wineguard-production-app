import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Alert } from "react-native";
import useUser from "./useUser";

export default function useDeleteQvevri() {
  const [loading, setLoading] = useState(false);
  const { getUser, error: userError } = useUser();

  async function deleteQvevri(id: string) {
    try {
      setLoading(true);

      const user = await getUser();
      if (userError) throw new Error(userError);

      const { error } = await supabase
        .from("qvevrebi_users")
        .delete()
        .eq("qvevri_id", id) // Delete by qvevri_id
        .eq("user_id", user?.id);

      if (error) throw new Error(error.message);

      Alert.alert("წარმატა!", `ქვერი აიდით "${id}" წარმატებით წაიშალა!`);
      return true;
    } catch (err: any) {
      console.error("Error adding qvevri:", err);

      let errorMessage = "გთხოვთ თავიდან სცადოთ";
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      Alert.alert("ვერ მოხერხდა ქვევრის წაშლა", errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { loading, deleteQvevri };
}

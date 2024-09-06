import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Alert } from "react-native";

export default function useAddQvevri() {
  const [loading, setLoading] = useState(false);

  async function handleAddQvevri(id: string) {
    if (id === "") {
      Alert.alert("შეცდომა", "გთხოვთ შეიყვანოთ აიდი");
      return;
    }
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError)
        throw new Error("მომხმარებლის ავტორიზაციის დროს დაფიქსირდა შეცდომა");
      if (!user) throw new Error("მომხმარებელი ვერ მოიძებნა");

      // Check if the qvevri exists in the qvevrebi_data table
      const { error: qvevriError } = await supabase
        .from("qvevrebi_data")
        .select("qvevri_id")
        .eq("qvevri_id", id)
        .single();

      if (qvevriError) throw new Error(`ქვევრი აიდით "${id}" ვერ მოიძებნა`);

      // Check if the qvevri is already associated with the user in qvevrebi_users
      const { data: qvevriUserExists, error: userCheckError } = await supabase
        .from("qvevrebi_users")
        .select("qvevri_id")
        .eq("qvevri_id", id)
        .eq("user_id", user.id)
        .single(); // Expect only one row if it exists

      if (qvevriUserExists)
        throw new Error(`ქვევრი აიდით "${id}" უკვე დამატებულია!`);

      // if (userCheckError) throw new Error(userCheckError.message);

      const { error: insertError } = await supabase
        .from("qvevrebi_users")
        .insert({
          qvevri_id: id,
          user_id: user.id,
          name: user?.user_metadata?.name || "",
        });

      if (insertError) throw insertError;

      Alert.alert("წარმატა!", `ქვერი აიდით "${id}" წარმატებით დაემატა!`);
      return true;
    } catch (err: any) {
      console.error("Error adding qvevri:", err);

      let errorMessage = "გთხოვთ თავიდან სცადოთ";
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      Alert.alert("ვერ მოხერხდა ქვევრის დამატება", errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { loading, handleAddQvevri };
}

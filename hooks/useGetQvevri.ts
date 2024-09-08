import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

type QvevriData = {
  qvevri_id: string;
  title: string;
  active: boolean;
  co2: number;
  no2: number;
  created_at: number;
};

export function useGetQvevri(id: string) {
  const [qvevriData, setQvevriData] = useState<QvevriData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(qvevriData?.active);

  useEffect(() => {
    let subscription: any;

    async function fetchQvevriData() {
      try {
        setLoading(true);

        // Fetch the qvevri data from qvevrebi_data table
        const { data, error } = await supabase
          .from("qvevrebi_data")
          .select("*")
          .eq("qvevri_id", id)
          .single();

        if (error) throw new Error(error.message);
        setQvevriData(data);
        setIsActive(data?.active);

        // Set up real-time subscription
        subscription = supabase
          .channel("qvevri_changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "qvevrebi_data",
              filter: `qvevri_id=eq.${id}`,
            },
            (payload) => {
              setQvevriData(payload.new as QvevriData);
            }
          )
          .subscribe();
      } catch (err: any) {
        Alert.alert(
          "შეცდომა, რაღაც არასწორად წავიდა",
          "გთხოვთ სცადოთ მოგვიანებით!"
        );
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQvevriData();

    // Cleanup function
    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [id]);

  async function changeStatus() {
    try {
      setLoading(true);
      setIsActive((prev) => !prev);

      const { error, data } = await supabase
        .from("qvevrebi_data")
        .update({ active: !isActive })
        .eq("qvevri_id", id);

      if (error) throw new Error(error.message);
    } catch (err: any) {
      Alert.alert(
        "შეცდომა, რაღაც არასწორად წავიდა",
        "გთხოვთ სცადოთ მოგვიანებით!"
      );
      setIsActive((prev) => !prev);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { qvevriData, loading, isActive, changeStatus };
}

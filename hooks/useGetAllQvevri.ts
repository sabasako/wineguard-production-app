import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

type qvevriType = {
  qvevri_id: string;
  title: string;
  active: boolean;
  co2: number;
  no2: number;
  created_at: string;
};

export default function useGetAllQvevri(refresh: boolean) {
  const [loading, setLoading] = useState(false);
  const [qvevrebi, setQvevrebi] = useState<qvevriType[]>([]);

  useEffect(() => {
    async function fetchQvevrebi() {
      try {
        setLoading(true);
        // Postgres has policy to only allow users to see their own qvevrebi, so we don't need to get user id and then filter, data will already be filtered

        // First we need all qvevri ids that belong to the user
        const { error: qvevriError, data: qvevriData } = await supabase
          .from("qvevrebi_users")
          .select("qvevri_id");

        if (qvevriError) {
          throw new Error(qvevriError.message);
        }

        // Extract qvevri_ids into an array
        let qvevriIds: string[] = [];
        if (qvevriData.length > 0) {
          qvevriIds = qvevriData.map((qvevri) => qvevri.qvevri_id);
        }

        const { error: qvevriDataError, data: qvevriDataResult } =
          await supabase
            .from("qvevrebi_data")
            .select("*")
            .in("qvevri_id", qvevriIds.length > 0 ? qvevriIds : [""])
            .order("active", { ascending: false })
            .order("title", { ascending: true });

        if (qvevriDataError) {
          throw new Error(qvevriDataError.message);
        }

        setQvevrebi(qvevriDataResult);
      } catch (err: any) {
        Alert.alert("შეცდომა", "რაღაც არასწორად წავიდა");
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQvevrebi();
  }, [refresh]);

  return { loading, qvevrebi };
}

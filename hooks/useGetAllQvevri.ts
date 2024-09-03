import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useGetAllQvevri() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchQvevrebi() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          Alert.alert("შეცდომა", "მომხმარებელი ვერ მოიძებნა");
          return;
        }

        const { error, data, statusText } = await supabase
          .from("qvevrebi_users")
          .select("*");
        // .eq("user_id", user.id);

        if (error) {
          throw new Error(error.message);
        }

        console.log("ქვევრის მონაცემები", data);
        console.log("statys", statusText);
      } catch (err: any) {
        Alert.alert("შეცდომა", "რაღაც არასწორად წავიდა");
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const apiUrl =
      "https://fatclvqrybgbpaxhbiln.supabase.co/rest/v1/qvevrebi_users";
    const userId = "8afb601d-540c-4fc5-b508-ee14715e40b6";
    const apiKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhdGNsdnFyeWJnYnBheGhiaWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3MTEyNzQsImV4cCI6MjAzOTI4NzI3NH0.70N2s9rTlQMI8YvGPiCv1mTttCwDr_IlPSDV-RMDURo";

    fetch(`${apiUrl}?user_id=eq.${userId}`, {
      method: "GET",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });

  return { loading };
}

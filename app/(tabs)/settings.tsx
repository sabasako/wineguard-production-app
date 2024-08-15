// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import EvilIcons from "@expo/vector-icons/EvilIcons";
// import colors from "@/constants/Colors";
// import Entypo from "@expo/vector-icons/Entypo";
// import { Link, router } from "expo-router";
// import { useAuth } from "@/contexts/AuthContext";

// export default function Settings() {
//   const { onLogout } = useAuth();

//   function handleLogout() {
//     if (onLogout) {
//       onLogout();
//       router.replace("/auth/login");
//     } else {
//       console.error("onLogout function is not defined");
//     }
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileWrapper}>
//         <EvilIcons name="user" size={104} color={"red"} />
//         <View>
//           <Text
//             numberOfLines={1}
//             ellipsizeMode="tail"
//             style={{ fontWeight: "bold", fontSize: 20 }}
//           >
//             ირაკლი გამსახურდია
//           </Text>
//           <Text style={{ color: "gray", fontSize: 14, marginTop: 3 }}>
//             irakli.gamsakhurdia@gmail.com
//           </Text>
//         </View>
//       </View>

//       <View
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           gap: 24,
//           alignItems: "center",
//           marginTop: 24,
//         }}
//       >
//         <Entypo name="help" size={24} color="gray" />
//         <Link
//           href={"https://www.wineguard.ge/"}
//           style={{
//             fontSize: 22,
//             fontWeight: "bold",
//             color: "gray",
//           }}
//         >
//           დახმარება
//         </Link>
//       </View>

//       <TouchableOpacity
//         onPress={handleLogout}
//         style={{
//           flexDirection: "row",
//           gap: 24,
//           alignItems: "center",
//           marginTop: 24,
//         }}
//       >
//         <MaterialIcons name="logout" size={30} color="red" />
//         <Text
//           style={{
//             fontSize: 22,
//             fontWeight: "bold",
//             color: "red",
//           }}
//         >
//           გამოსვლა
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 32,
//     backgroundColor: "white",
//   },
//   profileWrapper: {
//     marginTop: 32,
//     paddingVertical: 4,
//     paddingHorizontal: 2,
//     alignContent: "center",
//     borderColor: "rgba(0, 0, 0, 0.1)",
//     borderWidth: 2,
//     borderRadius: 10,
//     flexDirection: "row",
//     gap: 8,
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
// });

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user)
        throw new Error("გთხოვთ თავიდან შეხვიდეთ აპლიკაციაში!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user)
        throw new Error("მომხმარებელი ამ სესიაზე მიუწვდომელია!!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Website"
          value={website || ""}
          onChangeText={(text) => setWebsite(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

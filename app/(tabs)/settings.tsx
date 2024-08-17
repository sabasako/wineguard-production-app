import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import colors from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";

export default function Settings({ session }: { session: Session }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      } else {
        Alert.alert("Error Accessing User");
      }
    });
    setLoading(false);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileWrapper}>
        <EvilIcons
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: [{ translateY: Platform.OS === "android" ? -10 : 0 }],
          }}
          name="user"
          size={104}
          color={"red"}
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nameText}>
            {user?.user_metadata?.name || "სახელი გვარი"}
          </Text>
          <Text style={styles.emailText}>
            {user?.user_metadata?.email || "ელ. ფოსტა"}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <Entypo name="help" size={24} color="gray" />
        <Link
          href={"https://www.wineguard.ge/"}
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "gray",
          }}
        >
          დახმარება
        </Link>
      </View>

      <TouchableOpacity
        onPress={() => supabase.auth.signOut()}
        style={{
          flexDirection: "row",
          gap: 24,
          alignItems: "center",
          marginTop: 24,
        }}
        activeOpacity={0.6}
      >
        <MaterialIcons name="logout" size={30} color="red" />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "red",
          }}
        >
          გამოსვლა
        </Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color={colors.primary} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    backgroundColor: "white",
  },
  profileWrapper: {
    marginTop: 32,
    paddingVertical: 4,
    paddingHorizontal: 2,
    alignContent: "center",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 20,
    flexShrink: 1,
  },
  emailText: {
    color: "gray",
    fontSize: 14,
    marginTop: 3,
  },
});

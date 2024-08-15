import {
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

export default function Settings() {
  const { onLogout } = useAuth();

  function handleLogout() {
    if (onLogout) {
      onLogout();
      router.replace("/auth/login");
    } else {
      console.error("onLogout function is not defined");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileWrapper}>
        <EvilIcons name="user" size={104} color={"red"} />
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ fontWeight: "bold", fontSize: 20 }}
          >
            ირაკლი გამსახურდია
          </Text>
          <Text style={{ color: "gray", fontSize: 14, marginTop: 3 }}>
            irakli.gamsakhurdia@gmail.com
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
        onPress={handleLogout}
        style={{
          flexDirection: "row",
          gap: 24,
          alignItems: "center",
          marginTop: 24,
        }}
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
});

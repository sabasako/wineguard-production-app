import {
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const windowWidth = Dimensions.get("window").width;

export default function Login() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <View style={styles.main}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 155, height: 188 }}
          />
          <Text
            style={{
              fontSize: 32,
              color: colors.primary,
              marginVertical: 24,
              fontWeight: "bold",
            }}
          >
            რეგისტრაცია
          </Text>

          <View style={styles.inputWrapper}>
            <Entypo name="user" size={24} color={colors.primary} />
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.primary}
              placeholder="სახელი და გვარი"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Entypo name="mail" size={24} color={colors.primary} />
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.primary}
              placeholder="ელ-ფოსტა"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Entypo name="lock" size={24} color={colors.primary} />
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.primary}
              placeholder="პაროლი"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Entypo name="lock" size={24} color={colors.primary} />
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.primary}
              placeholder="გაიმეორე პაროლი"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>რეგისტრაცია</Text>
          </TouchableOpacity>

          {/* 
        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loading}
          />
        )} */}
        </View>
      </KeyboardAvoidingView>

      <Text
        style={{
          fontSize: 14,
          color: colors.text,
          marginBottom: 40,
          marginTop: "auto",
          fontWeight: "bold",
        }}
      >
        უკვე რეგისტრირებული ხარ?
      </Text>

      <Link
        style={{
          fontSize: 14,
          color: colors.primary,
          marginBottom: 40,
          marginTop: 16,
          fontWeight: "bold",
        }}
        href={"/auth/login"}
      >
        გაირე ავტორიზაცია
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 12,
    flex: 1,
    width: "100%",
    // marginTop: 200,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  loading: {
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    width: "100%",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  input: {
    height: 48,
    paddingVertical: 12,
    flex: 1,
  },
  button: {
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: windowWidth - 72,
    marginTop: 28,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },
});

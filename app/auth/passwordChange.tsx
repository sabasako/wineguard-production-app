import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "@/constants/Colors";
import { Platform } from "react-native";
import { CustomInput } from "@/components/auth/CustomInput";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export default function passwordChange() {
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    try {
      setLoading(true);

      // Check user input
      validateUserInput();

      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw new Error(error.message);

      Alert.alert("პაროლი წარმატებით შეიცვალა", "გთხოვთ გაიაროთ ავტორიზაცია!");
      router.push("/auth/login");
    } catch (err: any) {
      Alert.alert("შეცდომა", err.message);
    } finally {
      setLoading(false);
    }
  }

  function validateUserInput() {
    if (!password || !repeatedPassword) {
      throw new Error("გთხოვთ შეავსოთ ყველა ველი");
    }
    if (password !== repeatedPassword) {
      throw new Error("გთხოვთ შეიყვანოთ ერთიდაიგივე პაროლი!");
    }
    if (password.length < 6) {
      throw new Error("პაროლი მინიმუმ 6 სიმბოლოსგან უნდა შედგებოდეს!");
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 155, height: 188 }}
        />
        <Text
          style={{
            fontSize: 28,
            color: colors.primary,
            marginTop: 24,
            marginBottom: 20,
            fontWeight: "bold",
          }}
        >
          პაროლის აღდგენა
        </Text>

        <CustomInput
          onChangeText={setPassword}
          type="password"
          value={password}
          placeholder="შეიყვანეთ ახალი პაროლი"
          onSubmitEditing={handleResetPassword}
        />

        <CustomInput
          onChangeText={setRepeatedPassword}
          type="password"
          value={repeatedPassword}
          placeholder="გაიმეორეთ პაროლი"
          onSubmitEditing={handleResetPassword}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleResetPassword}
          // disabled={loading}
        >
          <Text style={styles.buttonText}>დადასტურება</Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loading}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 100,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    width: "75%",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 6,
    marginBottom: 12,
    paddingHorizontal: 12,
    marginTop: 32,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  loading: {
    marginTop: 20,
  },
});

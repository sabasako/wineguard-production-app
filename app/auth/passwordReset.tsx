import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import colors from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import checkEmailPattern from "@/lib/checkEmailPattern";
import { supabase } from "@/lib/supabase";
import { CustomInput } from "@/components/auth/CustomInput";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (email && checkEmailPattern(email.trim())) {
      setLoading(true);
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(
          email.trim()
        );
        if (error) throw error;
        Alert.alert(
          "პაროლის აღდგენა",
          `პაროლის აღსადგენი ლინკი გაიგზავნა ${email.trim()} ელ ფოსტაზე`
        );
        router.push("/auth/login");
      } catch (error: any) {
        Alert.alert("შეცდომა", error.message);
      } finally {
        setLoading(false);
      }
    } else if (!email) {
      Alert.alert("შეცდომა", "გთხოვთ შეიყვანოთ ელ-ფოსტა");
    } else {
      Alert.alert("შეცდომა", "გთხოვთ შეიყვანოთ რეალური ელ-ფოსტა");
    }
  };

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
          onChangeText={setEmail}
          type="mail"
          value={email}
          placeholder="ელ-ფოსტა"
          onSubmitEditing={handleResetPassword}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleResetPassword}
          disabled={loading}
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

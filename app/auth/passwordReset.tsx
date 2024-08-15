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
} from "react-native";
import colors from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import checkEmailPattern from "@/lib/checkEmailPattern";

export default function PasswordReset() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (email && checkEmailPattern(email)) {
      Alert.alert(
        "პაროლის აღდგენა",
        `პაროლის აღსადგენი ლინკი გაიგზავნა ${email.trim()} ელ ფოსტაზე`
      );
      router.push("/auth/login");
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
      <ScrollView contentContainerStyle={styles.container}>
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

        <View style={styles.inputWrapper}>
          <Entypo name="mail" size={24} color={colors.primary} />
          <TextInput
            style={styles.input}
            placeholderTextColor={colors.primary}
            placeholder="ელ-ფოსტა"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleResetPassword}
        >
          <Text style={styles.buttonText}>დადასტურება</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 12,
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
  input: {
    height: 48,
    paddingVertical: 12,
    flex: 1,
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
});

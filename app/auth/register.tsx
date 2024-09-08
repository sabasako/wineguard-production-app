import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "@/constants/Colors";
import { CustomInput } from "@/components/auth/CustomInput";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import checkEmailPattern from "@/lib/checkEmailPattern";
import { AuthError } from "@supabase/supabase-js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useKeyboard from "@/hooks/useKeyboard";

const windowWidth = Dimensions.get("window").width;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isKeyboardVisible } = useKeyboard();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const repeatedPasswordInputRef = useRef<TextInput>(null);

  async function signUpWithEmail() {
    try {
      setLoading(true);

      // Check user input
      validateUserInput();

      // Attempt to sign up
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            name: name.trim(),
          },
        },
      });

      // Check for server errors
      if (error) throw new Error(getErrorMessage(error));

      // Handle successful sign up
      if (data.user) {
        // Alert.alert("თქვენ წარმატებით დარეგისტრირდით!");
        Alert.alert("გთხოვთ შეამოწმოთ ელ-ფოსტა ვერიფიკაციისთვის!");
        router.push("/auth/login");
      }
    } catch (error: any) {
      Alert.alert("შეცდომა", error.message);
    } finally {
      setLoading(false);
    }
  }

  function validateUserInput() {
    if (!password || !email || !repeatedPassword || !name) {
      throw new Error("გთხოვთ შეავსოთ ყველა ველი");
    }
    if (!checkEmailPattern(email)) {
      throw new Error("გთხოვთ შეიყვანოთ რეალური ელ-ფოსტა");
    }
    if (password !== repeatedPassword) {
      throw new Error("გთხოვთ შეიყვანოთ ერთიდაიგივე პაროლი!");
    }
    if (password.length < 6) {
      throw new Error("პაროლი მინიმუმ 6 სიმბოლოსგან უნდა შედგებოდეს!");
    }
  }

  function getErrorMessage(error: AuthError): string {
    if (error.status === 0) {
      return "გთხოვთ შეამოწმოთ ინტერნეტთან კავშირი!";
    } else if (
      error.status === 422 &&
      error.message === "User already registered"
    ) {
      return "ასეთი მომხმარებელი უკვე არსებობს!";
    } else {
      return error.message;
    }
  }
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar style="dark" />
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

        <CustomInput
          type="name"
          onChangeText={(name) => setName(name)}
          value={name}
          placeholder="სახელი და გვარი"
          returnKeyType="next"
          onSubmitEditing={() => emailInputRef.current?.focus()}
        />

        <CustomInput
          ref={emailInputRef}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          value={email}
          type="mail"
          placeholder="ელ-ფოსტა"
          onChangeText={(text) => setEmail(text)}
          returnKeyType="next"
        />

        <CustomInput
          value={password}
          ref={passwordInputRef}
          onSubmitEditing={() => repeatedPasswordInputRef.current?.focus()}
          type="password"
          placeholder="პაროლი"
          onChangeText={(text) => setPassword(text)}
          returnKeyType="next"
        />

        <CustomInput
          ref={repeatedPasswordInputRef}
          onSubmitEditing={signUpWithEmail}
          value={repeatedPassword}
          type="password"
          placeholder="გაიმეორეთ პაროლი"
          onChangeText={(text) => setRepeatedPassword(text)}
        />

        <TouchableOpacity
          disabled={loading}
          onPress={signUpWithEmail}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>რეგისტრაცია</Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loading}
          />
        )}
      </View>

      {!isKeyboardVisible && (
        <>
          <Text
            style={{
              fontSize: 14,
              color: colors.text,
              marginBottom: 56,
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
              fontWeight: "bold",
            }}
            href={"/auth/login"}
          >
            გაირე ავტორიზაცია
          </Link>
        </>
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 40,
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 12,
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  loading: {
    marginTop: 20,
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

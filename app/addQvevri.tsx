import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import colors from "../constants/Colors";

export default function Page({ changeScreen }: { changeScreen: any }) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (id === "") {
      Alert.alert("შეცდომა", "გთხოვთ შეიყვანოთ აიდი");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("ასეთი მოწყობილება არ არსებობს", `აიდი: "${id}" არ მოიძებნა`);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require("../assets/images/qvevri.png")}
            style={{ width: 250, height: 250 }}
          ></Image>
          <Text style={styles.title}>მოწყობილობის დამატება</Text>
          <TextInput
            style={styles.input}
            placeholder="შეიყვანეთ მოწყობილობის აიდი"
            placeholderTextColor={"gray"}
            value={id}
            onChangeText={(text) => setId(text)}
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>დამატება</Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={styles.loading}
            />
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 70,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "83%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 7,
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
  backButton: {
    position: "absolute",
    top: -40,
    left: 20,
    zIndex: 1,
  },
  loading: {
    marginTop: 20,
  },
});

import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import colors from "../constants/Colors";
import useAddQvevri from "@/hooks/useAddQvevri";
import { router } from "expo-router";
import { CustomInput } from "@/components/auth/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Page() {
  const [id, setId] = useState("");
  const { handleAddQvevri, loading } = useAddQvevri();

  async function handleSubmit() {
    const success = await handleAddQvevri(id.trim());
    if (success) {
      setId("");
      router.push("/");
    }
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <Image
        source={require("../assets/images/qvevri.png")}
        style={{ width: 250, height: 250 }}
      ></Image>
      <Text style={styles.title}>მოწყობილობის დამატება</Text>
      <CustomInput
        onChangeText={setId}
        type="id"
        value={id}
        placeholder="შეიყვანეთ მოწყობილობის აიდი"
        placeholderTextColor={"gray"}
        onSubmitEditing={handleSubmit}
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
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 24,
    marginTop: 70,
    marginBottom: 20,
    fontWeight: "bold",
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

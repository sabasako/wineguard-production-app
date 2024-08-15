import React, { useState } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "@/constants/Colors";

type InputType = "mail" | "password" | "name";

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  type: InputType;
  placeholder?: string;
}

const ariaLabel: Record<InputType, string> = {
  mail: "ელ-ფოსტა",
  password: "პაროლი",
  name: "სახელი და გვარი",
};

const getIcon = (type: InputType, showPassword: boolean) => {
  const iconProps = {
    size: 24,
    color: colors.primary,
  };

  switch (type) {
    case "password":
      return (
        <Entypo name={showPassword ? "lock-open" : "lock"} {...iconProps} />
      );
    case "mail":
      return <Entypo name="mail" {...iconProps} />;
    case "name":
      return <Entypo name="user" {...iconProps} />;
  }
};

export default function CustomInput({
  value,
  onChangeText,
  type,
  placeholder = "",
  ...restProps
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputWrapper}>
      {getIcon(type, showPassword)}
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.primary}
        placeholder={placeholder}
        secureTextEntry={type === "password" && !showPassword}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
        accessibilityLabel={ariaLabel[type]}
        accessibilityHint={`შეიყვანე შენი ${type}`}
        {...restProps}
      />
      {type === "password" && (
        <Entypo
          name={showPassword ? "eye" : "eye-with-line"}
          size={24}
          color={colors.primary}
          onPress={() => setShowPassword((prev) => !prev)}
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          accessibilityRole="button"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});

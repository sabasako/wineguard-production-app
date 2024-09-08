import React, { forwardRef, useState } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import { Entypo } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import colors from "@/constants/Colors";

type InputType = "mail" | "password" | "name" | "id";

interface PasswordInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  type: InputType;
  placeholder?: string;
  style?: any;
}

const ariaLabel: Record<InputType, string> = {
  mail: "ელ-ფოსტა",
  password: "პაროლი",
  name: "სახელი და გვარი",
  id: "შეიყვანეთ მოწყობილობის აიდი",
};

const getIcon = (type: InputType, showPassword: boolean) => {
  const iconProps = {
    size: 24,
    color: type === "id" ? "gray" : colors.primary,
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
    case "id":
      return <MaterialCommunityIcons name="identifier" {...iconProps} />;
  }
};

export const CustomInput = forwardRef<TextInput, PasswordInputProps>(
  (
    { value, onChangeText, type, placeholder = "", style, ...restProps },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <View
        style={[
          styles.inputWrapper,
          type === "id" ? { borderColor: "gray" } : {},
        ]}
      >
        {getIcon(type, showPassword)}
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          placeholderTextColor={colors.primary}
          placeholder={placeholder}
          keyboardType={type === "mail" ? "email-address" : "default"}
          inputMode={type === "mail" ? "email" : "text"}
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
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
            accessibilityRole="button"
          />
        )}
      </View>
    );
  }
);

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

import { ReactNode } from "react";
import { TextInput as CustomTextInput, StyleSheet, View } from "react-native";

interface TextInputProps {
  placeholder: string;
  title: string;
  style?: object;
  children?: ReactNode;
}

export default function TextInput({
  placeholder,
  children,
  title,
  style,
  ...rest
}: TextInputProps) {
  return (
    <View style={styles.container}>
      {children}
      <CustomTextInput
        style={StyleSheet.flatten([styles.input, style])}
        placeholder={placeholder}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    flex: 1,
  },
});

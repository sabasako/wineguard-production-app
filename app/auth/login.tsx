// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import colors from "@/constants/Colors";
// import { StatusBar } from "expo-status-bar";
// import { Link, router } from "expo-router";
// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import CustomInput from "@/components/auth/CustomInput";
// import checkEmailPattern from "@/lib/checkEmailPattern";

// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// const windowWidth = Dimensions.get("window").width;

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function signInWithEmail() {
//     setLoading(true);

//     if (!email || !password) {
//       Alert.alert("შეცდომა", "გთხოვთ შეავსოთ ყველა ველი");
//       setLoading(false);
//       return;
//     }

//     if (!checkEmailPattern(email)) {
//       Alert.alert("შეცდომა", "გთხოვთ შეიყვანოთ რეალური ელ-ფოსტა");
//       setLoading(false);
//       return;
//     }

//     const { error, data } = await supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     });

//     if (error) {
//       if (error.status === 400) {
//         Alert.alert("შეცდომა", "ელ-ფოსტა ან პაროლი არასწორია");
//       } else {
//         Alert.alert(error.message);
//       }
//     }
//     if (!error) {
//       router.replace("/");
//     }
//     setLoading(false);
//   }

//   return (
//     <KeyboardAvoidingView
//       contentContainerStyle={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.main}>
//         <StatusBar style="dark" />

//         <Image
//           source={require("../../assets/images/logo.png")}
//           style={{ width: 155, height: 188 }}
//         />
//         <Text
//           style={{
//             fontSize: 32,
//             color: colors.primary,
//             marginVertical: 24,
//             fontWeight: "bold",
//           }}
//         >
//           ავტორიზაცია
//         </Text>

//         <CustomInput
//           value={email}
//           type="mail"
//           placeholder="ელ-ფოსტა"
//           onChangeText={(text) => setEmail(text)}
//         />

//         <CustomInput
//           value={password}
//           type="password"
//           placeholder="პაროლი"
//           onChangeText={(text) => setPassword(text)}
//         />

//         <Link
//           href={"/auth/passwordReset"}
//           style={{
//             fontSize: 14,
//             color: colors.primary,
//             marginVertical: 6,
//             marginBottom: 20,
//             marginLeft: "auto",
//             fontWeight: "bold",
//           }}
//         >
//           დაგავიწყდა პაროლი?
//         </Link>

//         <TouchableOpacity
//           disabled={loading}
//           onPress={signInWithEmail}
//           style={styles.button}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.buttonText}>შესვლა</Text>
//         </TouchableOpacity>

//         {loading && (
//           <ActivityIndicator
//             size="large"
//             color={colors.primary}
//             style={styles.loading}
//           />
//         )}

//         <Text
//           style={{
//             fontSize: 14,
//             color: colors.text,
//             marginBottom: 40,
//             marginTop: "auto",
//             fontWeight: "bold",
//           }}
//         >
//           არ ხარ რეგისტრირებული?
//         </Text>
//         <Link
//           style={{
//             fontSize: 14,
//             color: colors.primary,
//             marginBottom: 40,
//             marginTop: 16,
//             fontWeight: "bold",
//           }}
//           href={"/auth/register"}
//         >
//           გაირე რეგისტრაცია
//         </Link>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 24,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   main: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: colors.white,
//     padding: 12,
//     flex: 1,
//     width: "100%",
//     marginTop: 200,
//   },
//   title: {
//     fontSize: 64,
//     fontWeight: "bold",
//   },
//   loading: {
//     marginTop: 20,
//   },
//   button: {
//     padding: 12,
//     backgroundColor: colors.primary,
//     borderRadius: 10,
//     width: windowWidth - 80,
//   },
//   buttonText: {
//     textAlign: "center",
//     fontSize: 18,
//     color: "#fff",
//   },
// });

// import React from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
// } from "react-native";

// const RegistrationScreen = () => {
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
//     >
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <Image
//           source={require("../../assets/images/logo.png")}
//           style={{ width: 355, height: 688 }}
//         />

//         <Text style={styles.title}>Create Account</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           placeholderTextColor={"#000"}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           placeholderTextColor={"#000"}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           placeholderTextColor={"#000"}
//           secureTextEntry
//         />

//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Register</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.linkButton}>
//           <Text style={styles.linkButtonText}>
//             Already have an account? Log in
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   scrollView: {
//     // flexGrow: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "white",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     borderRadius: 5,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   linkButton: {
//     marginTop: 15,
//   },
//   linkButtonText: {
//     color: "#007AFF",
//     textAlign: "center",
//   },
// });

// export default RegistrationScreen;

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
  TouchableOpacity,
  View,
} from "react-native";
import colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import CustomInput from "@/components/auth/CustomInput";
import checkEmailPattern from "@/lib/checkEmailPattern";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const windowWidth = Dimensions.get("window").width;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    if (!email || !password) {
      Alert.alert("შეცდომა", "გთხოვთ შეავსოთ ყველა ველი");
      setLoading(false);
      return;
    }

    if (!checkEmailPattern(email)) {
      Alert.alert("შეცდომა", "გთხოვთ შეიყვანოთ რეალური ელ-ფოსტა");
      setLoading(false);
      return;
    }

    const { error, data } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      if (error.status === 400) {
        Alert.alert("შეცდომა", "ელ-ფოსტა ან პაროლი არასწორია");
      } else {
        Alert.alert(error.message);
      }
    }
    if (!error) {
      router.replace("/");
    }
    setLoading(false);
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
          ავტორიზაცია
        </Text>

        <CustomInput
          value={email}
          type="mail"
          placeholder="ელ-ფოსტა"
          onChangeText={(text) => setEmail(text)}
        />

        <CustomInput
          value={password}
          type="password"
          placeholder="პაროლი"
          onChangeText={(text) => setPassword(text)}
        />

        <Link
          href={"/auth/passwordReset"}
          style={{
            fontSize: 14,
            color: colors.primary,
            marginVertical: 6,
            marginBottom: 20,
            marginLeft: "auto",
            fontWeight: "bold",
          }}
        >
          დაგავიწყდა პაროლი?
        </Link>

        <TouchableOpacity
          disabled={loading}
          onPress={signInWithEmail}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>შესვლა</Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loading}
          />
        )}
      </View>

      <Text
        style={{
          fontSize: 14,
          color: colors.text,
          marginBottom: 40,
          marginTop: "auto",
          fontWeight: "bold",
        }}
      >
        არ ხარ რეგისტრირებული?
      </Text>
      <Link
        style={{
          fontSize: 14,
          color: colors.primary,
          marginBottom: 40,
          marginTop: 16,
          fontWeight: "bold",
        }}
        href={"/auth/register"}
      >
        გაირე რეგისტრაცია
      </Link>
    </KeyboardAwareScrollView>
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
  button: {
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: windowWidth - 80,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },
});

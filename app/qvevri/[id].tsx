import { useLocalSearchParams, Stack } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import qvevrebiData from "@/data/qvevrebi.json";
import colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

export default function DynamicTabScreen() {
  const { id } = useLocalSearchParams();
  const qvevri = qvevrebiData.find((qvevri) => qvevri.id === id);

  const [isActive, setIsActive] = useState(qvevri?.active);

  function changeStatus() {
    setIsActive((prev) => !prev);
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: qvevri?.title,
        }}
      />
      <View style={styles.main}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              borderRadius: 110,
              borderWidth: 3,
              borderColor: colors.primary,
              height: 220,
              width: 220,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/Pressure.png")}
              style={{ width: 60, height: 50 }}
            />
            <Text
              style={{
                fontSize: 56,
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              {Math.round(Number(qvevri?.pressure || 0) * 10) / 10}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 15,
            transform: [{ rotate: "270deg" }],
            marginLeft: "20%",
            marginTop: 60,
            marginBottom: 2,
          }}
        >
          <Image
            source={require("../../assets/images/back.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <LinearGradient
          // Button Linear Gradient
          colors={["#24FF00", "#EBFF00", "#F72222"]}
          style={styles.slider}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        <View style={{ marginTop: 120, marginBottom: 50 }}>
          <View style={styles.elementsWrapper}>
            <Image
              source={require("../../assets/images/elements/nh3.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text
              style={{
                fontSize: 16,
                marginBottom: 16,
                marginLeft: 10,
                fontWeight: "bold",
              }}
            >
              NH3 - {qvevri?.nh3 ? qvevri.nh3 : 0}
            </Text>
          </View>

          <View style={styles.elementsWrapper}>
            <Image
              source={require("../../assets/images/elements/co.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                marginBottom: 30,
                fontWeight: "bold",
              }}
            >
              CO - {qvevri?.co ? qvevri.co : 0}
            </Text>
          </View>

          <View style={styles.elementsWrapper}>
            <Image
              source={require("../../assets/images/elements/no2.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                marginBottom: 30,
                fontWeight: "bold",
              }}
            >
              NO2 - {qvevri?.no2 ? qvevri.no2 : 0}
            </Text>
          </View>

          <View style={styles.elementsWrapper}>
            <Image
              source={require("../../assets/images/elements/thermometer.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                marginBottom: 30,
                fontWeight: "bold",
              }}
            >
              ტემპერატურა - {qvevri?.temperature ? qvevri.temperature : 0}
            </Text>
          </View>

          <View style={styles.elementsWrapper}>
            <Image
              source={require("../../assets/images/elements/pressure.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                marginBottom: 30,
                fontWeight: "bold",
              }}
            >
              წნევა - {qvevri?.pressure ? qvevri.pressure : 0}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.button,
              { backgroundColor: isActive ? "#F72222" : "#16a34a" },
            ]}
            onPress={changeStatus}
          >
            <Text style={styles.buttonText}>
              {isActive ? "გაჩერება" : "დაწყება"}
            </Text>
          </TouchableOpacity>

          {/* {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )} */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    padding: 12,
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 36,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  slider: {
    height: 35,
    width: "100%",
    borderRadius: 35,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  elementsWrapper: {
    alignContent: "center",
    flexDirection: "row",
  },
  button: {
    width: "100%",
    marginTop: "auto",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    color: "white",
  },
});

import { useLocalSearchParams, Stack } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { useGetQvevri } from "@/hooks/useGetQvevri";

export default function QvevriRealTimeInformation() {
  const { id } = useLocalSearchParams();
  const {
    qvevriData: qvevri,
    loading,
    isActive,
    changeStatus,
  } = useGetQvevri(id as string);

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: qvevri?.title,
        }}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <View style={styles.main}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.pressureWrapper}>
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
              {Math.round(Number(qvevri?.co2 || 0) * 10) / 10}
            </Text>
          </View>
        </View>
        <View style={styles.backWrapper}>
          <Image
            source={require("../../assets/images/back.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <LinearGradient
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
            <Text style={styles.subtitle}>NH3 - {qvevri?.co2 ?? 0}</Text>
          </View>

          <View style={styles.elementsWrapper}>
            <Image
              source={require("../../assets/images/elements/co.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.subtitle}>CO - {qvevri?.co2 ?? 0}</Text>
          </View>

          <View style={styles.elementsWrapper}>
            <Image
              source={require("../../assets/images/elements/no2.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.subtitle}>NO2 - {qvevri?.no2 ?? 0}</Text>
          </View>

          <View style={styles.elementsWrapper}>
            <Image
              source={require("../../assets/images/elements/thermometer.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.subtitle}>
              ტემპერატურა - {qvevri?.co2 ?? 0}
            </Text>
          </View>

          <View style={styles.elementsWrapper}>
            <Image
              source={require("../../assets/images/elements/pressure.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.subtitle}>წნევა - {qvevri?.co2 ?? 0}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.button,
              { backgroundColor: isActive ? "#F72222" : "#16a34a" },
            ]}
            disabled={loading}
            onPress={changeStatus}
          >
            <Text style={styles.buttonText}>
              {isActive ? "გაჩერება" : "დაწყება"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  main: {
    padding: 12,
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 36,
  },
  pressureWrapper: {
    borderRadius: 110,
    borderWidth: 3,
    borderColor: colors.primary,
    height: 220,
    width: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  backWrapper: {
    width: 15,
    transform: [{ rotate: "270deg" }],
    marginLeft: "20%",
    marginTop: 60,
    marginBottom: 2,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 30,
    fontWeight: "bold",
  },
  slider: {
    height: 35,
    width: "100%",
    borderRadius: 35,
  },
  loadingContainer: {
    position: "absolute",
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
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

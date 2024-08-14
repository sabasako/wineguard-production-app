import { Link } from "expo-router";
import colors from "../constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";

interface QvevriTitleProps {
  title: string;
  active: boolean;
  pressure: number;
  id: string;
}

export default function QvevriItem({
  title,
  active,
  pressure,
  id,
}: QvevriTitleProps) {
  return (
    <Link href={`/qvevri/${id}`} style={styles.container}>
      <View style={styles.textCont}>
        <View
          style={{
            borderRadius: 16,
            backgroundColor: colors.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            padding: 5,
            marginBottom: 12,
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: active ? "#22F737" : "#F72222",
              marginLeft: 5,
            }}
          />
          <Text style={styles.subtext}>{active ? "ჩართული" : "გამორთული"}</Text>
        </View>
        <Text style={styles.title}>
          <Image
            source={require("../assets/images/qvevri.png")}
            style={{ width: 22, height: 22 }}
          />
          {title}
        </Text>
      </View>
      <View style={styles.pressureWrapper}>
        <Image
          source={require("../assets/images/Pressure.png")}
          style={{ width: 22, height: 22 }}
        />
        <Text style={styles.title}>
          {Math.round(Number(pressure) * 10) / 10}
        </Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 16,
    backgroundColor: colors.tertiary,
    borderColor: colors.primary,
    padding: 6,
    borderWidth: 3,
    marginVertical: 16,
  },
  img: {
    width: 100,
    height: 75,
    borderRadius: 12,
  },
  textCont: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontWeight: "bold",
  },
  subtext: {
    marginTop: 4,
    fontSize: 14,
    color: colors.white,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  pressureWrapper: {
    flexDirection: "row",
    alignItems: "center",
    // position: "absolute",
    // right: 0,
    gap: 5,
  },
});

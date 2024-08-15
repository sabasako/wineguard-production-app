import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/Colors";
import QvevriItem from "@/components/QvevriItem";
import qvevrebiData from "@/data/qvevrebi.json";
import { Link } from "expo-router";

export default function Home() {
  return (
    <ScrollView>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>ქვევრები</Text>
        <Link href={"/addQvevri"}>
          <AntDesign name="plus" size={36} color="black" />
        </Link>
      </View>
      <View style={styles.qvevrebiWrapper}>
        {qvevrebiData.map((qvevri) => (
          <QvevriItem {...qvevri} key={qvevri.id} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 72,
    marginBottom: 24,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    color: colors.primary,
  },
  qvevrebiWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 10,
    gap: 28,
  },
});

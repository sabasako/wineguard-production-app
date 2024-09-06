import AntDesign from "@expo/vector-icons/AntDesign";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../constants/Colors";
import QvevriItem from "@/components/QvevriItem";
import { Link } from "expo-router";
import useGetAllQvevri from "@/hooks/useGetAllQvevri";
import { useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const { loading, qvevrebi } = useGetAllQvevri(refresh);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <ScrollView>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>ქვევრები</Text>
        <Link href={"/addQvevri"}>
          <AntDesign name="plus" size={36} color="black" />
        </Link>
      </View>
      <View style={styles.qvevrebiWrapper}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 144 }}
          />
        )}

        {qvevrebi.map((qvevri) => (
          <QvevriItem
            key={qvevri.qvevri_id}
            active={qvevri.active}
            id={qvevri.qvevri_id}
            pressure={qvevri.no2}
            title={qvevri.title}
            onDelete={handleRefresh}
          />
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

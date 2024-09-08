import AntDesign from "@expo/vector-icons/AntDesign";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../constants/Colors";
import QvevriItem from "@/components/QvevriItem";
import { Link, useFocusEffect } from "expo-router";
import useGetAllQvevri from "@/hooks/useGetAllQvevri";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { loading, qvevrebi } = useGetAllQvevri(refresh);

  function handleRefresh() {
    setRefresh((prev) => !prev);
  }

  function onRefresh() {
    setRefreshing(true);
    handleRefresh();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  useFocusEffect(
    useCallback(() => {
      handleRefresh();
    }, [])
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={colors.primary}
          colors={[colors.primary]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
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
            refreshHome={handleRefresh}
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
    marginTop: 16,
    paddingHorizontal: 10,
    gap: 28,
  },
});

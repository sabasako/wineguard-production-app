import AntDesign from "@expo/vector-icons/AntDesign";
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../constants/Colors";
import QvevriItem from "@/components/QvevriItem";
import { Link, useFocusEffect } from "expo-router";
import useGetAllQvevri from "@/hooks/useGetAllQvevri";
import { useCallback, useEffect, useState } from "react";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import TutorialScreen from "@/components/tutorial/TutorialScreen";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { loading, qvevrebi } = useGetAllQvevri(refresh);

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
        return;
      }

      if (data?.user?.user_metadata.first_login) {
        router.replace("/tutorial");
      }
    }

    getUser();
  }, []);

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

  function handleAddQvevri() {
    router.push("/addQvevri");
  }

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
      <StatusBar style="dark" />

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>ქვევრები</Text>
        <Link href={"/addQvevri"}>
          <AntDesign name="plus" size={36} color="black" />
        </Link>
      </View>
      <View style={styles.qvevrebiWrapper}>
        {loading && (qvevrebi?.length === 0 || !qvevrebi) && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 144 }}
          />
        )}

        {/* {firstLogin && <TutorialScreen></TutorialScreen>} */}

        {qvevrebi.length === 0 && !loading && (
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <Image
                source={require("../../assets/images/qvevri.png")}
                style={{ width: 200, height: 200 }}
              />

              <Text
                style={{
                  marginBottom: 10,
                  marginTop: 20,
                  fontSize: 24,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                ქვევრები ვერ მოიძებნა
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={handleAddQvevri}
                activeOpacity={0.8}
                style={{
                  borderRadius: 15,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <AntDesign name="plus" size={36} color={"white"} />
                <Text
                  style={{
                    color: "white",
                    fontSize: 24,
                    fontWeight: 700,
                    marginTop: 4,
                  }}
                >
                  დამატება
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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

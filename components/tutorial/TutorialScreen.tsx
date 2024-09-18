import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Swiper from "react-native-swiper";
import AntDesign from "@expo/vector-icons/AntDesign";
import TutorialSlide from "./TutorialSlide";
import { supabase } from "@/lib/supabase";

export default function TutorialScreen() {
  const { height } = useWindowDimensions();

  async function handleSkip() {
    router.replace("/");
    const { data, error } = await supabase.auth.updateUser({
      data: { first_login: false },
    });
  }

  const renderPagination = (index: number, total: number, context: any) => {
    return (
      <View style={styles.paginationStyle}>
        <View style={styles.dotsContainer}>
          {Array.from({ length: total }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
        {index < total - 1 ? (
          <TouchableOpacity
            onPress={() => context.scrollBy(1)}
            style={styles.nextButton}
          >
            <AntDesign name="arrowright" size={32} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSkip} style={styles.nextButton}>
            <AntDesign name="arrowright" size={32} color="white" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const data = [
    {
      heading: "მოგესალმებით Wineguard-ის აპლიკაციაში!",
      description:
        "ეს აპლიკაცია საშუალებას მოგცემთ თვალი ადევნოთ თქვენი ქვევრების მდგომარეობას რეალურ დროში",
      image: require("../../assets/images/logo.png"),
    },
    {
      heading: "ქვევრის დასამატებლად, დააჭირეთ + ღილაკს",
      description:
        "შემდეგ შეიყვანეთ ქვევრის უნიკალური აიდი და დააჭირეთ დადასტურებას. თქვენი ქვევრი ახლა გამოჩნდება მთავარ გვერდზე",
      image: require("../../assets/images/addQvevri.png"),
    },
    {
      heading:
        "მონაცემების სანახავად, უბრალოდ დააჭირეთ სასურველ ქვევრს მთავარ გვერდზე",
      description:
        "შემდეგ გაიხსნება ახალი ეკრანი, სადაც შეგიძლიათ ნახოთ ქვევრის მონაცემები რეალურ დროში, მათ შორის ტემპერატურა, ტენიანობა და სხვა მნიშვნელოვანი პარამეტრი",
      image: require("../../assets/images/accessQvevri.png"),
    },
    {
      heading: "მოწყობილობის ჩართვა/გამორთვა",
      description:
        "ეს ღილაკი საშუალებას გაძლევთ მართოთ მოწყობილობა. თუ ღილაკი წითელია, მოწყობილობა ჩართულია და აგროვებს მონაცემებს, ხოლო თუ მწვანე - გამორთული",
      image: require("../../assets/images/startButton.png"),
    },
  ];

  return (
    <ScrollView style={[styles.container, { height: height }]}>
      <StatusBar style="dark" />
      <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
        <Text style={styles.skipButtonText}>გამოტოვება</Text>
      </TouchableOpacity>
      <Swiper
        style={styles.wrapper}
        loop={false}
        horizontal={true}
        autoplay={false}
        showsButtons={false}
        renderPagination={renderPagination}
      >
        {data.map((item, i) => (
          <TutorialSlide key={i + item.heading} {...item} />
        ))}
      </Swiper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wrapper: {},
  paginationStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  skipButton: {
    position: "absolute",
    top: 80,
    right: 20,
    zIndex: 1,
  },
  skipButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 80,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },
});

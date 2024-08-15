import { Link } from "expo-router";
import colors from "../constants/Colors";
import { Image, StyleSheet, Text, Vibration, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Animated from "react-native-reanimated";
import * as Haptics from "expo-haptics";

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
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  if (deleteVisible) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDelete = () => {
    setModalVisible(false);
    console.log("წაიშალა");
  };

  const renderRightActions = () => {
    setDeleteVisible(true);

    return (
      <Animated.View style={[styles.deleteButtonContainer]}>
        <RectButton style={styles.deleteButton} onPress={toggleModal}>
          <Text style={styles.deleteButtonText}>წაშლა</Text>
        </RectButton>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={() => setDeleteVisible(false)}
      >
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
              <Text style={styles.subtext}>
                {active ? "ჩართული" : "გამორთული"}
              </Text>
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
      </Swipeable>

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropTransitionOutTiming={0}
      >
        <View style={styles.modalContent}>
          <Text>დარწმუნებული ხართ, რომ "{title}"-ის წაშლა გსურთ?</Text>
          <View style={styles.modalButtons}>
            <Text style={styles.modalButton} onPress={handleDelete}>
              კი
            </Text>
            <Text style={styles.modalButton} onPress={toggleModal}>
              არა
            </Text>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
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
  deleteButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 85,
    marginLeft: 6,
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 16,
    height: "100%",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
  },
  modalButton: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  statusContainer: {
    borderRadius: 16,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 5,
    marginBottom: 12,
  },
});

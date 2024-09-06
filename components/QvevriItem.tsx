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
import useDeleteQvevri from "@/hooks/useDeleteQvevri";

interface QvevriTitleProps {
  title: string;
  active: boolean;
  pressure: number;
  id: string;
  onDelete: () => void;
}

export default function QvevriItem({
  title,
  active,
  pressure,
  id,
  onDelete,
}: QvevriTitleProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { deleteQvevri, loading } = useDeleteQvevri();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDelete = async () => {
    setModalVisible(false);
    await deleteQvevri(id);
    onDelete();
  };

  const onSwipeableOpen = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const renderRightActions = () => {
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
        onSwipeableOpen={onSwipeableOpen}
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
                {active ? "ოპტიმალური" : "არაოპტიმალური"}
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
          <Text style={styles.modalHeading}>დადასტურება</Text>
          <Text style={styles.modalText}>
            დარწმუნებული ხართ, რომ "{title}"-ის წაშლა გსურთ?
          </Text>
          <View style={styles.modalButtons}>
            <Text style={styles.noButton} onPress={toggleModal}>
              არა
            </Text>
            <Text style={styles.yesButton} onPress={handleDelete}>
              კი, წაშალე!
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
    paddingTop: 22,
    borderRadius: 6,
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "left",
    color: "#6f6f6f",
    paddingHorizontal: 20,
  },
  modalText: {
    fontSize: 18,
    color: "#6f6f6f",
    paddingHorizontal: 20,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#ecf0f1",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    gap: 10,
  },
  yesButton: {
    backgroundColor: "#dc2626",
    fontSize: 18,
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  noButton: {
    backgroundColor: "#adc1c6",
    fontSize: 18,
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
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

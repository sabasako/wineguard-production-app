import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TutorialSlide({
  image,
  heading,
  description,
}: {
  image: ImageSourcePropType;
  heading: string;
  description: string;
}) {
  return (
    <View style={styles.slide}>
      <View style={styles.imageWrapper}>
        <Image style={{ width: 250, height: 250 }} source={image} />
      </View>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  imageWrapper: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    marginTop: 12,
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    fontSize: 16,
  },
});

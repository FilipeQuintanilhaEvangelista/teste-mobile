import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#30b49c",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center"
  },
  logo: {
    width: 80,
    height: 80,
    objectFit: "contain"
  },
  logout: {
    width: 40,
    height: 40,
    objectFit: "cover",
  }
});

export default styles;

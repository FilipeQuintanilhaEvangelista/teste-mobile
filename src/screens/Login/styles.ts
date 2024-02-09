import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#2a363f",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    gap: 16,
  },
  imgContainer: {
    alignItems: "center",
  },
  logoNeki: {
    width: 150,
    height: 150,
  },
  loginContainer: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 12,
    height: 56,
    marginBottom: 12,
    color: "#fff",
  },
  senhaInput: {
    position: "relative",
  },
  showHideButton: {
    position: "absolute",
    right: 10,
    top: 18,
    width: 25,
    height: 25,
  },
  lembrarSenha: {
    flexDirection: "row",
    marginBottom: 25,
    marginTop: 5,
    gap: 8,
    justifyContent: "flex-end",
    paddingRight: 12,
  },
  texto: {
    color: "#fff",
  },
  checkButton: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#4d9c77",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  redirect: {
    alignItems: "flex-end",
    marginTop: 15,
  },
});

export default styles;

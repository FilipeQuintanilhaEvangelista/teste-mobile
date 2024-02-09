import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#2a363f",
    flex: 1,
  },
  addskills: {
    backgroundColor: "#4d9c77",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    margin: 20,
  },
  skillContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#3e5161",
    borderRadius: 12,
    margin: 12,
  },
  skillText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
  },
  skillName: {
    marginTop: 12,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  SkillLevel: {
    marginVertical: 12,
    color: "#fff",
  },
  SkillDescription: {
    textAlign: "center",
    color: "#fff",
  },
  skillBotoes:{
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#4f606d",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  pickerStyle: {
    backgroundColor: "#829bae",
  },
  salvarSkill: {
    backgroundColor: "#4d9c77",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    margin: 20,
  },
  cancelar: {
    backgroundColor: "#bb5050",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 0
  },
  editarSkill: {
    backgroundColor: "#5562ac",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
  },
  excluirSkill: {
    backgroundColor: "#bb5050",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
  }
});

export default styles;

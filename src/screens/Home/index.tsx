import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addUserSkill,
  deleteUserSkill,
  getSkills,
  getSkillsByUserId,
  updateUserSkillLevel,
} from "../../service/api";
import styles from "./styles";

type User = {
  username: string;
  id: number;
};

type Skill = {
  skillId: number;
  name: string;
  level: string;
  id: number;
  imageUrl: string;
  description: string;
};

const Home = ({ navigation }) => {
  const [user, setUser] = useState<User>();
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [acesso, setAcesso] = useState({});
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSkillForEdit, setSelectedSkillForEdit] = useState<number>();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("BASICO");

  useEffect(() => {
    verifyLogin();
    getUserName();
    getAcesso();
  }, []);

  useEffect(() => {
    if (acesso) {
      pegaSkills();
    }
  }, [acesso]);

  useEffect(() => {
    if (user?.id && acesso) {
      getUserSkills();
    }
  }, [user, acesso]);

  useEffect(() => {
    if (allSkills.length > 0) {
      setSelectedSkill(allSkills[0]);
    }
  }, [allSkills]);

  const verifyLogin = async () =>{
    try {
      const usuarioLogado = await AsyncStorage.getItem("userLogged");
      if (usuarioLogado === null || usuarioLogado === undefined) {
        navigation.navigate("Login")
      }
    } catch (error) {
      console.error("Erro ao carregar o login salvo:", error);
    }
  }

  const getAcesso = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      if (accessToken !== null) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        setAcesso(config);
      }
    } catch (error) {
      console.log("não foi possível pegar o token", error);
    }
  };

  const getUserName = async () => {
    try {
      const usuarioLogado = await AsyncStorage.getItem("userLogged");
      if (usuarioLogado !== null || usuarioLogado !== undefined) {
        const arrayUser = JSON.parse(usuarioLogado);
        setUser(arrayUser);
      }
    } catch (error) {
      console.error("Erro ao carregar o login salvo:", error);
    }
  };

  const getUserSkills = async () => {
    try {
      const response = await getSkillsByUserId(user?.id, acesso);
      setUserSkills(response.data);
    } catch (error) {
      console.log("não foi possível pegar as skills", error);
    }
  };

  const pegaSkills = async () => {
    try {
      const response = await getSkills(acesso);
      setAllSkills(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    if (selectedSkill) {
      try {
        const response = await addUserSkill(user?.id, selectedSkill.id, acesso);
        console.log(response.data);

        getUserSkills();
        setSelectedSkill(null);
        setModalVisible(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteSkill = async (userSkillId) => {
    try {
      const response = await deleteUserSkill(userSkillId, acesso);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    getUserSkills();
  };

  const handleEditLevel = (skill) => {
    setEditModalVisible(true);
    setSelectedSkillForEdit(skill.id);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
  };

  const saveLevel = async () => {
    try {
      console.log("Nível selecionado:", selectedLevel);
      console.log(selectedSkillForEdit)

      const response = await updateUserSkillLevel(
        selectedSkillForEdit,
        selectedLevel,
        acesso
      );
      console.log(response.data);

      closeEditModal();
      setSelectedLevel("BASICO");
      getUserSkills();
    } catch (error) {
      console.log("Erro ao atualizar o nível da habilidade:", error);
    }
  };

  return (
    <>
      <Header navegacao={navigation} />
      <View style={styles.mainContainer}>
        <View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.addskills}
          >
            <Text style={{ color: "white", textTransform: "uppercase" }}>
              Adicionar Skill
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={userSkills}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.skillContainer}>
              <Image
                style={{ width: 100, height: 80, objectFit: "contain" }}
                source={{ uri: item.imageUrl }}
              />
              <Text style={styles.skillName}>{item.name}</Text>
              <Text style={styles.SkillLevel}>Level: {item.level === "BASICO" ? "Básico" : item.level === "INTERMEDIARIO" ? "Intermediário": item.level === "AVANCADO" ? "Avançado": ""}</Text>
              <Text style={styles.SkillDescription}>{item.description}</Text>
              <View style={styles.skillBotoes}>
                <TouchableOpacity style={styles.editarSkill} onPress={() => handleEditLevel(item)}>
                  <Text>Editar Level</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.excluirSkill} onPress={() => deleteSkill(item.id)}>
                  <Text>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              style={styles.pickerStyle}
              selectedValue={selectedSkill}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSkill(itemValue)
              }
            >
              <Picker.Item enabled={false} key="default" label="Selecione a skill" value="" />
              {allSkills.map((skill) => (
                <Picker.Item key={skill.id} label={skill.name} value={skill} />
              ))}
            </Picker>
            <TouchableOpacity onPress={handleSave} style={styles.salvarSkill}>
              <Text style={{ color: "white", textTransform: "uppercase" }}>
                Salvar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelar}
            >
              <Text style={{ color: "white", textTransform: "uppercase" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              style={styles.pickerStyle}
              selectedValue={selectedLevel}
              onValueChange={(itemValue, itemIndex) =>
                handleLevelChange(itemValue)
              }
            >
              <Picker.Item label="Básico" value="BASICO" />
              <Picker.Item label="Intermediário" value="INTERMEDIARIO" />
              <Picker.Item label="Avançado" value="AVANCADO" />
            </Picker>
            <TouchableOpacity onPress={saveLevel} style={styles.salvarSkill}>
              <Text style={{ color: "white", textTransform: "uppercase" }}>
                Salvar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeEditModal} style={styles.cancelar}>
              <Text style={{ color: "white", textTransform: "uppercase" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;

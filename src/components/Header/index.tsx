import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import logo from "../../../assets/logoHeader.png";
import logout from "../../../assets/logout.png";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import removerItemAsyncStorage from "../../utils/RemoveItem";

type User = {
  username: string;
  id: number;
};

const Header = ({navegacao}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUserName();
  }, []);

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

  const handleLogout = () =>{
    removerItemAsyncStorage("userLogged");
    removerItemAsyncStorage("token");
    navegacao.navigate("Login")
  }

  return (
    <View style={styles.headerContainer}>
      <Image source={logo} style={styles.logo} />
      <Text style={{fontSize: 16, fontWeight: "500"}}>Olá, {user?.username}!</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Image source={logout} style={styles.logout} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

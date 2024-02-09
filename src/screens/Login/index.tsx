import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import logoNeki from "../../../assets/Logo-Neki.png";
import showIcon from "../../../assets/show.png";
import hideIcon from "../../../assets/hide.png";
import checkIcon from "../../../assets/checkIcon.png";
import uncheckIcon from "../../../assets/uncheckIcon.png";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUsers, postLogin } from "../../service/api";

function Login({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  useEffect(() => {
    verifyLogin();
    retrieveLoginData();
  }, []);

  useEffect(() => {
    saveLoginData();
  }, [rememberPassword]);

  const verifyLogin = async () => {
    try {
      const usuarioLogado = await AsyncStorage.getItem("userLogged");
      console.log(usuarioLogado);
      if (usuarioLogado !== null || usuarioLogado !== undefined) {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Erro ao carregar o login salvo:", error);
    }
  };

  const saveLoginData = async () => {
    try {
      await AsyncStorage.setItem(
        "loginData",
        JSON.stringify({ login, rememberPassword, password })
      );
    } catch (error) {
      console.error("Erro ao salvar o login:", error);
    }
  };

  const retrieveLoginData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("loginData");
      if (storedData !== null) {
        const { login, rememberPassword, password } = JSON.parse(storedData);
        setLogin(login);
        setPassword(password);
        setRememberPassword(rememberPassword);
      }
    } catch (error) {
      console.error("Erro ao carregar o login salvo:", error);
    }
  };

  const handleRememberPasswordChange = () => {
    setRememberPassword(!rememberPassword);
  };

  const handleLogin = async () => {
    if (login !== "" && password !== "") {
      try {
        const response = await postLogin(login.trim(), password);

        try {
          await AsyncStorage.setItem("token", response.data.token);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
        alert("Credenciais incorretas");
      } finally {
        try {
          const accessToken = await AsyncStorage.getItem("token");
          if (accessToken !== null) {
            const config = {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            };

            try {
              const response = await getUsers(config);
              const userLogged = response.data.find(
                (user) => user.username === login.trim()
              );
              try {
                await AsyncStorage.setItem(
                  "userLogged",
                  JSON.stringify(userLogged)
                );
              } catch (error) {
                console.log(error);
              }

              navigation.navigate("Home");
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.error("Erro ao carregar o login salvo:", error);
        }
      }
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <Image source={logoNeki} style={styles.logoNeki} />
      </View>

      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          value={login}
          onChangeText={setLogin}
          placeholder="Login"
          placeholderTextColor="#fff"
        />
        <View style={styles.senhaInput}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity
            style={styles.showHideButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={showPassword ? hideIcon : showIcon}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.lembrarSenha}
          onPress={handleRememberPasswordChange}
        >
          <Text style={styles.texto}>Lembrar senha</Text>
          <Image
            source={rememberPassword ? checkIcon : uncheckIcon}
            style={styles.checkButton}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={{ color: "white", textTransform: "uppercase" }}>
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={styles.redirect}
        >
          <Text style={styles.texto}>Não possui conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;

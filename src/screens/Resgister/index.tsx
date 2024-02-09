import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import logoNeki from "../../../assets/Logo-Neki.png";
import showIcon from "../../../assets/show.png";
import hideIcon from "../../../assets/hide.png";
import styles from "./styles";
import { registerUser } from "../../service/api";

function Register({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (login === "" || password === "" || confirmPassword === "") {
      alert("Preencha todos os campos");
    } else {
      if (password !== confirmPassword) {
        alert("As senhas não coincidem");
        return 0;
      }
      try {
        const response = await registerUser(login.trim(), password);
        console.log(response.data);
        alert("Cadastrado com sucesso")
        setLogin("");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.log(error);
      }
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

        <View style={styles.senhaInput}>
          <TextInput
            style={styles.input}
            placeholder="Confirme a senha"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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

        <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
          <Text style={{ color: "#fff", textTransform: "uppercase" }}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={styles.redirect}
        >
          <Text style={styles.texto}>Voltar para o login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Register;

import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function removerItemAsyncStorage(chave: string) {
  try {
    await AsyncStorage.removeItem(chave);
  } catch (error) {
    console.log(error);
  }
}

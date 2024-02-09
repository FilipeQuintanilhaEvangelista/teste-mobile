import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import StackRoutes from "./Stack/stack.routes";

export const Routes = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <StackRoutes />
    </NavigationContainer>
  );
};

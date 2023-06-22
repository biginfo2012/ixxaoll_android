import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { defaultStyles } from "app/config";
import { LoginScreen } from "app/screens";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="IXXOLL for Mobile"
      component={LoginScreen}
      options={{
        headerShown: true,
        headerTintColor: defaultStyles.colors.white,
        headerStyle: {
          backgroundColor: defaultStyles.colors.alternatePrimary,
        },
      }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;

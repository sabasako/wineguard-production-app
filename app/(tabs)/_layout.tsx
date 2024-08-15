import { Redirect, Tabs } from "expo-router";
import React from "react";
import colors from "../../constants/Colors";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useAuth } from "@/contexts/AuthContext";

export default function TabLayout() {
  const { authState } = useAuth();

  console.log(authState);

  if (!authState?.authenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "მთავარი",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "პარამეტრები",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

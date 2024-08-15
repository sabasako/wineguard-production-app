import { Redirect, router, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import colors from "../../constants/Colors";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export default function TabLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/auth/login");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/auth/login");
      }
    });
  }, []);

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

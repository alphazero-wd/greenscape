import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Green } from "@/types/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Green.GREEN_500,
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          title: "Your bag",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="bag" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <AntDesign size={24} name="search1" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

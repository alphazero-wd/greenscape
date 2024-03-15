import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Color } from "@/types/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.Primary,
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
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="heart-sharp" color={color} />
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
            <Ionicons size={28} name="search" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

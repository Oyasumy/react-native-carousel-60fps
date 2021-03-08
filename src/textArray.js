import faker from "faker";

import React from "react";
import { Animated, StyleSheet, Text, View,Dimensions } from "react-native";
// import { AppContext } from "./AppContext";

const { width, height } = Dimensions.get("screen");

const data = [...Array(6).keys()].map((_, i) => {
  return {
    id: faker.random.uuid(),
    name: faker.name.lastName(),
    job: faker.name.jobTitle(),
  };
});

const SPACE = 20;
export default ({ ScrollX }) => {
  return (
    <Animated.View style={{ position: "absolute", zIndex: 3 }}>
      {data.map((item, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const translateY = ScrollX.interpolate({
          inputRange,
          outputRange: [30, 0, 30],
        });
        const opacity = ScrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });
        return (
          <Animated.View key={`img-${index}`} style={{ position: "absolute", marginTop: SPACE * 4, marginLeft: SPACE, opacity, transform: [{ translateY }] }}>
            <Animated.Text style={{ fontSize: 20 }}>{item.name}</Animated.Text>
            <Animated.Text style={{ fontSize: 17, opacity: 0.6 }}>{item.job}</Animated.Text>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

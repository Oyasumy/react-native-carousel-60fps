import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View, Animated } from "react-native";
import TextArray from "./src/textArray";
// import {AppContext} from './src/AppContext';

const { width, height } = Dimensions.get("screen");

const data = [
  "https://cdn.dribbble.com/users/3281732/screenshots/6852350/samji_illustrator.jpeg",
  "https://cdn.dribbble.com/users/3281732/screenshots/7118135/media/6984f7984b1052b9bdd5f2e29027ebc9.jpg",
  "https://cdn.dribbble.com/users/3281732/screenshots/7101536/media/d6a03bae1ed4eb3776814d906399c0ab.jpg",
  "https://cdn.dribbble.com/users/3281732/screenshots/10789882/media/a2b6545f0310ef683389c8d3e6b28ef7.jpg",
  "https://cdn.dribbble.com/users/3281732/screenshots/10940512/media/b2a8ea95c550e5f09d0ca07682a3c0da.jpg",
  "https://cdn.dribbble.com/users/3281732/screenshots/8616916/media/a7e39b15640f8883212421d134013e38.jpg",
];

const imgWidth = width * 0.7;
const imgHeight = imgWidth * 1.54;

export default function App() {
  const ScrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <TextArray ScrollX={ScrollX} />
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Animated.View style={StyleSheet.absoluteFillObject}>
          {data.map((img, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const opacity = ScrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });

            return <Animated.Image key={`image-${index}`} source={{ uri: img }} style={[StyleSheet.absoluteFillObject, { opacity }]} blurRadius={50} />;
          })}
        </Animated.View>
        <Animated.FlatList
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: ScrollX } } }], { useNativeDriver: true })}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.imgContain}>
                <Image source={{ uri: item }} style={styles.img} />
              </View>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  imgContain: {
    alignItems: "center",
    justifyContent: "center",
    width,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  img: {
    width: imgWidth,
    height: imgHeight,
    resizeMode: "cover",
    borderRadius: 12,
  },
});

import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  ImageBackground,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import moment from "moment-timezone";

const openWheatherKey = "fbb91821e24ca66454240eef4c703e18";
const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely,hourly,alerts&appid=${openWheatherKey}`;
const image = {
  uri: "https://images.hdqwalls.com/download/sunset-at-san-juan-de-chicua-5k-nl-800x1280.jpg",
};

const Weather = () => {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
//   const [image, setImage]= useState();

  const loadForecast = async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }
    //get the current location
    const location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    //fetches the weather data from the openweathermap api
    const response = await fetch(
      `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    );
    const data = await response.json();
    if (!response.ok) {
      Alert.alert("Error", "Somthing went wrong");
    } else {
      setForecast(data);
    }
    setRefreshing(false);
  };
  //useEffect
  useEffect(() => {
    loadForecast();
  }, []);
  if (!forecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const current = forecast.current.weather[0];
  //if current coulds
  if (current.description === "Clouds") {
    image = {
      uri: "https://images.hdqwalls.com/download/clouds-4k-5k-8k-4k-5k-8k-1920x1080.jpg",
    };
  }
  //if current is clear
  if (current.description === "Clear") {
    image = {
      uri: "https://images.hdqwalls.com/download/sunset-at-san-juan-de-chicua-5k-nl-800x1280.jpg",
    };
  }
  //if current is rain
  if (current.description === "Rain") {
    image = {
      uri: "https://images.hdqwalls.com/download/rainy-day-5k-4k-8k-5k-8k-1920x1080.jpg",
    };
  }
  //if current is snow
  if (current.description === "Snow") {
    image = {
      uri: "https://images.hdqwalls.com/download/snowy-mountains-5k-4k-8k-5k-8k-1920x1080.jpg",
    };
  }
  //if current is thunderstorm
  if (current.description === "Thunderstorm") {
    image = {
      uri: "https://images.hdqwalls.com/download/thunderstorm-5k-4k-8k-5k-8k-1920x1080.jpg",
    };
  }
  //if current is drizzle
  if (current.description === "Drizzle") {
    image = {
      uri: "https://images.hdqwalls.com/download/rainy-day-5k-4k-8k-5k-8k-1920x1080.jpg",
    };
  }
  //if current is mist
  if (current.description === "Mist") {
    image = {
      uri: "https://images.hdqwalls.com/download/mist-5k-4k-8k-5k-8k-1920x1080.jpg",
    };
  }
  //if current is smoke
  if (current.description === "Smoke") {
    image = {
      uri: "https://images.hdqwalls.com/download/smoke-5k-4k-8k-5k-8k-1920x1080.jpg",
    };
  }
  //if current is haze
  if (current.description === "Haze") {
    image = {
      uri: "https://images.hdqwalls.com/download/haze-5k-4k-8k-5k-8k-1920x1080.jpg",
    };
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={image}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadForecast()}
            />
          }
          style={{ margin: 20, marginTop: 60 }}
        >
          <Text style={styles.title}>{forecast.timezone.split("/")[1]}</Text>
          <Text
            style={{ alignItems: "center", textAlign: "center", color: "#fff" }}
          >
            {moment(forecast.daily[0].dt * 1000).format("DD/MM/YY")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <Text style={{ fontSize: 150, textAlign: "center", color: "#fff" }}>
              {Math.round(forecast.current.temp)}
            </Text>
            <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
              °C
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={{
                uri: `http://openweathermap.org/img/wn/${forecast.current.weather[0].icon}.png`,
              }}
            />
            <Text style={{ fontSize: 12, textAlign: "center", color: "#000" }}>
              {current.description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {/* <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/temp.png")}
              />
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {forecast.current.feels_like}°C
              </Text>
            </View> */}
            {/* <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/humidity.png")}
              />
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {forecast.current.humidity}%
              </Text>
            </View> */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 20,
                // backgroundColor: "#B0E0E6",
                padding: 10,
                justifyContent: "center",
                // color: "#fff"
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/wind.png")}
              />
              <Text
                style={{ fontSize: 10, fontWeight: "bold", marginLeft: 10 }}
              >
                {forecast.current.wind_speed}m/s
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/pressure.png")}
              />
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {forecast.current.pressure}hPa
              </Text>
            </View> */}
            {/* <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/visibility.png")}
              />
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {forecast.current.visibility}m
              </Text>
            </View> */}
            {/* <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/clouds.png")}
              />
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                {forecast.current.clouds}%
              </Text>
            </View> */}
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {Math.round(forecast.daily[0].temp.max)}°C
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {Math.round(forecast.daily[0].temp.min)}°C
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {Math.round(forecast.daily[1].temp.max)}°C
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {Math.round(forecast.daily[1].temp.min)}°C
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {Math.round(forecast.daily[2].temp.max)}°C
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {Math.round(forecast.daily[2].temp.min)}°C
              </Text>
            </View>
          </View> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={{
                  uri: `http://openweathermap.org/img/wn/${forecast.current.weather[0].icon}.png`,
                }}
              />
              <Text
                style={{ fontSize: 20, textAlign: "center", color: "#fff" }}
              >
                Today
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 20, color: "#fff" }}>
                {Math.round(forecast.daily[0].temp.max)}°C /{" "}
                {Math.round(forecast.daily[0].temp.min)}°C
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // alignContent: "center",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={{
                  uri: `http://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}.png`,
                }}
              />
              <Text
                style={{ fontSize: 20, textAlign: "center", color: "#fff" }}
              >
                {/* {new Date(forecast.daily[1].dt * 1000).toDateString()} */}
                Tomorrow
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                // alignContent: "center",
                // justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: "#fff" }}>
                {Math.round(forecast.daily[1].temp.max)}°C /{" "}
                {Math.round(forecast.daily[1].temp.min)}°C
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={{
                  uri: `http://openweathermap.org/img/wn/${forecast.daily[2].weather[0].icon}.png`,
                }}
              />
              <Text
                style={{ fontSize: 20, textAlign: "center", color: "#fff" }}
              >
                {moment(forecast.daily[2].dt * 1000).format("dddd")}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 20, color: "#fff" }}>
                {Math.round(forecast.daily[2].temp.max)}°C /{" "}
                {Math.round(forecast.daily[2].temp.min)}°C
              </Text>
            </View>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={{
                  uri: `http://openweathermap.org/img/wn/${forecast.daily[3].weather[0].icon}.png`,
                }}
              />
              <Text
                style={{ fontSize: 20, textAlign: "center", color: "#fff" }}
              >
                {new Date(forecast.daily[3].dt * 1000).toDateString()}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 20, color: "#fff" }}>
                {Math.round(forecast.daily[3].temp.max)}°C /{" "}
                {Math.round(forecast.daily[3].temp.min)}°C
              </Text>
            </View>
          </View> */}
          <View
            style={{
              // flexDirection: "row",
              justifyContent: "center",
              // alignItems: "center",
              marginTop: 20,
            }}
          >
            {/* <NavigationContainer> */}
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("days")}
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: "#fff",
                  alignItems: "center",
                }}
              >
                5-day forecast
              </Text>
            </Pressable>
            {/* </NavigationContainer> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    // fontWeight: "bold",
    color: "#fff",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "rgb(0, 0, 0,0.5)",
  },
  // buttonText: {
  // fontSize: 20,
  // lineHeight: 21,
  // fontWeight: 'normal',
  // letterSpacing: 0.25,
  // color: 'white',
  // },
});

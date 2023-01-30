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
  Dimensions,
  FlatList,
  LineChart,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import moment from "moment-timezone";
import {
  haze,
  rainy,
  snowy,
  sunny,
  cloudy,
  mist,
  thunderstorm,
  drizzle,
  fog,
  smoke,
  dust,
  sand,
  tornado,
} from "../assets/background";
import SearchBar from "../components/SearchBar";

const openWheatherKey = "fbb91821e24ca66454240eef4c703e18";
// const API =
//   "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

let url = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWheatherKey}`;
// let uuu = `http://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;

// let uri = `https://bulk.openweathermap.org/snapshot/{weather_16_mmddyy_hhmm.json.gz}?appid={fbb91821e24ca66454240eef4c703e18}`;
const Weather = () => {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);

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

  useEffect(() => {
    setBackgroundImage(getBackgroundImg(forecast?.current.weather[0].main));
    loadForecast();
  }, []);
  if (!forecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    );
  }

  const current = forecast.current.weather[0];
  function getBackgroundImg(weather) {
    if (weather === "Snow") return snowy;
    if (weather === "Clear") return sunny;
    if (weather === "Rain") return drizzle;
    if (weather === "Haze") return haze;
    if (weather === "Clouds") return cloudy;
    if (weather === "Mist") return mist;
    if (weather === "Thunderstorm") return thunderstorm;
    if (weather === "Drizzle") return drizzle;
    if (weather === "Fog") return fog;
    if (weather === "Smoke") return smoke;
    if (weather === "Dust") return dust;
    if (weather === "Sand") return sand;
    if (weather === "Tornado") return tornado;
  }


  let textColor = backgroundImage !== snowy ? "white" : "black";
  // let dayneight = backgroundImage !== day 
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImg}
        resizeMode="cover"
      >
        <View style={styles.header}>
          {/* <SearchBar fetchWeatherData={fetchWeatherData} /> */}
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadForecast()}
            />
          }
          style={{ margin: 20, marginTop: 50 }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: textColor,
            }}
          >
            {forecast.timezone.split("/")[1]}
          </Text>
          <Text
            style={{
              alignItems: "center",
              textAlign: "center",
              color: textColor,
            }}
          >
            {moment(forecast.daily[0].dt * 1000).format("DD/MM")}
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
            <Text
              style={{ fontSize: 150, textAlign: "center", color: textColor }}
            >
              {Math.round(forecast.current.temp)}
            </Text>
            <Text
              style={{ fontSize: 20, textAlign: "center", color: textColor }}
            >
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
            <Text
              style={{ fontSize: 12, textAlign: "center", color: textColor }}
            >
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
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  marginLeft: 10,
                  color: textColor,
                }}
              >
                {forecast.current.wind_speed}m/s
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
                  uri: `http://openweathermap.org/img/wn/${forecast.current.weather[0].icon}.png`,
                }}
              />
              <Text
                style={{ fontSize: 20, textAlign: "center", color: textColor }}
              >
                Today
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 20, color: textColor }}>
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
                style={{ fontSize: 20, textAlign: "center", color: textColor }}
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
              <Text style={{ fontSize: 20, color: textColor }}>
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
                style={{ fontSize: 20, textAlign: "center", color: textColor }}
              >
                {moment(forecast.daily[2].dt * 1000).format("dddd")}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 20, color: textColor }}>
                {Math.round(forecast.daily[2].temp.max)}°C /{" "}
                {Math.round(forecast.daily[2].temp.min)}°C
              </Text>
            </View>
          </View>

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
                  color: textColor,
                  alignItems: "center",
                }}
              >
                5-day forecast
              </Text>
            </Pressable>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            ></View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 20, color: textColor }}>
              Hourly forecast
            </Text>
          </View>

        
          <FlatList
            horizontal
            data={forecast.hourly.slice(0, 24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hour) => {
              const weather = hour.item.weather[0];
              var dt = new Date(hour.item.dt * 1000);
              var time = dt.getHours() + ":" + dt.getMinutes();
              return (
                <View
                  style={styles.hour}
                  >
           <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: textColor,
                alignItems: "center",
              }}
           >
              {dt.toLocaleTimeString().replace(/:\d+/,' ')}
            </Text> 
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: textColor,
                alignItems: "center",
              }}
            >
              {Math.round(hour.item.temp)}°C
            </Text>
            <Image
              style={styles.smallIcon}
              source={{
                uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: textColor,
                alignItems: "center",
              }}
            >
              {weather.description}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: textColor,
                alignItems: "center",
              }}
            >
              {hour.item.pop}%
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: textColor,
                alignItems: "center",
              }}
            >
              {hour.item.humidity}%
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: textColor,
                alignItems: "center",
              }}
            >
              {hour.item.wind_speed}m/s
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: textColor,
                alignItems: "center",
              }}
            >
              {hour.item.clouds}%
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: textColor,
                alignItems: "center",
              }}
            >
              {hour.item.pressure}hPa
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: textColor,
                alignItems: "center",
              }}
            >
              {hour.item.dew_point}°C
            </Text>
<Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: textColor,
                alignItems: "center",
              }}
            >
              {hour.item.uvi}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: textColor,
                alignItems: "center",
              }}
            >
              {hour.item.visibility}m
            </Text>
            
            </View>
          );
        }}
          />
        
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
  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
  hour: {
    padding:6,
    alignItems: 'center',
  },
  smallIcon: {
    width: 100,
    height: 100,
  },
});

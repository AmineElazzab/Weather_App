import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment-timezone";

const openWheatherKey = "fbb91821e24ca66454240eef4c703e18";
let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely,hourly,alerts&appid=${openWheatherKey}`;

const days = () => {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getForecast = async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    const response = await fetch(`${url}&lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    setForecast(data);
    setRefreshing(false);
  };

  useEffect(() => {
    getForecast();
  }, []);

  if (!forecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  // const current = forecast.current;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getForecast} />
        }
        style={{ margin: 20, marginTop: 100 }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            marginTop: 20,
            fontStyle: "italic",
            marginBottom: 20,
          }}
        >
          <AntDesign name="arrowleft" size={24} color="white" /> 5-day forecast
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            marginTop: 60,
          }}
        >
          <View>
            <Text style={{ fontSize: 15, textAlign: "center", color: "#fff" }}>
              {moment(forecast.daily[2].dt * 1000).format("ddd")}
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "#C0C0C0",
                // marginTop: 10,
              }}
            >
              {moment(forecast.daily[2].dt * 1000).format("DD/MM")}
            </Text>
            <Image
              style={{ width: 30, height: 30, alignSelf: "center", marginTop:20 }}
              source={{
                uri: `http://openweathermap.org/img/wn/${forecast.daily[2].weather[0].icon}.png`,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "#fff",
                marginTop: 20,
                marginBottom:30,
              }}
            >
              {Math.round(forecast.daily[2].temp.max)}°
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "#fff",
                marginTop: 60,
              }}
            >
              {Math.round(forecast.daily[2].temp.min)}°
            </Text>
            <Text
                style={{ fontSize: 10, fontWeight: "bold", marginTop:20 , color:"#fff"}}
              >
                {forecast.daily[2].wind_speed}m/s
              </Text>
          </View>
          <View>
            <Text style={{ fontSize: 15, textAlign: "center", color: "#fff" }}>
              {moment(forecast.daily[3].dt * 1000).format("ddd")}
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "#C0C0C0",
                // marginTop: 10,
              }}
            >
              {moment(forecast.daily[3].dt * 1000).format("DD/MM")}
            </Text>
            <Image
              style={{ width: 30, height: 30, alignSelf: "center", marginTop:20 }}
              source={{
                uri: `http://openweathermap.org/img/wn/${forecast.daily[3].weather[0].icon}.png`,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "#fff",
                marginTop: 20,
                marginBottom:30,
              }}
            >
              {Math.round(forecast.daily[3].temp.max)}°
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "#fff",
                marginTop: 60,
              }}
            >
              {Math.round(forecast.daily[3].temp.min)}°
            </Text>
            <Text
                style={{ fontSize: 10, fontWeight: "bold", marginTop:20 , color:"#fff"}}
              >
                {forecast.daily[3].wind_speed}m/s
              </Text>
          </View>
          <View>
            <Text style={{ fontSize: 15, textAlign: "center", color: "#fff" }}>
              {moment(forecast.daily[4].dt * 1000).format("ddd")}
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "#C0C0C0",
                // marginTop: 10,
              }}
            >
              {moment(forecast.daily[4].dt * 1000).format("DD/MM")}
            </Text>
            <Image
              style={{ width: 30, height: 30, alignSelf: "center", marginTop:20 }}
              source={{
                uri: `http://openweathermap.org/img/wn/${forecast.daily[4].weather[0].icon}.png`,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "#fff",
                marginTop: 20,
                marginBottom:30,
              }}
            >
              {Math.round(forecast.daily[4].temp.max)}°
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "#fff",
                marginTop: 60,
              }}
            >
              {Math.round(forecast.daily[4].temp.min)}°
            </Text>
            <Text
                style={{ fontSize: 10, fontWeight: "bold", marginTop:20 , color:"#fff"}}
              >
                {forecast.daily[4].wind_speed}m/s
              </Text>
          </View>
          <View>
            <Text style={{ fontSize: 15, textAlign: "center", color: "#fff" }}>
              {moment(forecast.daily[5].dt * 1000).format("ddd")}
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "#C0C0C0",
                // marginTop: 10,
              }}
            >
              {moment(forecast.daily[5].dt * 1000).format("DD/MM")}
            </Text>
            <Image
              style={{ width: 30, height: 30, alignSelf: "center", marginTop:20 }}
              source={{
                uri: `http://openweathermap.org/img/wn/${forecast.daily[2].weather[0].icon}.png`,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "#fff",
                marginTop: 20,
                marginBottom:30,
              }}
            >
              {Math.round(forecast.daily[5].temp.max)}°
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "#fff",
                marginTop: 60,
              }}
            >
              {Math.round(forecast.daily[5].temp.min)}°
            </Text>
            <Text
                style={{ fontSize: 10, fontWeight: "bold", marginTop:20 , color:"#fff"}}
              >
                {forecast.daily[5].wind_speed}m/s
              </Text>
          </View>
          <View>
            <Text style={{ fontSize: 15, textAlign: "center", color: "#fff" }}>
              {moment(forecast.daily[6].dt * 1000).format("ddd")}
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "#C0C0C0",
                // marginTop: 10,
              }}
            >
              {moment(forecast.daily[6].dt * 1000).format("DD/MM")}
            </Text>
            <Image
              style={{ width: 30, height: 30, alignSelf: "center", marginTop:20 }}
              source={{
                uri: `http://openweathermap.org/img/wn/${forecast.daily[2].weather[0].icon}.png`,
              }}
            />
           
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "#fff",
                marginTop: 20,
                marginBottom:30,
              }}
            >
              {Math.round(forecast.daily[6].temp.max)}°
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "#fff",
                marginTop: 60,
              }}
            >
              {Math.round(forecast.daily[6].temp.min)}°
            </Text>
            <Text
                style={{ fontSize: 10, fontWeight: "bold", marginTop:20 , color:"#fff"}}
              >
                {forecast.daily[6].wind_speed}m/s
              </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default days;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

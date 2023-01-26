import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View ,
    Text, Image, StyleSheet, RefreshControl, } from 'react-native'
import moment from 'moment-timezone'

    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

function weather() {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getForecast} />
        }
        style={{ margin: 20, marginTop: 100 }}
      >
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
         </ScrollView>
          </SafeAreaView>
  )
}

export default weather

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

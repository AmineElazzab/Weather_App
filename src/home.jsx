import { View, Text, Alert, SafeAreaView, Image, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

const openWheatherKey = 'fbb91821e24ca66454240eef4c703e18'

let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely,hourly,alerts&appid=${openWheatherKey}`;

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadForecast = async () => {
        setRefreshing(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        // if (status === 'granted') {
        //     const location = await Location.getCurrentPositionAsync();
        //     const { latitude, longitude } = location.coords;
        //     const response = await fetch(`${url}&lat=${latitude}&lon=${longitude}`);
        //     const data = await response.json();
        //     seForecast(data);
        // } else {
        //     Alert.alert('Permission to access location was denied');
        // }
        // setRefreshing(false);
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
        }
        //get the current location
        const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        //fetches the weather data from the openweathermap api
        const response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
        const data = await response.json();
        if (!response.ok) {
            Alert.alert('Error', 'Somthing went wrong');
        } else {
            setForecast(data);
        }
        setRefreshing(false);
    }
    //useEffect
    useEffect(() => {
        loadForecast();
    }, []);
    if (!forecast) {
        return (
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator size='large' />
            </SafeAreaView>
        );
    }
    const current = forecast.current.weather[0];


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing}
                        onRefresh={() => loadForecast()} />
                }
                style={{ margin: 50 }}
            >
                <Text style={styles.title}>
                    Weather
                </Text>
                <Text style={{ alignItems: 'center', textAlign: 'center' }}>
                    Your Location
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        style={{ width: 200, height: 150, }}
                        source={{ uri: `http://openweathermap.org/img/wn/${forecast.current.weather[0].icon}.png` }}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                        {Math.round(forecast.current.temp)}°C
                    </Text>
                </View>
                <Text
                    style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
                >
                    {current.description}

                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{ width: 30, height: 30, }}
                            source={require('../assets/temp.png')}
                        />
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                            {forecast.current.feels_like}°C
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{ width: 30, height: 30, }}
                            source={require('../assets/humidity.png')}
                        />
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                            {forecast.current.humidity}%
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{ width: 30, height: 30, }}
                            source={require('../assets/wind.png')}
                        />
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                            {forecast.current.wind_speed}m/s
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{ width: 30, height: 30, }}
                            source={require('../assets/pressure.png')}
                        />
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                            {forecast.current.pressure}hPa
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{ width: 30, height: 30, }}
                            source={require('../assets/visibility.png')}
                        />
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                            {forecast.current.visibility}m
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{ width: 30, height: 30, }}
                            source={require('../assets/clouds.png')}
                        />
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                            {forecast.current.clouds}%
                        </Text>
                        </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Math.round(forecast.daily[0].temp.max)}°C
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Math.round(forecast.daily[0].temp.min)}°C
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Math.round(forecast.daily[1].temp.max)}°C
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Math.round(forecast.daily[1].temp.min)}°C
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Math.round(forecast.daily[2].temp.max)}°C
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Math.round(forecast.daily[2].temp.min)}°C
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Weather

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
    },
})

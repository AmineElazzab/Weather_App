// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Weather from './src/home';
import Days from './src/days';
import Login from './src/login';
import Register from './src/register';





export default function App() {

  return (
    <View style={styles.container}>
      <Weather />
      {/* <Days /> */}
      {/* <Login /> */}
      {/* <Register /> */}
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});

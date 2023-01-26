// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
// import Weather from './src/home';
import Days from './src/days';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Weather /> */}
      <Days />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});

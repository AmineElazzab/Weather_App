// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Weather from './src/home';

export default function App() {
  return (
    <View style={styles.container}>
      <Weather />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});

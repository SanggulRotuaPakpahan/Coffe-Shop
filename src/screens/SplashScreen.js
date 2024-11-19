import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/85/23/cb/8523cb8b6e9e23fb0a7a473d1576cfb0.jpg' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Coffee so good, your taste buds will love it</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Main')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backgroundImage: { width: '100%', height: '100%', position: 'absolute', resizeMode: 'cover' },
  overlay: {
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: { fontSize: 24, color: '#fff', textAlign: 'center', marginBottom: 20 },
  button: { backgroundColor: '#4b3b2d', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default SplashScreen;

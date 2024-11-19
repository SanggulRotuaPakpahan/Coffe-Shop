import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ProductDetail = ({ route }) => {
  const { coffee } = route.params; // Mendapatkan data produk yang diteruskan

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: coffee.image }} style={styles.image} />
      <Text style={styles.title}>{coffee.title}</Text>
      <Text style={styles.description}>{coffee.description}</Text>
      <Text style={styles.price}>Rp 20,000</Text> {/* Sesuaikan harga jika diperlukan */}
      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      <View style={styles.ingredientsContainer}>
        {coffee.ingredients?.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>{ingredient}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: '100%', height: 250, borderRadius: 10, resizeMode: 'cover' },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  description: { fontSize: 16, color: '#555' },
  price: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  ingredientsTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  ingredientsContainer: { marginLeft: 16 },
  ingredient: { fontSize: 16, color: '#555' },
});

export default ProductDetail;

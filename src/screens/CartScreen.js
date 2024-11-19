import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  const { cart, setCart } = useContext(AppContext);

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const changeQuantity = (itemId, change) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(item => item));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    let summary = cart.map((item) => {
      return `${item.title} x${item.quantity} - Rp ${item.price * item.quantity}`;
    }).join('\n');

    const totalPrice = calculateTotal();

    Alert.alert('Checkout Details', `${summary}\nTotal: Rp ${totalPrice}`, [
      { text: 'OK' },
    ]);
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>Rp {item.price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => changeQuantity(item.id, -1)}
                >
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => changeQuantity(item.id, 1)}
                >
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
              <Ionicons name="trash" size={24} color="#FF6347" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.checkoutContainer}>
        <Text style={styles.totalText}>Total: Rp {calculateTotal()}</Text>
        <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#4b3b2d' },
  listContainer: { paddingTop: 30, paddingHorizontal: 10 },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
  details: { flex: 1, marginLeft: 10 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#4b3b2d' },
  price: { fontSize: 16, color: '#4b3b2d', marginBottom: 5 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  quantityButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#4b3b2d', borderRadius: 5 },
  quantityText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  quantity: { fontSize: 16, marginHorizontal: 10, color: '#4b3b2d' },
  removeButton: { marginLeft: 10, padding: 5 },
  checkoutContainer: { padding: 15, alignItems: 'center' },
  checkoutButton: {
    backgroundColor: '#4b3b2d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#4b3b2d', marginBottom: 15 },
});

export default CartScreen;

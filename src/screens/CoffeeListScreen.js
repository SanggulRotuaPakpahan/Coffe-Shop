import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { AppContext } from '../context/AppContext'; // Context untuk favorites dan cart

const CoffeeListScreen = ({ navigation }) => {
  const { favorites, setFavorites, cart, setCart } = useContext(AppContext); // Destructuring cart and setCart
  const [coffees, setCoffees] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);

  // Memuat data kopi berdasarkan kategori
  useEffect(() => {
    const loadCoffees = async () => {
      try {
        const response = await fetch(
          selectedCategory === 'All'
            ? 'https://api.sampleapis.com/coffee/hot'
            : `https://api.sampleapis.com/coffee/${selectedCategory.toLowerCase()}`
        );
        const data = await response.json();
        setCoffees(data);
      } catch (error) {
        console.error('Error fetching coffee data:', error);
      }
    };
    loadCoffees();
  }, [selectedCategory]);

  const toggleFavorite = (coffee) => {
    if (favorites.some((fav) => fav.id === coffee.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== coffee.id));
    } else {
      setFavorites([...favorites, coffee]);
    }
  };

  const openModal = (coffee) => {
    setSelectedCoffee(coffee);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCoffee(null);
  };

  const addToCart = () => {
    const existingCartItem = cart.find((item) => item.id === selectedCoffee.id);
    
    if (existingCartItem) {
      // Update quantity if the item already exists in the cart
      const updatedCart = cart.map((item) =>
        item.id === selectedCoffee.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Add a new item to the cart with quantity 1
      const cartItem = { ...selectedCoffee, quantity: 1, price: 20000 }; // Hardcode price here
      setCart([...cart, cartItem]);
    }

    closeModal(); // Close the modal after adding to cart
    alert(`${selectedCoffee.title} added to your cart!`); // Optionally show a confirmation alert
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Explore Coffee Options</Text>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/cd/29/31/cd2931eb633fb0ffa10e5ff439bc544b.jpg' }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Daftar Kategori */}
      <FlatList
        data={['All', 'hot', 'iced']}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.category, selectedCategory === item && styles.selectedCategory]}
            onPress={() => setSelectedCategory(item)}>
            <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Daftar Kopi */}
      <FlatList
        data={coffees}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>Rp 20,000</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => toggleFavorite(item)} activeOpacity={0.8}>
                <Text style={styles.favorite}>
                  {favorites.some((fav) => fav.id === item.id) ? '❤' : '🤍'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openModal(item)}
                style={styles.detailsButton}
                activeOpacity={0.8}>
                <Text style={styles.details}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal untuk Menampilkan Detail Kopi */}
      {selectedCoffee && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
                  <Text style={styles.closeIconText}>×</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{selectedCoffee.title}</Text>
                <Image source={{ uri: selectedCoffee.image }} style={styles.modalImage} />
                <Text style={styles.modalDescription}>{selectedCoffee.description}</Text>
                
                {/* Product name, price, and centered "Details" button */}
                <Text style={styles.productName}>{selectedCoffee.title}</Text>
                <Text style={styles.productPrice}>Rp 20,000</Text>

                {/* Add to Cart Button */}
                <TouchableOpacity
                  onPress={addToCart}
                  style={styles.addToCartButton}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f9f4f1' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingTop: 25 },
  greeting: { fontSize: 20, fontWeight: 'bold', color: '#4b3b2d' },
  profileIcon: { width: 60, height: 60, borderRadius: 40 },
  category: { 
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderRadius: 30,
    marginRight: 10, 
    justifyContent: 'center', 
    alignItems: 'center',     
    backgroundColor: '#f1c6a7',
    marginBottom: 15, 
  },
  selectedCategory: { backgroundColor: '#4b3b2d' },
  selectedCategoryText: { color: '#fff' },
  categoryText: { color: '#4b3b2d', fontWeight: 'bold', textAlign: 'center' },
  item: { 
    flex: 1, 
    padding: 10, 
    margin: 5, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    elevation: 10, 
    marginTop: 10, 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  columnWrapper: { justifyContent: 'space-between', paddingHorizontal: 5 },
  image: { width: '100%', height: 100, borderRadius: 10, resizeMode: 'cover' },
  title: { fontSize: 16, fontWeight: 'bold', marginVertical: 5, textAlign: 'center' },
  price: { fontSize: 14, color: '#4b3b2d', textAlign: 'center', fontWeight: 'bold' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  favorite: { fontSize: 18 },
  detailsButton: { backgroundColor: '#f1c6a7', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center' },
  details: { color: '#4b3b2d', fontWeight: 'bold' },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  closeIcon: { 
    position: 'absolute', 
    top: 10, 
    right: 10, 
    padding: 10, 
    borderRadius: 20, 
    backgroundColor: '#f1c6a7', 
  },
  closeIconText: { fontSize: 30, fontWeight: 'bold', color: '#4b3b2d' },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  modalImage: { width: 200, height: 200, borderRadius: 10, marginBottom: 10 },
  modalDescription: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  productName: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  productPrice: { fontSize: 18, fontWeight: 'bold', color: '#4b3b2d', marginBottom: 20 },
  addToCartButton: { 
    backgroundColor: '#4b3b2d', 
    borderRadius: 30, 
    paddingVertical: 10, 
    paddingHorizontal: 25, 
    marginTop: 10, 
  },
  addToCartText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
});

export default CoffeeListScreen;

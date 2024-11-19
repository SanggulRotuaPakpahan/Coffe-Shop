import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { AppContext } from '../context/AppContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (item) => {
    setSelectedProduct(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have no favorites yet.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={favorites}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title || "No Title"}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedProduct && (
              <>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
                <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedProduct?.title || "No Title Available"}</Text>
                <Text style={styles.modalDescription}>{selectedProduct?.description || "No description available"}</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#4b3b2d' },
  listContainer: { paddingTop: 30, paddingHorizontal: 10 },
  item: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 3,
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  textContainer: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#4b3b2d' },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b3b2d',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  modalDescription: { fontSize: 16, color: '#4b3b2d', marginBottom: 20 },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: { fontSize: 30, color: '#4b3b2d' },
  goBackButton: {
    marginTop: 20,
    backgroundColor: '#4b3b2d',
    padding: 10,
    borderRadius: 5,
  },
  goBackText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FavoritesScreen;

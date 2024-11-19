import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header with greeting and profile icon */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome to Coffee Shop</Text>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/cd/29/31/cd2931eb633fb0ffa10e5ff439bc544b.jpg' }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable area for coffee articles */}
      <ScrollView style={styles.articlesContainer}>
        <Text style={styles.articlesTitle}>☕ Discover the Amazing Benefits of Coffee! ☕</Text>

        {/* Article Card 1 */}
        <View style={styles.articleCard}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/94/68/8f/94688ff025dca9827437a466e3107c1a.jpg' }}
            style={styles.articleImage}
          />
          <View style={styles.articleContent}>
            <Text style={styles.articleTitle}>Coffee Helps Boost Energy</Text>
            <Text style={styles.articleDescription}>
              Coffee is rich in caffeine, a stimulant that can help improve focus and alertness, making it an ideal drink to jump-start your day!
            </Text>
          </View>
        </View>

        {/* Article Card 2 */}
        <View style={styles.articleCard}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/d1/c8/d9/d1c8d9819d951a399b4003120f63858f.jpg' }}
            style={styles.articleImage}
          />
          <View style={styles.articleContent}>
            <Text style={styles.articleTitle}>Coffee May Reduce Stress</Text>
            <Text style={styles.articleDescription}>
              Drinking coffee in moderation can help reduce stress levels and improve your mood, giving you a sense of calm and relaxation.
            </Text>
          </View>
        </View>

        {/* Article Card 3 */}
        <View style={styles.articleCard}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/62/03/26/620326e0c1060032490c9329c38c079f.jpg' }}
            style={styles.articleImage}
          />
          <View style={styles.articleContent}>
            <Text style={styles.articleTitle}>Coffee Boosts Metabolism</Text>
            <Text style={styles.articleDescription}>
              Coffee can stimulate your metabolism and help burn fat more effectively, making it a great addition to your morning routine!
            </Text>
          </View>
        </View>

        {/* New Article Card 4 */}
        <View style={styles.articleCard}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/95/a8/aa/95a8aa9c707f72fa24f67c3588a228f8.jpg' }}
            style={styles.articleImage}
          />
          <View style={styles.articleContent}>
            <Text style={styles.articleTitle}>Coffee Enhances Physical Performance</Text>
            <Text style={styles.articleDescription}>
              Drinking coffee can enhance physical performance by increasing adrenaline levels, helping you push yourself further in your workouts.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Button to navigate to Coffee List */}
      <TouchableOpacity
        style={styles.coffeeListButton}
        onPress={() => navigation.navigate('CoffeeList')}>
        <Text style={styles.coffeeListText}>Go to Coffee List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f9f4f1' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingTop: 25 },
  greeting: { fontSize: 20, fontWeight: 'bold', color: '#4b3b2d' },
  profileIcon: { width: 60, height: 60, borderRadius: 40 },
  coffeeListButton: { 
    marginTop: 20, 
    paddingVertical: 10, 
    backgroundColor: '#4b3b2d', 
    borderRadius: 20, 
    alignItems: 'center' 
  },
  coffeeListText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  articlesContainer: { marginTop: 20 },
  articlesTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#4b3b2d', 
    marginBottom: 15, 
    textAlign: 'center',
    fontFamily: 'Helvetica', // A more modern font style
  },
  articleCard: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    marginBottom: 25, 
    borderRadius: 10, 
    elevation: 5, 
    overflow: 'hidden',
    padding: 10,
  },
  articleImage: { 
    width: 120, 
    height: 120, 
    borderRadius: 10, 
    resizeMode: 'cover', 
    marginRight: 10 
  },
  articleContent: { 
    flex: 1, 
    justifyContent: 'flex-start' 
  },
  articleTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#4b3b2d' 
  },
  articleDescription: { 
    fontSize: 14, 
    color: '#777', 
    marginTop: 5 
  },
});

export default HomeScreen;

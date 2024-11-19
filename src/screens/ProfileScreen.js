import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const AboutPage = () => {
    const openGitHub = () => {
        Linking.openURL('https://github.com/SanggulRotuaPakpahan');
    };

    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: 'https://i.pinimg.com/736x/cd/29/31/cd2931eb633fb0ffa10e5ff439bc544b.jpg' }} 
                style={styles.logo} 
            />
            <Text style={styles.title}>Coffee Shop </Text>
            <Text style={styles.subtitle}>Your daily cup of warmth and happiness!</Text>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>About This App</Text>
                <Text style={styles.description}>
                    The Coffee Shop App is designed for coffee lovers to explore a variety of delicious hot beverages.
                    With this app, you can browse our menu, place an order. Whether you're in the mood for an espresso shot or a frothy cappuccino, our app brings you
                    closer to your perfect cup of coffee!
                </Text>
            </View>

            {/* Developer Information Section */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Developer Information</Text>

                <View style={styles.developerRow}>
                    <Image 
                        source={{ uri: 'https://github.com/SanggulRotuaPakpahan.png' }} 
                        style={styles.githubAvatar} 
                    />
                    <View style={styles.developerText}>
                        <Text style={styles.developer}>Created by:</Text>
                        <Text style={styles.name}>Sanggul Rotua Pakpahan</Text>
                    </View>
                </View>

                {/* Centered Button */}
                <View style={styles.githubLinkContainer}>
                    <TouchableOpacity onPress={openGitHub}>
                        <Text style={styles.githubLink}>Visit my GitHub</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.footer}>Thank you for choosing our app!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'white', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        paddingHorizontal: 20, 
        paddingTop: 30 
    },
    logo: { 
        width: 130, 
        height: 130, 
        marginBottom: 15,
        borderRadius: 10,  
    },
    title: { 
        color: '#4b3b2d', 
        fontSize: 28, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 8 
    },
    subtitle: { 
        color: '#4b3b2d', 
        fontSize: 18, 
        textAlign: 'center', 
        marginBottom: 30,
        fontStyle: 'italic', 
    },
    card: { 
        backgroundColor: '#f6e4d9', 
        width: '100%', 
        borderRadius: 10, 
        padding: 15, 
        marginBottom: 20, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 5 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 10, 
    },
    sectionTitle: { 
        color: '#4b3b2d', 
        fontSize: 22, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 8,
        letterSpacing: 0.5, 
    },
    description: { 
        color: '#4b3b2d', 
        fontSize: 16, 
        textAlign: 'flex-start', 
        lineHeight: 22 
    },
    developerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        justifyContent: 'flex-start', // Keeps the image left aligned
    },
    githubAvatar: {
        width: 80,  
        height: 80,
        borderRadius: 40,  
        marginRight: 15, // Adds some space between the image and text
    },
    developerText: {
        flexDirection: 'column',
    },
    developer: { 
        color: '#4b3b2d', 
        fontSize: 18, 
        fontWeight: 'bold', 
        textAlign: 'left', 
    },
    name: { 
        color: '#4b3b2d', 
        fontSize: 18, 
        textAlign: 'left', 
    },
    githubLinkContainer: {
        alignItems: 'center', // Centers the button horizontally
        marginTop: 10,
    },
    githubLink: { 
        color: 'white', 
        fontSize: 18, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        paddingVertical: 12,
        paddingHorizontal: 35,
        backgroundColor: '#4b3b2d', 
        borderRadius: 8,
    },
    footer: {
        color: '#4b3b2d', 
        fontSize: 14, 
        textAlign: 'center', 
        marginBottom: 0,
        fontStyle: 'italic',
        paddingBottom: 15,
    }
});

export default AboutPage;

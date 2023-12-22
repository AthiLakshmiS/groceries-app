import React, { useState, useEffect } from 'react';
import {useFonts} from 'expo-font';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, FlatList, TouchableOpacity, Pressable, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/ApiService';
// import {getMovies, addFavorite, removeFavorite} from '../redux/action';
import AppLoading from 'expo-app-loading';
import { useDispatch, useSelector } from "react-redux";
import * as Font from 'expo-font';
import { addToCart, removeFromCart, addToFavourites, removeFromFavourites } from "../store/CartReducer";

import {
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
  
const HomeScreen = () => {

    const navigation = useNavigation();
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);  
    const favorites = useSelector(state => state.cart.favourite);

    const addToFavourite = movie => dispatch(addToFavourites(movie));
    const removeFromFavorites = movie => dispatch(removeFromFavourites(movie));
    const handleAddFavorite = movie => {
        addToFavourite(movie);
        console.log('favourites', movie);
    };
    const handleRemoveFavorite = movie => {
        removeFromFavorites(movie);
        console.log('remove favourites', movie);
    };
    const exists = movie => {
        if (favorites.filter(item => item.id === movie.id).length > 0) {
          return true;
        }
        return false;
    };

    useEffect(() => {
        (async () => await Font.loadAsync({
            Manrope_500Medium: require("../../assets/font/manrope-semibold.otf"),
        }))();
    }, [])

    let [fontsLoaded] = useFonts({
        Manrope_200ExtraLight,
        Manrope_300Light,
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_800ExtraBold,
    });

    // Font.loadAsync({
    //     "manrope-medium": require("../../assets/font/manrope-semibold.otf"),
    // });

    useEffect(() => {
        fetchData();
    }, []);
  
    const fetchData = async () => {
        try {
            const result = await ApiService.get('/products'); // Replace with your API endpoint
            setData(result.products);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (text) => {
      setInputText(text);
    };
  
    const goToCart = () => {
        // Navigate to the "Cart" screen
        navigation.navigate('More');
    };

    const navigateDetails = () => {
        console.log('details.')
        navigation.navigate('Products');
    };
    const addItemToCart = (item) => {
        dispatch(addToCart(item));
        console.log(item);
    };
    const removeItemFromCart = (item) => {
        dispatch(removeFromCart(item));
        console.log(item);
    };

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <TouchableOpacity onPress={navigateDetails}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                    marginLeft: 8,
                    flexDirection: 'row',
                    padding: 0,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    width: 40,
                    }}
                    onPress={() =>
                        exists(item) ? handleRemoveFavorite(item) : handleAddFavorite(item)
                    }
                >
                    {exists(item) ? <Image source={require('../../assets/images/like.png')} style={styles.favourite} /> : <Image source={require('../../assets/images/unlike.png')} style={styles.favourite} />}
                </TouchableOpacity>
                {item.thumbnail && <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />}
                <View style={styles.productName}>
                    <View>
                        <Text style={styles.priceText}>${item.price}</Text>
                        <Text style={styles.brandText}>{item.brand}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.addCart} onPress={() => cart.some((value) => value.id == item.id) ? removeItemFromCart(item) : addItemToCart(item)}>
                            <View>
                                <Text style={styles.addIcon}>{cart.some((value) => value.id == item.id) ? '-' : '+'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    if (!fontsLoaded) {
        return <Text>Loafing ...</Text>;
    } else {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Text style={styles.textHeading}>Hey, Rahul</Text>
                    <TouchableOpacity onPress={goToCart}>
                        <Image source={require('../../assets/images/cart.png')} 
                        style={styles.cartStyles}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <Image source={require('../../assets/images/search.png')} 
                        style={styles.search}/>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleInputChange}
                        value={inputText}
                    ></TextInput>
                </View>
                <View  style={styles.location}>
                    <View>
                        <Text style={styles.optionHeading}>Delivery to</Text>
                        <Text style={styles.optionContent}>Green Way 3000, Sylhet</Text>
                    </View>
                    <View>
                        <Text style={styles.optionHeading}>Within</Text>
                        <Text style={styles.optionContent}>1 Hour</Text>
                    </View>
                </View>
            </View>
            <View>
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.contentContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.offerContainer}>
                        <View style={styles.offer1}>
                            <Image source={{uri: 'https://i.dummyjson.com/data/products/12/3.png'}} 
                            style={styles.offerImage}/>
                            <View>
                                <Text style={styles.offerText1}>Get</Text>
                                <Text style={styles.offerText2}>50%  OFF</Text>
                                <Text style={styles.offerText3}>On first 03 order</Text>
                            </View>
                        </View>
                        <View style={styles.offer2}>
                            <Image source={{uri: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg'}} 
                            style={styles.offerImage}/>
                            <View>
                                <Text style={styles.offerText1}>Get</Text>
                                <Text style={styles.offerText2}>50%  OFF</Text>
                                <Text style={styles.offerText3}>On first 03 order</Text>
                            </View>
                        </View>
                        <View style={styles.offer1}>
                            <Image source={{uri: 'https://i.dummyjson.com/data/products/10/2.jpg'}} 
                            style={styles.offerImage}/>
                            <View>
                                <Text style={styles.offerText1}>Get</Text>
                                <Text style={styles.offerText2}>50%  OFF</Text>
                                <Text style={styles.offerText3}>On first 03 order</Text>
                            </View>
                        </View>
                        <View style={styles.offer2}>
                            <Image source={{uri: 'https://i.dummyjson.com/data/products/12/3.png'}} 
                            style={styles.offerImage}/> 
                            <View>
                                <Text style={styles.offerText1}>Get</Text>
                                <Text style={styles.offerText2}>50%  OFF</Text>
                                <Text style={styles.offerText3}>On first 03 order</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.productList}>
                <Text style={styles.recommend}>Recommended</Text>
                <View>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()} // Assuming each item has a unique ID
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                        ItemSeparatorComponent={() => <View style={{ height: 25, width: 10 }} />}
                        contentContainerStyle={{ paddingRight: 10 }}
                    />
                </View>
            </View>
        </View>
    );
    }
};
// Styles for the landing page
const styles = StyleSheet.create({
    profile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 30,
        fontFamily: "Manrope_500Medium"
    },
    container: {
        paddingHorizontal: 20, 
        backgroundColor: '#2A4BA0',
        position: 'relative',
    },
    textHeading: {
        color: '#ffffff',
        fontSize: 20,
        fontFamily: "Manrope_500Medium",    
    },
    input: {
        backgroundColor: '#153075',
        borderRadius: 30,
        padding: 10,
        color: '#8891A5',
        paddingLeft: 48,
        fontSize: 13,
    },
    optionHeading: {
        color: '#F8F9FB',
        fontSize: 12,
        opacity: 0.5,   
    },
    optionContent: {
        color: '#F8F9FB',
    },
    location: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 30,
        paddingBottom: 30,    
    },
    cartStyles: {
        width: 18,
        height: 20,
    },
    search: {
        position: 'absolute',
        top: 16,
        left: 25,
        zIndex: 1,
        width: 15,
        height: 15,
    },
    offerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,  
        paddingLeft: 20,
        paddingRight: 20, 
        width: 600,
        overflow: 'scroll',
        backgroundColor: '#ffffff', 
    },
    offerImage: {
        width: 50,
        margin: 5,
        resizeMode: 'cover',
        marginRight: 25,
    },
    offer1: {
        backgroundColor: '#F9B023',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20, 
        borderRadius: 18, 
        marginRight: 25,
        paddingRight: 20,
    },
    offer2: {
        backgroundColor: '#E4DDCB',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20, 
        borderRadius: 18,
        marginRight: 25,
        paddingRight: 20,    
    },
    offerText1: {
        color: '#ffffff',
        marginBottom: 2,
        fontSize: 15,
    },
    offerText2: {
        color: '#ffffff',
        marginBottom: 2,
        fontSize: 15,
    },
    offerText3: {
        color: '#ffffff',
        marginBottom: 2,
        fontSize: 11,
    },
    thumbnail: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        margin: 36,
        marginBottom: 0,
        marginTop: 10,
    },
    productContainer: {
        backgroundColor: '#F8F9FB',
        borderRadius: 18,
        width: 160,
        marginRight: 24,
    },
    recommend: {
        color: '#000000',
        fontSize: 21,
        marginBottom: 20,
        marginTop: 10,
    },
    productList: {
        backgroundColor: '#ffffff',
        paddingLeft: 20,
    },
    priceText: {
        marginTop: 30,
        marginLeft: 20,
        fontSize: 14, 
        fontWeight: 'bold',
    },
    brandText: {
        marginLeft: 20, 
        marginBottom: 20, 
        fontSize: 12,  
    },
    addCart: {
        backgroundColor: '#2A4BA0',
        width: 25,
        height: 25,
        borderRadius: 50,
        marginTop: 0,
        paddingRight: 0,
        alignItems: 'center',
        textAlign: 'center',
    },
    addIcon: {
        color: '#ffffff',
        marginLeft: 0,
        marginTop: 0,
        marginBottom: 0,
        fontSize: 18,
        alignItems: 'center',
        textAlign: 'center',
    },
    productName: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20,
        // paddingBottom: 0,    
    },
    favourite: {
        width: 16,
        resizeMode: 'contain',
        height: 16,
        marginLeft: 0,
        marginTop: 16,
    }
});  

export default HomeScreen;

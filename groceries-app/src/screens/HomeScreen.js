import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, FlatList, TouchableOpacity, } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/ApiService';
// import {useSelector, useDispatch} from 'react-redux';
// import {getMovies, addFavorite, removeFavorite} from '../redux/action';

const HomeScreen = () => {

    // const navigation = useNavigation();
    // const dispatch = useDispatch();
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState(null);
    const [cart, setCart] = useState(false);
    const [like, setLike] = useState(false);
    // const {movies, favorites} = useSelector(state => state.moviesReducer);

    // const addToFavorites = movie => dispatch(addFavorite(movie));
    // const removeFromFavorites = movie => dispatch(removeFavorite(movie));
    const handleAddFavorite = movie => {
        // addToFavorites(movie);
    };
    const handleRemoveFavorite = movie => {
        // removeFromFavorites(movie);
    };
    const exists = movie => {
        // if (favorites.filter(item => item.id === movie.id).length > 0) {
        //   return true;
        // }
        return false;
    };

    Font.loadAsync({
        // "manrope-semibold": require("../assets/font/manrope-semibold.otf"),
        // "manrope-medium": require("../assets/font/manrope-medium.otf"),
    });

    useEffect(() => {
        fetchData();
    }, []);
  
    const fetchData = async () => {
        try {
            const result = await ApiService.get('/products'); // Replace with your API endpoint
            setData(result.products);
            // dispatch(getMovies(result.products));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (text) => {
      setInputText(text);
    };
  
    const goToCart = () => {
        // Navigate to the "Cart" screen
        // navigation.navigate('Cart');
    };

    const changeCart = () => {
        setCart(!cart)
    };

    const changeLike = () => {
        setLike(!like)
    };

    const navigateDetails = () => {
        console.log('details.')
        // navigation.navigate('Product');
    };

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  marginLeft: 14,
                  flexDirection: 'row',
                  padding: 2,
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
                {exists(item) ? <Image source={require('../../assets/images/like.png')} style={styles.favourite} /> : <Image source={require('../../assets/images/like.png')} style={styles.favourite} />}
            </TouchableOpacity>
            {item.thumbnail && <Image onPress={navigateDetails} source={{ uri: item.thumbnail }} style={styles.thumbnail} />}
            <View style={styles.productName}>
                <View>
                    <Text style={styles.priceText}>${item.price}</Text>
                    <Text style={styles.brandText}>{item.brand}</Text>
                </View>
                <View style={styles.addCart}>
                    <Text onPress={changeCart} style={styles.addIcon}>{cart ? '-' : '+'}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Text style={styles.textHeading}>Hey, Rahul</Text>
                    <TouchableOpacity onPress={goToCart}>
                        <Image source={require('../../assets/images/cart.png')} 
                        style={styles.cart}/>
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
};
// Styles for the landing page
const styles = StyleSheet.create({
    profile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
    },
    container: {
        paddingHorizontal: 20, 
        backgroundColor: '#2A4BA0',
        position: 'relative',
    },
    textHeading: {
        color: '#ffffff',
        fontSize: 20,
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
        paddingTop: 20,
        paddingBottom: 20,    
    },
    cart: {
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
        marginTop: 10,
        marginRight: 15,
    },
    addIcon: {
        color: '#ffffff',
        marginLeft: 7,
        marginTop: 0,
        marginBottom: 0,
        fontSize: 18,
    },
    productName: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingBottom: 0,    
    },
    favourite: {
        width: 16,
        resizeMode: 'contain',
        height: 16,
        marginLeft: 22,
        marginTop: 16,
    }
});  

export default HomeScreen;

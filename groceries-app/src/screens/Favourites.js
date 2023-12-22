import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, FlatList, TouchableOpacity, Pressable, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourites, removeFromFavourites, addToCart, removeFromCart, } from "../store/CartReducer";

const Favourites = ({route}) => {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const cartList = useSelector((state) => state.cart.cart);  
    const favorites = useSelector(state => state.cart.favourite);

    const addToFavourite = movie => dispatch(addToFavourites(movie));
    const removeFromFavorites = movie => dispatch(removeFromFavourites(movie));
    const handleAddFavorite = movie => {
        addToFavourite(movie);
    };
    const handleRemoveFavorite = movie => {
        removeFromFavorites(movie);
    };
    const exists = movie => {
        if (favorites.filter(item => item.id === movie.id).length > 0) {
          return true;
        }
        return false;
    };
    const navigateDetails = () => {
        console.log('details.')
    };
    const goBack = () => {
      navigation.navigate('Home');
    }
    const addItemToCart = (item) => {
        dispatch(addToCart(item));
    };
    const removeItemFromCart = (item) => {
        dispatch(removeFromCart(item));
    };

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
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
            {item.thumbnail && <Image onPress={navigateDetails} source={{ uri: item.thumbnail }} style={styles.thumbnail} />}
            <View style={styles.productName}>
                <View>
                    <Text style={styles.priceText}>${item.price}</Text>
                    <Text style={styles.brandText}>{item.brand}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.addCart} onPress={() => cartList.some((value) => value.id == item.id) ? removeItemFromCart(item) : addItemToCart(item)}>
                        <View>
                            <Text style={styles.addIcon}>{cartList.some((value) => value.id == item.id) ? '-' : '+'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    useEffect(() => {
        if (favorites && isFocused) {
            // console.log(favorites);
        }
    }, [favorites, isFocused]);
  
    return (
        <View style={styles.favouritesList}>
            <View style={styles.cartContainer}>
                <TouchableOpacity onPress={goBack}>
                    <View style={styles.buttonContainer}>
                        <Image source={require('../../assets/images/back.png')}  style={styles.backButton} />
                    </View>
                </TouchableOpacity>
                <View>
                    <Text style={styles.cartText}>Favourites</Text>
                </View>
            </View>
            {favorites && favorites.length == 0 ? <Text style={styles.emptyList}>No items added to favourites</Text> :
                <View>
                    <FlatList
                        data={favorites}
                        keyExtractor={(list) => list.id.toString()} // Assuming each item has a unique ID
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                        ItemSeparatorComponent={() => <View style={{ height: 25, width: 10 }} />}
                        contentContainerStyle={{ paddingRight: 10 }}
                    />
                </View>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    backButton: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
        marginTop: 10,
        marginLeft: 8,
    },
    buttonContainer: {
        backgroundColor: '#F8F9FB',
        borderRadius: 50,
        width: 28,
        height: 28,
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
    cartContainer: {
        // flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 40,
        paddingLeft: 20,
        gap: 24,
    },
    cartText: {
        fontSize: 16,
        alignItems: 'center',
    },
    favouritesList: {
        backgroundColor: "#ffffff",
        paddingTop: 50,
        paddingBottom: 50,
        height: '100%',
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
    },
    emptyList: {
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 150,
    },
})
export default Favourites;
 
import React, { useEffect, useState  } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourites, removeFromFavourites, addToCart, removeFromCart } from "../store/CartReducer";
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Carousel from 'react-native-reanimated-carousel';
import * as Font from 'expo-font';
import {useFonts} from 'expo-font';
import {
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';

const Products = ({route}) => {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const cartList = useSelector((state) => state.cart.cart);  
    const favorites = useSelector(state => state.cart.favourite);
    const [isFontLoaded, setFontLoaded] = useState(false);
    const width = Dimensions.get('window').width;

    const addToFavourite = item => dispatch(addToFavourites(item));
    const removeFromFavorites = item => dispatch(removeFromFavourites(item));
    const handleAddFavorite = item => {
        addToFavourite(item);
    };

    const handleRemoveFavorite = item => {
        removeFromFavorites(item);
    };

    const exists = item => {
        if (favorites.filter(item => item.id === item.id).length > 0) {
          return true;
        }
        return false;
    };

    const navigateDetails = () => {
        console.log('details.');
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

    if (!fontsLoaded) {
        return <Text>Loafing ...</Text>;
    } else {
    return (        
        <View style={styles.productList}>
            <View>
                <View style={styles.productHeader}>
                    <TouchableOpacity onPress={goBack}>
                        <View style={styles.buttonContainer}>
                            <Image source={require('../../assets/images/back.png')}  style={styles.backButton} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goBack}>
                        <View>
                            <Image source={require('../../assets/images/bag.png')}  style={styles.bagButton} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.brandName}>Thin Choice</Text>
                <Text style={styles.categoryName}>Top Orange</Text>
            </View>
            <View>
                <Text style={styles.reviewContainer}>
                    <Stars
                        rating={1.5}
                        count={5}
                        half={true}
                        fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
                        emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
                        halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
                    />
                    <Text style={styles.reviewText}>110 Reviews</Text>
                </Text>
            </View>
            <View>
                <Image source={{uri: 'https://i.dummyjson.com/data/products/12/3.png'}} 
                style={styles.offerImage}/>         
            </View>
            <View>
                <Text>
                    <View style={styles.priceElement}>
                        <Text style={styles.priceText}>
                            $2324
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.offerElement}>
                            <Text style={styles.offerText}>
                               $435 off  
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Text>
            </View>
            <View>
                <Text>
                    <View style={styles.cartElement}>
                        <TouchableOpacity style={styles.addCart}>
                            <Text style={styles.addCartText}>
                                Add To Cart
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.buyNow}>
                            <Text style={styles.buyNowText}>
                                Buy Now     
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Text>
            </View>
            <View>
                <Text style={styles.productDetails}>Details</Text>
            </View>
            <View>
                <Text style={styles.productContent}>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo.
                </Text>
            </View>
        </View>
    );
    }
}
const styles = StyleSheet.create({
    priceText: {
        color: '#2A4BA0',
        fontSize: 15,
        fontFamily: 'Manrope_700Bold',
        paddingTop: 20,
        paddingBottom: 20,
    },
    priceElement: {
        marginTop: 20,
        marginBottom: 10,
    },
    offerText: {
        color: '#ffffff',
        fontSize: 13,
        fontFamily: 'Manrope_400Regular',
    },
    offerElement: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#2A4BA0',
        borderColor: '#2A4BA0',
        borderRadius: 28,
        borderStyle: 'solid',
        borderWidth: 2,
        paddingHorizontal: 18,
        paddingVertical: 6,
        alignItems: 'center',
    },
    cartElement: {
        marginRight: 20,
        paddingRight: 20,
    },
    addCart: {
        color: '#2A4BA0',
        borderColor: '#2A4BA0',
        borderRadius: 28,
        borderStyle: 'solid',
        borderWidth: 2,
        paddingHorizontal: 26,
        paddingVertical: 16,
        alignItems: 'center',
    },
    addCartText: {
        color: '#2A4BA0',
        fontSize: 16,
        fontFamily: 'Manrope_600SemiBold',
        alignItems: 'center',
    },
    buyNowText: {
        color: '#ffffff',
        fontSize: 15,
        fontFamily: 'Manrope_600SemiBold',
        alignItems: 'center',
    },
    buyNow: {
        backgroundColor: '#2A4BA0',
        borderColor: '#2A4BA0',
        borderRadius: 28,
        borderStyle: 'solid',
        borderWidth: 2,
        paddingHorizontal: 26,
        paddingVertical: 16,
        alignItems: 'center',
    },
    productDetails: {
        color: '#1E222B',
        fontFamily: 'Manrope_400Regular',
        fontSize: 19,
        marginBottom: 15,
        marginTop: 20,
    },
    productContent: {
        color: '#8891A5',
        fontFamily: 'Manrope_400Regular',
        fontSize: 15,
        marginBottom: 10,
    },
    productList: {
        paddingLeft: 26,
        paddingRight: 26,
    },
    reviewContainer: {
        paddingBottom: 20,
    },
    reviewText: {
        color: '#A1A1AB',
        fontFamily: 'Manrope_400Regular',
        marginTop: 10,
        height: 20,
    },
    brandName: {
        color: "#1E222B",
        fontSize: 33,
        fontFamily: "Manrope_300Light"
    },
    categoryName: {
        color: "#1E222B",
        fontSize: 33,
        fontFamily: "Manrope_800ExtraBold",
        paddingBottom: 18,
    },
    backButton: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
        marginTop: 10,
        marginLeft: 8,
    },
    bagButton: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginTop: 0,
        marginLeft: 8,
    },
    buttonContainer: {
        backgroundColor: '#F8F9FB',
        borderRadius: 50,
        width: 28,
        height: 28,
    },
    productHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 70,
        paddingBottom: 30,
    },
    myStarStyle: {
        color: '#F9B023',
        backgroundColor: 'transparent',
        textShadowColor: 'transparent',
        textShadowOffset: {width:1, height:10},
        textShadowRadius: 1,
        fontSize: 18,
    },
    myEmptyStarStyle: {
        color: '#F9B023',
    },
    offerImage: {
        width: "auto",
        height: 180,
        // margin: 5,
        resizeMode: 'contain',
        // marginRight: 25,
    },
})
export default Products;
 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, FlatList, TouchableOpacity, Pressable, } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../store/CartReducer";
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";

const Cart = ({route}) => {

    const isFocused = useIsFocused();

    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.cart.cart);  
    const navigation = useNavigation();
    const [price, setPrice] = useState(null);

    const goBack = () => {
      navigation.navigate('Home');
      console.log("cart", cartList);
    }
  
    const handleButtonPress = () => {
      console.log('Button pressed!');
      console.log("cart page", cartList);
    };

    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item));
    }
    const decreaseQuantity = (item) => {
        if(item.quantity == 1){
          dispatch(removeFromCart(item));
        }else{
          dispatch(decrementQuantity(item));
        }
    }

    const renderItem = ({ item }) => (
        <View style={styles.cartDetails}>
            <View style={styles.cartProduct}>
                <View>
                    <Image source={{uri: item.thumbnail}} 
                    style={styles.productImage}/>
                </View>
                <View>
                    <Text style={styles.productName}>{item.title}</Text>
                    <Text>$ {item.price * item.quantity}</Text>
                </View>
                </View>
                <View style={styles.cartCount}>
                <TouchableOpacity onPress={() => decreaseQuantity(item)}>
                    <View style={styles.addCart}>
                        <Text style={styles.cartTextAdd}>-</Text>
                    </View>
                </TouchableOpacity>
                <Text>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item)}>
                    <View style={styles.addCart}>
                        <Text style={styles.cartTextAdd}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
    useEffect(() => {
        if (cartList && isFocused) {
            let priceAmount = null;
            cartList.filter((data) => {
                priceAmount +=  (data.price * data.quantity);
            })
            setPrice(priceAmount);
        }
    }, [cartList, isFocused]);
  
    return (
        <View style={styles.cart}>
            <View style={styles.cartContainer}>
                <TouchableOpacity onPress={goBack}>
                    <View style={styles.buttonContainer}>
                        <Image source={require('../../assets/images/back.png')}  style={styles.backButton} />
                    </View>
                </TouchableOpacity>
                <View>
                    <Text style={styles.cartText}>Shopping Cart ({cartList.length})</Text>
                </View>
            </View>
            {cartList && cartList.length == 0 ? <Text style={styles.emptyList}>No items added to cart</Text> :
                <View>
                    <FlatList
                        data={cartList}
                        keyExtractor={(item) => item.id.toString()} // Assuming each item has a unique ID
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        numColumns={1}
                        ItemSeparatorComponent={() => <View style={{ height: 25, width: 10 }} />}
                        contentContainerStyle={{ paddingRight: 10 }}
                    />
                    <View style={styles.priceContainer}>
                        <View style={styles.priceDetails}>
                            <View>
                                <Text>Subtotal</Text>
                            </View>
                            <View>
                                <Text>${price}</Text>
                            </View>
                        </View>
                        <View style={styles.priceDetails}>
                            <View>
                                <Text>Delivery</Text>
                            </View>
                            <View>
                                <Text>$10.00</Text>
                            </View>
                        </View>
                        <View style={styles.priceDetails}>
                            <View>
                                <Text>Total</Text>
                            </View>
                            <View>
                                <Text>${price + 10}</Text>
                            </View>
                        </View>
                        <View style={styles.priceDetails}>
                            <TouchableOpacity style={styles.checkOut} onPress={handleButtonPress}>
                                <Text style={styles.buttonText}>Proceed  To checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    cart: {
      backgroundColor: '#ffffff',
      paddingTop: 50,
      paddingBottom: 50,
      height: '100%'
    },
    addCart: {
      backgroundColor: '#F8F9FB',
      width: 30,
      height: 30,
      borderRadius: 50,
      alignItems: 'center',
    },
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
    productImage: {
      width: 38,
      height: 38,
      resizeMode: 'contain',
    },
    cartTextAdd: {
      fontSize: 20,
    },
    cartDetails: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 0,
      paddingLeft: 20,
    },
    cartProduct: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      paddingTop: 0,
      paddingBottom: 20,
      paddingLeft: 5,
      gap: 20,
    },
    cartCount: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      gap: 18,
      paddingRight: 20,
    },
    priceDetails: {
      marginLeft: 18,
      marginRight: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 14,
      paddingLeft: 0,
    },
    priceContainer: {
      backgroundColor: '#F8F9FB',
      marginHorizontal: 13,
      borderRadius: 20,
      marginTop: 50,
    },
    checkOut: {
      backgroundColor: '#2A4BA0',
      borderRadius: 22,
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 17,
      textAlign: 'center',
      marginTop: 20,
      alignItems: 'center',
      marginBottom: 22,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 13,
    },
    emptyList: {
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 150,
    },
    productName: {
        width: 160,
    }
})
export default Cart;
 
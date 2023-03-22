import React from 'react';
import {useAppDispatch, useAppSelector} from "./store.hooks";
import {addToCart, getCartProducts, getSubTotalInCart, removeFromCart} from "./redux/cart.slice";

export const Cart = () => {

    const cartProduct = useAppSelector(getCartProducts)
    const dispatch = useAppDispatch()
    const totalPrice = useAppSelector(getSubTotalInCart)



    return (
        <div>
            <h1>CART</h1>
            <div>
                <h3>Products:</h3>
                {cartProduct.map(product => {
                    return (
                        <div key={product.id}>
                            <span style={{marginRight: "30px"}}>{product.title}</span>
                            <span style={{marginRight: "30px"}}>price: {product.price} $</span>
                            <button style={{borderRadius: "50px"}}
                                    onClick={() => dispatch(removeFromCart(product.id))}>
                                -
                            </button>
                            <span style={{marginLeft: "10px", marginRight: "10px"}}>quantity: {product.amount}</span>
                            <button style={{borderRadius: "50px"}}
                                    onClick={() => dispatch(addToCart(product))}>
                                +
                            </button>
                            <span style={{marginLeft: "70px"}}>total price: {product.amount * product.price} $</span>
                        </div>
                    )
                })}
                <h3>Subtotal in Cart: {totalPrice}  $</h3>
            </div>
        </div>
    );
};


import React from 'react';
import {addProduct, Product, removeProduct, selectAllProducts} from "../redux/products.slice";
import {useAppDispatch, useAppSelector} from "../store.hooks";
import {addToCart} from "../redux/cart.slice";

type ProductsListProps = {}


export const ProductsList: React.FC<ProductsListProps> = () => {

    const products = useAppSelector(selectAllProducts)
    const dispatch = useAppDispatch()


    const removeFromStore = (id: string) => dispatch(removeProduct(id))

    const addToCartHandler = (product: Product ) => dispatch(addToCart(product))

    return (
        <div>
            <h2>Games List</h2>
            {products.map((product) => <div key={product.id}>
                    {product.title}: {product.price} $
                    <button style={{marginLeft: "10px"}} onClick={() => addToCartHandler(product)}>
                        add to cart
                    </button>
                    <button style={{marginLeft: "10px"}} onClick={() => removeFromStore(product.id)}>
                        remove from the store
                    </button>
                </div>
            )}
            <button onClick={() => {
                dispatch(addProduct({
                        title: "TES: Oblivion",
                        price: 49,
                        id: "obl"
                    }
                ))
            }}>
                ADD GAME
            </button>


        </div>
    );
};

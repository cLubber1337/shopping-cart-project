import React, {ChangeEvent, useState} from 'react';
import {addProductAsync, getMessageError, Product} from "../redux/products.slice";
import {useAppDispatch, useAppSelector} from "../store.hooks";


export const ProductForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const messageError = useAppSelector(getMessageError)


    const [product, setProduct] = useState<Product>({
        title: "",
        price: 0,
        id: ""
    })

    const handleChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => setProduct(prevState => {
        (prevState as any)[name] = value
        return {...prevState}
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(addProductAsync(product))
    }
    const {title, price, id} = product


    return (
        <>
            <h2>Add Game to the Store</h2>
            {messageError && <h3 style={{color: "red"}}>{messageError}</h3>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder={"Game title"} name={"title"} value={title}
                       onChange={handleChange}
                />

                <input type="text" placeholder={"Price"} name={"price"} value={price}
                       onChange={handleChange}
                />

                <input type="text" placeholder={"Id"} name={"id"} value={id}
                       onChange={handleChange}
                />
                <button type={"submit"}>Add price</button>
            </form>
        </>
    );
};


import React from 'react';
import './App.css';
import {ProductsList} from "./Products/ProductsList";
import {ProductForm} from "./Products/ProductForm";
import {Cart} from "./Cart";

function App() {
    return (
        <div className="App">
            <ProductsList/>
            <ProductForm/>
            <Cart/>
        </div>
    );
}

export default App;

//importing react and useState
import React, { useState } from "react";

//importing child components Data and Card 
import Data from "../../Data";
import Card from "../../components/ProductCard/ProductCard";

function Shop() {

    const [item, setItem] = useState(Data);

    return (
        
        <div>
            
            <div className="container-fluid">
                <div className="row">
                    <h1 className="col-12 text-center my-3 fw-bold">Our Products</h1>
                    <Card item={item} /> 
                </div>
            </div>
            
            {/* <h1>Renegade Shop</h1>
            <img src="/images/RenegadeAttire_Hat.png" ></img>
            <button>CHOOSE</button> */}
            
        </div>
    );
};

export default Shop;
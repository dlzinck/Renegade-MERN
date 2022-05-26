//importing react and useState
import React, { useState, useEffect } from "react";

//importing child components Data and Card 
import Data from "../../Data";
import Card from "../../components/ProductCard/ProductCard";
import Filter from "../../components/Filter/Filter";

function Shop() {
    // setting state with dummy data / will need to input data from shopify 
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/inventory", {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer"
        })
        .then(res => res.json())
        .then(body => setItem(body.result))

    }, []);

    // creating the array that will contain the values of the categorys and display them using map
    const prodItems = [...new Set(Data.map((Prod) => Prod.category))];

    const filterItem = (val) => {
        const newItem = Data.filter((newProd) => {
            return newProd.category === val;
            // comparing category for displaying data
        });
        setItem(newItem);
    };

    return (
        
        <div>
            
            <div className="container-fluid">
                <div className="row">
                    <h1 className="col-12 text-center my-3 fw-bold">Our Products</h1>
                    {/* importing filter into shop, all 5 categories are displayed as buttons */}
                    <Filter
                        filterItem={filterItem}
                        setItem={setItem}
                        prodItems={prodItems}
                    />
                    {/* adding card item component for products */}
                    <Card item={item} /> 
                </div>
            </div>
            
            
        </div>
    );
};

export default Shop;
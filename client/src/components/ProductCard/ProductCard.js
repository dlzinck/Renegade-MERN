//importing react 
import React from "react";

// creating card component for products, will be used on all shop pages 
const Card = ({ item }) => {
    // destructuring props
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {/* mapping through the the data that will be passed into the Card */}
                    {item.map((Prod) => {
                        return (
                            <div
                                className="col-md-4 col-sm-6 card my-3 py-3 border-0"
                                key={Prod.id}
                            >
                                <div className="card-img-top text-center">
                                    {/* pulling in the img as well as the alt tag with the product name */}
                                    <img src={Prod.img} alt={Prod.title} className="photo w-75" />
                                </div>
                                <div className="card-body">
                                    <div className="card-title fw-bold fs-4">
                                        {/* displaying the name of the product and the price */}
                                        {Prod.title} &nbsp;
                                        {Prod.price}
                                    </div>
                                    {/* adding the product description */}
                                    <div className="card-text">{Prod.desc}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Card;
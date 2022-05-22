// importing react 
import React from "react";
//importing dummy data for testing 
import Data from "../../Data";

// creating filter component 
const Filter = ({ filterItem, setItem, prodItems }) => {
    return (

        <div className="d-flex justify-content-center">
            {/* mapping throught the product items via prod */}
                {prodItems.map((Prod, id) => {
                    return (
                        // button for filtering 
                        <button
                            className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold"
                            onClick={() => filterItem(Prod)}
                            key={id}
                        >
                            {Prod}
                        </button>
                    );
                })}
                {/* button for setting the all of the data  */}
                <button
                    className="btn-dark text-white p-1 px-3 mx-5 fw-bold btn"
                    onClick={() => setItem(Data)}
                >
                    All
                </button>
            </div>
    );
};

export default Filter;
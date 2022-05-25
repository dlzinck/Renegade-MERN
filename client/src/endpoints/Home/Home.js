// importing react 
import React from 'react';
// import Card from '../../components/ProductCard/ProductCard';
import About from '../../components/About/About';
import ProductCard from '../../components/ProductCard/ProductCard'

//IMPORTING COMPONENTS
// below is an example of where the products would load, but these are not our products for this project
// const items = [{
//     id: "1",
//     title: "Poha",
//     category: "Breakfast",
//     price: "$1",
//     img: "https://c.ndtvimg.com/2021-08/loudr2go_aloo-poha_625x300_05_August_21.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350",
//     desc: " Poha. Light, filling and easy to make, poha is one famous breakfast that is eaten almost everywhere in the country. And the best part is- it can be made in a number of ways. Kanda poha, soya poha, Indori poha, Nagpur Tari Poha are a few examples",
// }];
function Home() {
    return (
        <div>
            
            <img src='/images/RenegadeAttire_Landing.png' alt='landing page hero'></img>
            {/* <Card item={items}/> */}
            <ProductCard />            
            <About />
        
        </div>
    );
}

export default Home;
import axios from 'axios';

const products = async (query) =>
    console.log('looking for api query')
    axios.get(`https://renegadeattires.myshopify.com/admin/api/graphql.json`);

export default { products };
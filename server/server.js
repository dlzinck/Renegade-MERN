const express = require("express");
// Run npm install mongodb and require mongodb and MongoClient class
const mongodb = require("mongodb").MongoClient;
const stripeSecret = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripePub = require("stripe")(process.env.STRIPE_PUBLISHABLE_KEY);
const axios = require("axios").default;

const STOREFRONT_ACCESS_TOKEN = "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";
const GRAPHQL_URL =
  "https://renegadeattires.myshopify.com/api/2020-07/graphql.json";

const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3001;

// Connection string to local instance of MongoDB including database name
const connectionStringURI = `mongodb://127.0.0.1:27017/shelterDB`;

// Declare a variable to hold the connection
let db;

let edges;

function fetchInventory(callBack) {
  let arrofProducts = [];
  const data = {
    query: `query {
    products(first: 25) {
        edges {
          node {
            id
            handle
            title
            priceRangeV2 {
              maxVariantPrice {
                amount
              }
            }
            variants(first: 10) {
              edges {
                node {
                  title
                }
              }
            }
          }
        }
      }
  }`,
  };

  axios
    .post(
      "https://renegadeattires.myshopify.com/admin/api/graphql.json",
      data,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Shopify-Access-Token": "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",
          "Content-Type": "application/json",
        },
      }
    )
    .catch((error) => {
      console.log(error);
    })
    .then((data) => data.data)
    .then((data) => {
      const edges = data.data.products.edges;
      for (let i = 0; i < edges.length; i++) {
        const bodyTwo = {
          query: `query {    product(id: \"${edges[i].node.id}\") {      title        description        priceRangeV2{        maxVariantPrice{          amount        }      }      media(first: 5) {        edges {          node {            ... fieldsForMediaTypes          }        }      }  }}fragment fieldsForMediaTypes on Media {  alt  mediaContentType  preview {    image {      id      altText      originalSrc    }  }  ... on MediaImage {    id    image {      altText      originalSrc    }  }}`,
        };
        axios
          .post(
            "https://renegadeattires.myshopify.com/admin/api/graphql.json",
            bodyTwo,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "X-Shopify-Access-Token":
                  "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",
                "Content-Type": "application/json",
              },
            }
          )
          .catch((error) => console.log(error))
          .then((response) => response.data)
          .then((data) => {
            arrofProducts.push(data);
          });
      }
      if (arrofProducts.length === edges.length) {
        return arrofProducts;
      }
    })
    .then((results) => {
      console.log(results);
      callBack(results);
    });
}

app.get("/inventory", (req, res) => {
  const results = [];
  fetchInventory((allResults) => {
    if (allResults && allResults.length > 0) {
      allResults.forEach((result, index) => {
        const data = {
          title: result.data.product.title,
          category: "",
          desc: result.data.product.description,
          price: result.data.product.priceRangeV2.maxVariantPrice.amount,
          img: result.data.product.media.edges[0].node.image.originalSrc,
        };
        results.push(data);
        if (index === allResults.length - 1) {
          res.status(200).json({ result: results });
        }
      });
    } else {
      res.status(200).json({ result: [] });
    }
  });
});

// Creates a connection to a MongoDB instance and returns the reference to the database
mongodb.connect(
  // Defines connection between app and MongoDB instance
  connectionStringURI,
  // Sets connection string parser and Server Discover and Monitoring engine to true and avoids warning
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    // Use client.db() constructor to add new db instance
    db = client.db();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);

app.use(express.json());

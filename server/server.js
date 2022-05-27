const express = require("express");
// Run npm install mongodb and require mongodb and MongoClient class
const mongodb = require("mongodb").MongoClient;
const stripeSecret = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripePub = require("stripe")(process.env.STRIPE_PUBLISHABLE_KEY);
const axios = require("axios").default;
const util = require('util');
const cors = require('cors');

const STOREFRONT_ACCESS_TOKEN = "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";
const GRAPHQL_URL =
  "https://renegadeattires.myshopify.com/api/2020-07/graphql.json";

const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());// take away object origin for production {origin: 'http://localhost:3000'}
app.use(bodyParser.json());
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
    .then((data) => {
      // console.log('data', util.inspect(data.data, {depth: 7, color: true}));
      return data.data;
    })
    .then((data) => {
      return data.data.products.edges;
      // const edges = data.data.products.edges;
      // for (let i = 0; i < edges.length; i++) {
      //   const bodyTwo = {
      //     query: `query {    product(id: \"${edges[i].node.id}\") {      title        description        priceRangeV2{        maxVariantPrice{          amount        }      }      media(first: 5) {        edges {          node {            ... fieldsForMediaTypes          }        }      }  }}fragment fieldsForMediaTypes on Media {  alt  mediaContentType  preview {    image {      id      altText      originalSrc    }  }  ... on MediaImage {    id    image {      altText      originalSrc    }  }}`,
      //   }; //edges are one of the queries between the nodes, want to access the web, it will return the edges of that when queried, so all the info that falls within the scope of the query, clusters of info
      //   axios
      //     .post(
      //       "https://renegadeattires.myshopify.com/admin/api/graphql.json",
      //       bodyTwo,
      //       {
      //         headers: {
      //           "Access-Control-Allow-Origin": "*",
      //           "X-Shopify-Access-Token":
      //             "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",
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     )
      //     .catch((error) => console.log(error))
      //     .then((response) => response.data)
      //     .then((data) => {
      //       // console.log('data', util.inspect(data.data, {depth: 7, color: true}));
      //       arrofProducts.push(data);
      //       console.log('arrofProducts', arrofProducts);
      //       return arrofProducts;
      //     });
      // }
      // if (arrofProducts.length === edges.length) {
      //   console.log('arrofProducts.length === edges.length');
      //   console.log('arrofProducts', arrofProducts);
      //   return arrofProducts;
      // }
      // return arrofProducts;
    })
    .then((edges) => {
      for (let i = 0; i < edges.length; i++) {
        const bodyTwo = {
          query: `query {    product(id: \"${edges[i].node.id}\") {      title        description        priceRangeV2{        maxVariantPrice{          amount        }      }      media(first: 5) {        edges {          node {            ... fieldsForMediaTypes          }        }      }  }}fragment fieldsForMediaTypes on Media {  alt  mediaContentType  preview {    image {      id      altText      originalSrc    }  }  ... on MediaImage {    id    image {      altText      originalSrc    }  }}`,
        }; //edges are one of the queries between the nodes, want to access the web, it will return the edges of that when queried, so all the info that falls within the scope of the query, clusters of info
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
            // console.log('data', util.inspect(data.data, {depth: 7, color: true}));
            arrofProducts.push(data);
            if (arrofProducts.length === edges.length) {
              // console.log('arrofProducts.length === edges.length');
              // console.log('arrofProducts', arrofProducts);
              return arrofProducts;
            }
            return arrofProducts;
            // console.log('arrofProducts', arrofProducts);
          })
          .then((results) => {
            // console.log(results);
            if (arrofProducts.length === edges.length) {
              callBack(results);
            }
          });
      }
    })
}

app.get("/inventory", (req, res) => {
  const results = [];
  fetchInventory((allResults) => {
    console.log('allResults fetchInventory', allResults);
    if (allResults && allResults.length > 0) {
      console.log('allResults && allResults.length > 0');
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
          console.log("right before res.status send");
          res.status(200).json({ result: results });
        }
      });
    } else {
      res.status(200).json({ result: ['none'] });
    }
  });
});

app.post("/sendmail", (req, res) => {
  const body = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  const send = require("gmail-send")({
    user: "renegadecontactus@gmail.com",
    pass: "Renegadepassword",
    to: "renegadecontactus@gmail.com",
    subject: "From Contact Form",
  });
  send(
    {
      text: JSON.stringify(body),
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
      res.status(200).json({ result: fullResult });
    }
  );
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

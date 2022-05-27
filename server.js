const express = require('express');
// Run npm install mongodb and require mongodb and MongoClient class
const mongodb = require('mongodb').MongoClient;
const stripeSecret = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripePub = require("stripe")(process.env.STRIPE_PUBLISHABLE_KEY);


const STOREFRONT_ACCESS_TOKEN =  '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'
const GRAPHQL_URL = 'https://renegadeattires.myshopify.com/api/2020-07/graphql.json'

const bodyParser = require('body-parser');
const path = require("path")

const app = express();
const port = 3001;

// Connection string to local instance of MongoDB including database name
const connectionStringURI = `mongodb://127.0.0.1:27017/shelterDB`;

// Declare a variable to hold the connection
let db;

let edges;
// FETCH CAN NEVER RUN ON THE BACK END
let arrofProducts = [];
function fetchInventory() {
    fetch("https://renegadeattires.myshopify.com/admin/api/graphql.json", {
        "method": "POST",
        "headers": {
            "Access-Control-Allow-Origin":"*",
            "X-Shopify-Access-Token": "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",
            "Content-Type": "application/json"
        },
        "body": "{\"query\":\"query {\\n      products( first: 25) {\\n        edges{\\n          node {\\n            id\\n            handle\\n            title\\n            priceRangeV2{\\n              maxVariantPrice{\\n                amount\\n              }\\n\\n            }\\n                variants(first: 10){\\n              edges{\\n                node{\\n                  title\\n              }\\n            }\\n          }\\n        }\\n      }\\n    }\\n  }\"}"
    })
        .then(response => response.json())
        .then(data => {
            edges = data.data.products.edges;
            
            for( let i = 0; i < edges.length; i++){                
                fetch("https://renegadeattires.myshopify.com/admin/api/graphql.json", {
                    "method": "POST",
                    "headers": {
                        "Access-Control-Allow-Origin":"*",
                        "X-Shopify-Access-Token": "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",
                        "Content-Type": "application/json"
                    },
                    "body": `{\"query\":\"{\\n    product(id: \\\"${edges[i].node.id}\\\") {\\n      title\\n        description\\n        priceRangeV2{\\n        maxVariantPrice{\\n          amount\\n        }\\n      }\\n      media(first: 5) {\\n        edges {\\n          node {\\n\\n            ... fieldsForMediaTypes\\n          }\\n        }\\n      }\\n  }\\n}\\n\\nfragment fieldsForMediaTypes on Media {\\n  alt\\n  mediaContentType\\n  preview {\\n    image {\\n      id\\n      altText\\n      originalSrc\\n    }\\n  }\\n  ... on MediaImage {\\n    id\\n    image {\\n      altText\\n      originalSrc\\n    }\\n  }\\n}\"}`
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        arrofProducts.push(data) 
                        
                    })
                    

            }
        })

}

fetchInventory();
console.log(arrofProducts)


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
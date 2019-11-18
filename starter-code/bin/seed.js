require("dotenv").config();

const mongoose = require("mongoose");

let Ingredients = require("../models/Ingredients");
let Orders = require("../models/Orders");
let Pizzas = require("../models/Pizzas");
let Stores = require("../models/Stores");
let Customers = require("../models/Customers");

mongoose
  .connect("mongodb://localhost/populated-crud-implementation", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Database name: "${x.connections[0].name}"`);

    clearDB().then(() => populateDB());
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

function clearDB() {
  return new Promise((resolve, reject) => {
    resolve(
      Ingredients.deleteMany()
        .then(() => {
          return Orders.deleteMany();
        })
        .then(() => {
          return Pizzas.deleteMany();
        })
        .then(() => {
          return Stores.deleteMany();
        })
        .then(() => {
          return Customers.deleteMany();
        })
    );
  });
}

function populateDB() {
  let pizzasAddedGlobal;
  let storesAddedGlobal;

  //first populate ingredients
  Ingredients.create([
    {
      name: "Peperonni",
      calories: 150,
      price: 1.45
    },
    {
      name: "Queso de rulo",
      calories: 150,
      price: 4.05
    },
    {
      name: "Cebolla caramelizada",
      calories: 150,
      price: 3.15
    },
    {
      name: "Bacon",
      calories: 150,
      price: 2.45
    },
    {
      name: "Topping a base de mozarella",
      calories: 150,
      price: 3.25
    },
    {
      name: "Salsa carbonara",
      calories: 300,
      price: 2.45
    }
  ])
    .then(ingredientsAdded => {
      return Pizzas.create(
        {
          name: "Piamontesa",
          ingredients: [ingredientsAdded[0]._id, ingredientsAdded[3]._id, ingredientsAdded[4]._id]
        },
        {
          name: "Tenessee",
          ingredients: [
            ingredientsAdded[0]._id,
            ingredientsAdded[1]._id,
            ingredientsAdded[2]._id,
            ingredientsAdded[3]._id
          ]
        },
        {
          name: "Barbacoa Gourmet",
          ingredients: [
            ingredientsAdded[2]._id,
            ingredientsAdded[3]._id,
            ingredientsAdded[4]._id,
            ingredientsAdded[5]._id
          ]
        },
        {
          name: "Barbacoa Crispy",
          ingredients: [
            ingredientsAdded[0]._id,
            ingredientsAdded[1]._id,
            ingredientsAdded[2]._id,
            ingredientsAdded[3]._id
          ]
        },
        {
          name: "Ibérica",
          ingredients: [
            ingredientsAdded[0]._id,
            ingredientsAdded[1]._id,
            ingredientsAdded[4]._id,
            ingredientsAdded[5]._id
          ]
        },
        {
          name: "Hawaiana",
          ingredients: [ingredientsAdded[1]._id, ingredientsAdded[2]._id, ingredientsAdded[5]._id]
        },
        {
          name: "Carbonara",
          ingredients: [ingredientsAdded[0]._id, ingredientsAdded[1]._id, ingredientsAdded[4]._id]
        }
      );
    })
    .then(pizzasAdded => {
      pizzasAddedGlobal = pizzasAdded;
      return Stores.create([
        {
          name: "Telepizza",
          location: "Puerta del Sol",
          city: "Madrid",
          pizzas: [pizzasAdded[0]._id, pizzasAdded[1]._id, pizzasAdded[2]._id, pizzasAdded[3]._id]
        },
        {
          name: "Telepizza",
          location: "La Latina",
          city: "Madrid",
          pizzas: [pizzasAdded[0]._id, pizzasAdded[4]._id, pizzasAdded[5]._id, pizzasAdded[6]._id]
        },
        {
          name: "Telepizza",
          location: "Plaza Urquinaona",
          city: "Barcelona",
          pizzas: [pizzasAdded[0]._id, pizzasAdded[3]._id, pizzasAdded[4]._id, pizzasAdded[6]._id]
        },
        {
          name: "Telepizza",
          location: "Centro cultural Santa Mónica",
          city: "Barcelona",
          pizzas: [
            pizzasAdded[0]._id,
            pizzasAdded[1]._id,
            pizzasAdded[2]._id,
            pizzasAdded[3]._id,
            pizzasAdded[5]._id,
            pizzasAdded[6]._id
          ]
        },
        {
          name: "Telepizza",
          location: "La muralla del casco viejo",
          city: "Cádiz",
          pizzas: [pizzasAdded[1]._id, pizzasAdded[2]._id, pizzasAdded[3]._id, pizzasAdded[6]._id]
        }
      ]);
    })
    .then(storesAdded => {
      storesAddedGlobal = storesAdded;

      return Customers.create([
        {
          name: "Rafael Nieto de Dios"
        },
        {
          name: "Luz Cuesta Mogollón"
        },
        {
          name: "Ana Tomía"
        },
        {
          name: "Helen Chufe"
        },
        {
          name: "Armando Bronca Segura"
        },
        {
          name: "Miguel Marco Gol"
        }
      ]);
    })
    .then(customers => {
      return Orders.create([
        {
          customer: customers[0]._id,
          store: storesAddedGlobal[0]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[1]._id]
        },
        {
          customer: customers[1]._id,
          store: storesAddedGlobal[1]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[1]._id]
        },
        {
          customer: customers[2]._id,
          store: storesAddedGlobal[1]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[1]._id]
        },
        {
          customer: customers[3]._id,
          store: storesAddedGlobal[2]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[1]._id]
        },
        {
          customer: customers[4]._id,
          store: storesAddedGlobal[2]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[1]._id]
        },
        {
          customer: customers[4]._id,
          store: storesAddedGlobal[3]._id,
          pizzas: [pizzasAddedGlobal[1]._id, pizzasAddedGlobal[4]._id]
        },
        {
          customer: customers[4]._id,
          store: storesAddedGlobal[3]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[5]._id, pizzasAddedGlobal[6]._id]
        },
        {
          customer: customers[4]._id,
          store: storesAddedGlobal[2]._id,
          pizzas: [pizzasAddedGlobal[2]._id, pizzasAddedGlobal[5]._id]
        },
        {
          customer: customers[5]._id,
          store: storesAddedGlobal[2]._id,
          pizzas: [pizzasAddedGlobal[3]._id, pizzasAddedGlobal[6]._id]
        },
        {
          customer: customers[5]._id,
          store: storesAddedGlobal[2]._id,
          pizzas: [
            pizzasAddedGlobal[3]._id,
            pizzasAddedGlobal[4]._id,
            pizzasAddedGlobal[5]._id,
            pizzasAddedGlobal[6]._id
          ]
        }
      ]);
    })
    .then(ordersAdded => {
      return Orders.find()
        .limit(1)
        .populate("customer")
        .populate("store")
        .populate({
          path: "pizzas",
          populate: {
            path: "ingredients"
          }
        });
    })
    .then(ordersPopulated => {
      console.log("Now populated 🤖");
      process.exit(0);
    });
}

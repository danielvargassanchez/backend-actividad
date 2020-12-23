const { json } = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "28022014",
  database: "store",
  port: "5432",
});

const methods = {
  getProducts: async function (req, res) {
    const result = await pool.query("SELECT * FROM products");
    res.status(200).json(result.rows);
  },
  getProductById: async function (req, res) {
    let product_id = parseInt(req.params.product_id);
    const result = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [product_id]
    );
    res.status(200).json(result.rows);
  },
  getProductsFilterByCategory: async function (req, res) {
    let categorie_id = parseInt(req.params.categorie_id);
    let result = await pool.query(
      "select * from products where category_id=$1",
      [categorie_id]
    );
    res.json(result.rows);
  },
  filterByMaxPrice: async function (req, res) {
    let maxprice = parseInt(req.params.maxprice);
    let result = await pool.query("SELECT * FROM products where cost <= $1", [
      maxprice,
    ]);
    res.send(result.rows);
  },
  filterByMinPrice: async function (req, res) {
    let minprice = parseInt(req.params.minprice);
    let result = await pool.query("SELECT * FROM products where cost >= $1", [
      minprice,
    ]);
    res.send(result.rows);
  },
  filterByName: async function (req, res) {
    let name = req.params.name;
    let result = await pool.query(
      "select * from products where name  iLike '%" + name + "%'"
    );
    res.send(result.rows);
  },
  addToCar: async function (req, res) {
    let product_id = parseInt(req.body.product_id);
    let quantity = parseInt(req.body.quantity);

    if (product_id <= 0 || quantity <= 0) {
      res.status(400).body("Bad request exception");
    }

    let productWasAdded = await pool.query(
      "SELECT * FROM car WHERE product_id = $1",
      [product_id]
    );

    var result = [];
    if (productWasAdded.rows.length != 0) {
      result = await pool.query(
        "UPDATE car SET quantity = quantity+$1 WHERE product_id=$2",
        [quantity, product_id]
      );
    } else {
      result = await pool.query(
        "INSERT INTO car (product_id,quantity) values ($1,$2)",
        [product_id, quantity]
      );
    }
    res.status(200).send("product added");
  },
  deleteItemCar: async function (req, res) {
    let product_id = parseInt(req.params.product_id);
    let result = await pool.query("DELETE FROM car WHERE product_id= $1 ", [
      product_id,
    ]);

    res.status(200).send("Product eliminated from your shopping cart");
  },
  payProductsOfCart: async function (req, res) {
    let products = [];
    result = await pool.query(
      "SELECT car.quantity, products.cost, car.product_id  FROM car INNER JOIN products on car.product_id = products.product_id "
    );
    products = result.rows;
    var total = 0;

    console.log(result.rows);

    products.forEach(async (product) => {
      let totalProduc = 0;
      totalProduc = parseInt(product.quantity) * parseInt(product.cost);
      total = total + totalProduc;

      let updateQuantity = await pool.query(
        "UPDATE products SET quantity = quantity-$1 where product_id=$2",
        [parseInt(product.quantity), parseInt(product.product_id)]
      );
    });

    let deleteCart = await pool.query("DELETE FROM car");
    res.status(200).send("Your total is: $" + total + " your cart was cleaned");
  },
  getMyCart: async function (req, res) {
    let result = await pool.query(
      "SELECT * FROM car INNER JOIN products on car.product_id = products.product_id "
    );

    res.status(200).send(result.rows);
  },
};

exports.data = methods;

const { Router } = require("express");
const router = Router();
const methods = require("./../controllers/index.controller");

router.get("/products", methods.data.getProducts);
router.get("/products/showproduct/:product_id", methods.data.getProductById);
router.get(
  "/filterbycategory/:categorie_id",
  methods.data.getProductsFilterByCategory
);
router.get("/filterbymaxprice/:maxprice", methods.data.filterByMaxPrice);
router.get("/filterbyminprice/:minprice", methods.data.filterByMinPrice);
router.get("/filterbyname/:name", methods.data.filterByName);
router.post("/addtocart", methods.data.addToCar);
router.delete("/deleteitemcar/:product_id", methods.data.deleteItemCar);
router.get("/getmycart", methods.data.getMyCart);
router.put("/payproducts", methods.data.payProductsOfCart);
exports.data = router;

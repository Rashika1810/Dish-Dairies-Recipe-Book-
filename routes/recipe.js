const express = require("express");
const AuthController = require("../controllers/authController");
const RecipeController = require("../controllers/recipeController");
const CategoryController = require("../controllers/categoryController");
const checkIsUserAuthenticated = require("../middleware/authMiddleware");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/upload/`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}~${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/user-register", AuthController.userRegistration);
router.post("/user-login", AuthController.userLogin);

//Protected Routes

router.get(
  "/get-recipe",
  checkIsUserAuthenticated,
  RecipeController.getAllRecipe
);
router.post(
  "/add-recipe",
  upload.single("thumbnail"),
  checkIsUserAuthenticated,
  RecipeController.addNewRecipe
);
router.get(
  "/get-recipe/:id",
  checkIsUserAuthenticated,
  RecipeController.getSingleRecipe
);

router.get(
  "/get-category",
  checkIsUserAuthenticated,
  CategoryController.getAllCategory
);
router.post(
  "/add-category",
  checkIsUserAuthenticated,
  CategoryController.addNewCategory
);

module.exports = router;

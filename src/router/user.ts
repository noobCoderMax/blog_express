import express from "express";
const router = express.Router();
const userController = require("../controller/user");
const userValidator = require("../validator/user");
const auth = require("../middleware/utils/auth");

router.post("/rigister", userValidator.register, userController.register);

router.post("/login", userValidator.login, userController.login);

router.post("/loginEmail", userController.loginCode);

router.get("/current", auth, userController.getCurrentUser);

router.put(
  "/update",
  auth,
  userValidator.updateInfo,
  userController.updateUser
);

router.post(
  "/updatePsw",
  auth,
  userValidator.updatePsw,
  userController.updatePwd
);

router.get("/:id", userController.getUserById);

router.delete("/:id", userController.deleteUserById);

router.post("/new", userController.addUser);

router.get("/:currentPage/:pageSize", userController.getUserByPage);

router.post("/getEmailCode", userController.getEmailCode);

module.exports = router;

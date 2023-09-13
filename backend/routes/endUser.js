const express = require("express");
const router = express.Router();
const {
  registerCustomer,
  loginCustomer,
  loginAgent,
  addUsers,
} = require("../controllers/endUser");

router.post("/registeruser", registerCustomer);
router.post("/logincustomer", loginCustomer);
router.post("/loginagent", loginAgent);
router.post("/addusers", addUsers);

module.exports = router;

const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const {
  getAllUsers,
  updateUserRole,
} = require("../controllers/user.controller");

router.get("/", auth, role(["admin"]), getAllUsers);
router.patch("/:id/role", auth, role(["admin"]), updateUserRole);

module.exports = router;

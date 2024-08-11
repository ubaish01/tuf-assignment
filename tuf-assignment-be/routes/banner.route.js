const {
  test,
  CreateOrUpdateBanner,
  fetchBanner,
  toggleBanner,
} = require("../controllers/banner.controller");
const { asyncError } = require("../error/errors");
const { isAdmin } = require("../middleware/auth.middleware");

const router = require("express").Router();

router.get("/test", isAdmin, asyncError(test));
router.post("/create-or-update", isAdmin, asyncError(CreateOrUpdateBanner));
router.put("/toggle", isAdmin, asyncError(toggleBanner));
router.get("/", asyncError(fetchBanner));

module.exports = router;

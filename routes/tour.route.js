const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");

router.route("/").get(tourController.getTours).post(tourController.createTours);

router.route("/cheapest").get(tourController.getCheapest);
router.route("/trending").get(tourController.getTrending);

router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTourById);
// .delete(tourController.deleteTourById);
module.exports = router;

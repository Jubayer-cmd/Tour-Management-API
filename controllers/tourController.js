const {
  createProductService,
  getTourService,
  getCheapservice,
  gettourserviceId,
  getTrendService,
  getupdateserviceId,
} = require("../services/tour.service");

exports.getTours = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const tours = await getTourService(filters, queries);

    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createTours = async (req, res, next) => {
  try {
    const result = await createProductService(req.body);
    res.status(200).json({
      status: "success",
      messgae: "Data inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await gettourserviceId(id);
    res.status(200).json({
      status: "success",
      messgae: "Data fetch successfully!",
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to fetch",
      error: error.message,
    });
  }
};
exports.updateTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getupdateserviceId(id, req.body);
    res.status(200).json({
      stauts: "success",
      message: "Successfully updated the product",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.getCheapest = async (req, res) => {
  try {
    const tour = await getCheapservice();

    res.status(200).json({
      status: "success",
      messgae: "Data fetch successfully!",
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to fetch",
      error: error.message,
    });
  }
};

exports.getTrending = async (req, res) => {
  try {
    const tour = await getTrendService();

    res.status(200).json({
      status: "success",
      messgae: "Data fetch successfully!",
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to fetch",
      error: error.message,
    });
  }
};

const Tours = require("../models/tourModel");

exports.createProductService = async (data) => {
  const product = await Tours.create(data);
  return product;
};

exports.getTourService = async (filters, queries) => {
  const tour = await Tours.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Tours.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, tour };
};

exports.getCheapservice = async () => {
  const tour = await Tours.find({}).sort("price").limit(3);
  return tour;
};
exports.getTrendService = async () => {
  const tour = await Tours.find({}).sort("-view").limit(3);
  return tour;
};

exports.gettourserviceId = async (id) => {
  const tour = await Tours.findOneAndUpdate({ _id: id }, { $inc: { view: 1 } });
  return tour;
};

exports.getupdateserviceId = async (id, data) => {
  const result = await Tours.findOneAndUpdate(
    { _id: id },
    { $inc: data },
    {
      runValidators: true,
    }
  );

  // const tours = await Tours.findById(id);
  // const result = await tours.set(data).save();
  return result;
};

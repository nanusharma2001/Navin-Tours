const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

//Works because of JavaScript Clousres
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with this ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //otherwise by default it will send document before update
      runValidators: true, //Update validators validate the update operation against the model's schema.
    });
    if (!document) {
      return next(new AppError('No document found with this ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    //const newdoc=new doc({});
    //newdoc.save()
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with this ID', 404));
    }
    //Same as  doc.findOne({_id:req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //To allow nested GET reviews on tour(hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    /*
    Another Way (By mongoose)
    const query= Tour.find().where('duration').equals(5).where('difficulty').equals('easy');
    */
    res.status(200).json({
      //Makes JS Object into JSON
      status: 'sucess',
      requestTime: req.requestTime,
      results: doc.length,
      data: {
        data: doc, //here key and value are same name otherwise if x=json.parse(....) then doc:x would be there
      },
    });
  });

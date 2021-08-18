const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review cannot be empty!'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    defaukt: Date.now,
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
});
reviewSchema.index({ tour: 1, user: 1 }, { unique: true }); //So that 1 user do not give multiple reviews
reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  //Here we made static method since aggregate func needs to be called upon model so in static method this points to a model
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  // console.log(stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5, //default
    });
  }
};
reviewSchema.post('save', function () {
  //this points to current review
  this.constructor.calcAverageRatings(this.tour); //We actually needed to call this fun from a model but we haven't  defined Review yet so we call this where constructor points to model which created "this".
});
//findByIdAndUpdate
//findByIdAndUpdate
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne(); //to obtain document from query
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  //await this.findOne(); does not work here as the query has already executed.
  await this.r.constructor.calcAverageRatings(this.r.tour); //as calc func only works on model
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

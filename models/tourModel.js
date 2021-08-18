const mongoose = require('mongoose');
const slugify = require('slugify');
//const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'], //[value,error if not provided name]
      unique: true,
      trim: true,
      maxlength: [40, 'A tour must have less than or equal than 40 characters'],
      minlength: [10, 'A tour must have more than or equal than 10 characters'],
      //validate: [validator.isAlpha, 'A tour must contain only alphabets'], only for demo
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, //for rounding off to 1 decimal place
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        //Our Coustom Validator
        validator: function (val) {
          //this only point to current doc on NEW document creation not on updating
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be less then actual price',
      },
    },
    summary: {
      type: String,
      trim: true, //Remove all the whitspaces in the begining and in the end
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String, //Reference of a image (We could store actual image but not a good idea)
      required: [true, 'A tour must have a cover image'],
    },
    images: [String], //Array of images(names)
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      //GeoJson data format
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      //embedding locations to tours
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId, //child referencing
        ref: 'User', //do not even need to import user
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//tourSchema.index({price:1})
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
//Virtual Populate
tourSchema.virtual('reviews', {
  ref: 'Review', //Model name
  foreignField: 'tour', //What id is called in foreign Model
  localField: '_id',
});
//DOCUMENT MIDDLEWARE: runs before .save() and .create() not on update
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true }); //this here refers to document
  next();
});
/*
tourSchema.pre('save', function (next) {
  console.log('Will save Document');
  next();
});

tourSchema.post('save', function (doc, next) { //After saving Document post-save-hook
  console.log(doc);
  next();
});
*/
//Query Middleware
tourSchema.pre(/^find/, function (next) {
  //this.find(secretTour:{$ne:true});
  this.start = Date.now();
  next();
});
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});
//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  //this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;

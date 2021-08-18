const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//1. Global Middlewares
//Serving Static files
app.use(express.static(path.join(__dirname, 'public'))); //To set route for static files(html,css... ect)
//Set Security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //time window in milli secs
  message: 'Too many requests from this IP, please try again in an hour.',
});
app.use('/api', limiter); //limiter is a middleware and it will now act on all routes with /api in it
//BODY parser=> reading data from the body into req.body
app.use(express.json({ limit: '10kb' })); //Using Middleware
app.use(express.urlencoded({ extended: true, limit: '10kb' })); //
app.use(cookieParser());
//Data Sanitization against NoSQL query injections
app.use(mongoSanitize());
//Data Sanitization against XSS
app.use(xss());
//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);
app.use(compression());
/*app.use((req, res, next) => {
  //We can give any name to func arguments
  console.log('Hello from the Middleware');
  next();
});*/
//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/*
app.get('/', (req, res) => {
  //it works only for get method(GET request in html in 2nd sem)
  res
    .status(200)
    .json({ message: 'Hello from the server side!!', app: 'Natours' });
});
app.post('/', (req, res) => {
  //it works only for post
  res.send('You Can post to this endpoint...');
});
*/

//2. Route Handlers

//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

//3.Routes
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
//4. Start Servers
module.exports = app;

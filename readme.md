<h1 align="center">
  <br>
  <a href="https://navin-tours.herokuapp.com/"><img src="https://github.com/nanusharma2001/Navin-Tours/blob/master/public/img/logo-green-round.png" alt="Navin-Tours" width="200"></a>
  <br>
  Navin-Tours
  <br>
</h1>

<h4 align="center">An awesome tour booking site and RESTful API built on top of <a href="https://nodejs.org/en/" target="_blank">NodeJS</a>. Developed using MVC pattern and implemented all CRUD operations for every model.</h4>

 <p align="center">
 <a href="#deployed-version">Demo</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#demonstration">Demonstration</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#api-usage">API Usage</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#build-with">Build With</a> •
  <a href="#to-do">To-do</a> •
  <a href="#installation">Installation</a> • 
  <a href="#known-bugs">Known Bugs</a> • 
  <a href="#future-updates">Future Updates</a> • 
</p>

## Deployed Version

Live demo (Feel free to visit) 👉 : https://navin-tours.herokuapp.com/

## Key Features

- Authentication and Authorization
  - Login and logout
- Tour
  - Manage booking, check tours map, check users' reviews and rating
- User profile
  - Update username, photo, email, and password
- Credit card Payment

## Demonstration

#### Home Page :

![AllTours](https://user-images.githubusercontent.com/59772521/130118531-42d6552b-77e5-40d2-939e-d623627d75e7.gif)

#### Tour Details :

![TourInfo](https://user-images.githubusercontent.com/59772521/130122338-838d8865-2090-48ea-914a-3257d19594b1.gif)

#### Payment Process :
![payment](https://user-images.githubusercontent.com/59772521/130123598-698b269d-522a-4259-86de-2604704b6497.gif)

#### Booked Tours :

![UsersBooking](https://user-images.githubusercontent.com/59772521/130120604-2cfc87f6-9502-4d28-9331-7ca2090343fb.gif)

#### User Profile :

![UserProfile](https://user-images.githubusercontent.com/59772521/130120085-8fe33651-76a1-42d8-8dc2-052020faac33.gif)

#### Admin Profile :

![Admin profile](https://user-images.githubusercontent.com/59772521/130119358-0fe596a4-ebde-4023-b985-b4a9094224d2.gif)


## How To Use

### Book a tour

- Login to the site
- Search for tours that you want to book
- Book a tour
- Proceed to the payment checkout page
- Enter the card details (Test Mood):
  ```
  - Card No. : 4242 4242 4242 4242
  - Expiry date: 02 / 22
  - CVV: 222
  ```
- Finished!

### Manage your booking

- Check the tour you have booked in "Manage Booking" page in your user settings. You'll be automatically redirected to this
  page after you have completed the booking.

### Update your profile

- You can update your own username, profile photo, email and password.

## API Usage

Before using the API, you need to set the variables in Postman depending on your environment (development or production). Simply add:

```
- {{URL}} with your hostname as value (Eg. http://127.0.0.1:3000 or http://www.example.com)
- {{password}} with your user password as value.
```

Check [Navin-Tours API Documentation](https://documenter.getpostman.com/view/16464394/TzzBpvNb) for more info.

<b> API Features: </b>

Tours List 👉 https://navin-tours.herokuapp.com/api/v1/tours

Tours State 👉 https://navin-tours.herokuapp.com/api/v1/tours/tour-stats

Get Top 5 Cheap Tours 👉 https://navin-tours.herokuapp.com/api/v1/tours/top-5-cheap

Get Tours Within Radius 👉 https://navin-tours.herokuapp.com/api/v1/tours/tours-within/200/center/34.098453,-118.096327/unit/mi

## Deployment

The website is deployed with git into heroku. Below are the steps taken:

```
git init
git add -A
git commit -m "Commit message"
heroku login
heroku create
heroku config:set CONFIG_KEY=CONFIG_VALUE
parcel build ./public/js/index.js --out-dir ./public/js --out-file bundle.js
git push heroku master
heroku open
```

You can also changed your website url by running this command:

```
heroku apps:rename Navin-Tours-users
```

## Build With

- [NodeJS](https://nodejs.org/en/) - JS runtime environment
- [Express](http://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
- [Pug](https://pugjs.org/api/getting-started.html) - High performance template engine
- [JSON Web Token](https://jwt.io/) - Security token
- [ParcelJS](https://parceljs.org/) - Blazing fast, zero configuration web application bundler
- [Stripe](https://stripe.com/) - Online payment API
- [Postman](https://www.getpostman.com/) - API testing
- [Mailtrap](https://mailtrap.io/) & [Sendgrid](https://sendgrid.com/) - Email delivery platform
- [Heroku](https://www.heroku.com/) - Cloud platform

## To-do

- Review and rating
  - Allow user to add a review directly at the website after they have taken a tour
- Booking
  - Prevent duplicate bookings after user has booked that exact tour, implement favourite tours
- Advanced authentication features
  - Signup, confirm user email, login with refresh token, two-factor authentication
- And More ! There's always room for improvement!

## Installation

You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the
dependencies by running

```
$ npm i
set your env variables
$ npm run watch:js
$ npm run build:js
$ npm run dev (for development)
$ npm run start:prod (for production)
$ npm run debug (for debug)
$ npm start
Setting up ESLint and Prettier in VS Code 👇
$ npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node
eslint-plugin-import eslint-plugin-jsx-a11y  eslint-plugin-react --save-dev
```

## Known Bugs

Feel free to email me at navinsh2001@gmail.com if you run into any issues or have questions, ideas or concerns.
Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

## Future Updates

- Enable PWA
- Improve overall UX/UI and fix bugs
- Featured Tours
- Recently Viewed Tours
- And More ! There's always room for improvement!!!


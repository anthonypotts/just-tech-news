const express = require('express');
const path = require('path');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
// express-handlebars dependencies
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// dependencies for creating sessions & cookies
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// -----------------------------

const app = express();
const PORT = process.env.PORT || 3001;

// activates session
app.use(session(sess));

// activates handlebars npm package
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// activates express server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
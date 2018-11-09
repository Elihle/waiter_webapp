const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const Waiters = require('./services/waiter-avail');
const Routes = require('./routes/waiter');
const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder@localhost:5432/waiters_webapp';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});
let app = express();
let services = Waiters(pool);
let routes = Routes(services);
app.use(flash());

app.use(session({
    secret: 'waiter availability',
    resave: false,
    saveUninitialized: true
}));


// handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', routes.home);
app.get('/waiters/:username', routes.selectDays);
app.post('/waiters/:username', routes.insertShift);
// app.get('/days', routes.displayDays)

let PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
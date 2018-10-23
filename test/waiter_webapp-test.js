let assert = require('assert');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const Waiters = require('../services/waiter-avail');
const Routes = require('../routes/waiter');
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

describe('Waiter Availability', function () {
    beforeEach(async function () {
        await pool.query('delete from shift');
    });
    // it('should return nothing if no day is selected', async function () {
    //     let waiter = Waiters(pool);
    //     let results = await waiter.checkDays();
    //     assert.equal(results.length, 0);
    // });

    // it('should insert waiter name in database', async function () {
    //     let waiter = Waiters(pool);
    //     await waiter.insertUser('Lihle');
    //     let results = await waiter.selectName('Lihle');
    //     assert.strictEqual(results.length, 'Lihle');
    //     assert.strictEqual();
    // });

    // it('should check selected weekdays', async function () {
    //     let waiter = Waiters(pool);
    //     await waiter.insertUser('Lihle');
    //     let result = await waiter.selectName('Lihle');
    //     let id = result[0].id
    //     await waiter.insertShift(id, 3);
    //     await waiter.insertShift(id, 6);
    //     await waiter.insertShift(id, 6);

    //     let results = await waiter.selectShift(id);
    //     assert.strictEqual(results.length, 2);
    // });

    it('should check return 2 selected weeekdays', async function () {
        let waiter = Waiters(pool);
        await waiter.insertUser('Lihle');
        let result = await waiter.selectName('Lihle');
        let id = result[0].id
        await waiter.insertShift(id, 3);
        await waiter.insertShift(id, 6);

        let results = await waiter.selectShift(id);
        assert.strictEqual(results.length, 2);
    });

    after(function () {
        pool.end;
    });
});
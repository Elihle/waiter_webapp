module.exports = function Waiters(pool) {
    async function checkWaiter() {
        let result = await pool.query('SELECT * FROM waiter');
        return result.rows;
    }

    async function checkDays() {
        let result = await pool.query('SELECT * FROM weekdays');
        return result.rows;
    }

    async function insertUser(name) {
        await pool.query('INSERT INTO waiter (waiter_name) values ($1)', [name]);

    }

    async function selectName(username) {
        let result = await pool.query('SELECT * FROM waiter WHERE waiter_name = $1', [username]);
        return result.rows;
    }

    async function selectDay(day) {
        let result = await pool.query('SELECT * FROM weekdays WHERE week_days = $1', [day]);
        return result.rows;
    }

    async function checkShifts() {
        let result = await pool.query('SELECT * FROM shifts');
        return result.rows;
    }

    async function insertShift(nameId, dayId) {
        await pool.query('INSERT INTO shift (waiter_id, weekday_id) values ($1, $2)', [nameId, dayId]);

    }

    async function selectShift(id) {
        let result = await pool.query('SELECT * FROM shift WHERE waiter_id = $1', [id]);
        return result.rows;
    }

    return {
        checkWaiter,
        checkDays,
        insertUser,
        selectName,
        selectDay,
        checkShifts,
        insertShift,
        selectShift
    }
}
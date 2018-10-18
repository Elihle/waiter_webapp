module.exports = function Waiters(pool) {
    async function checkWaiter() {
        let result = await pool.query('SELECT * FROM waiter');
        return result.rows;
    }

    async function checkDays() {
        let result = await pool.query('SELECT * FROM weekdays');
        return result.rows;
    }

    async function insertInTable(name, day) {
        await pool.query('INSERT INTO shift (waiter_id, weekday_id) values ($1, $2)', [name, day]);

    }
    return {
        checkWaiter,
        checkDays,
        insertInTable
    }
}
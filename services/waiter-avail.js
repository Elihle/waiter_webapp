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
        let result = await pool.query('SELECT * FROM weekdays WHERE week_days =$1', [day]);
        return result.rows;
    }

    async function insertShift(nameId, dayId) {
        await pool.query('INSERT INTO shift (waiter_id, weekday_id) values ($1, $2)', [nameId, dayId]);
    }

    async function selectShift(id) {
        let result = await pool.query('SELECT * FROM shift WHERE waiter_id = $1', [id]);
        return result.rows;
    }

    async function selectDayId(id) {
        let result = await pool.query('SELECT id from weekdays WHERE week_days= $1', [id]);
        return result.rows;
    }

    async function deleteShifts(id) {
        let results = pool.query('delete from shift where waiter_id = $1', [id]);
        return results.rows;
    }

    async function insertWaiterShift(name, shift) {

        let check = Array.isArray(shift);
        let checkName = await selectName(name);
        let nameLength = checkName.length;

        if (nameLength === 0) {
            await insertUser(name);
            checkName = await selectName(name);
        } else {
            await deleteShifts(checkName[0].id);
        }

        if (shift === undefined) {
            return false;
        } else {
            let userId = checkName[0].id;
            if (!check) {
                console.log(shift);

                let dayData = await selectDay(shift);
                await insertShift(userId, dayData[0].id);
            }

            if (check) {
                for (let i = 0; i < shift.length; i++) {
                    let selectedShifts = await selectDay(shift[i]);
                    await insertShift(userId, selectedShifts[0].id);
                }
            }
            return true;
        }

    }

    return {
        checkWaiter,
        checkDays,
        insertUser,
        selectName,
        selectDay,
        checkShifts,
        insertShift,
        selectShift,
        deleteShifts,
        selectDayId,
        insertWaiterShift
    }
}
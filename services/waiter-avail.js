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
        if (result.rowCount === 0) {
            await insertUser(username);
            let checkName = await pool.query('SELECT * FROM waiter WHERE waiter_name = $1', [username]);
            return checkName.rows;
        }
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
    async function selectDayShifts(id) {
        let result = await pool.query('SELECT * FROM shift WHERE weekday_id = $1', [id]);
        return result.rows;
    }

    async function selectDayId(id) {
        let result = await pool.query('SELECT * from weekdays WHERE week_days= $1', [id]);
        return result.rows;
    }

    async function selectNameId(id) {
        let result = await pool.query('SELECT * from waiter WHERE id= $1', [id]);
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

    async function findShift(username) {
        let days = await checkDays();
        let findUser = await selectName(username);
        const {
            id
        } = findUser[0];
        if (id > 0) {

            let selectedDays = await selectShift(id);
            for (const day of days) {
                for (const current of selectedDays) {
                    if (day.id === current.weekday_id) {
                        day.checked = 'checked';
                    }
                }
            }
        }
        // console.log(days);
        return days;
    }

    async function findEachDay() {
        let result = await pool.query('SELECT waiter_name, week_days FROM weekdays JOIN shift on weekdays.id = shift.weekday_id JOIN waiter on shift.waiter_id = waiter.id');
        let shiftEntries = [{
                id: 1,
                week_days: "Monday",
                shift: [],
            },
            {
                id: 2,
                week_days: "Tuesday",
                shift: [],
            },
            {
                id: 3,
                week_days: "Wednesday",
                shift: [],
            },
            {
                id: 4,
                week_days: "Thursday",
                shift: [],
            },
            {
                id: 5,
                week_days: "Friday",
                shift: [],
            },
            {
                id: 6,
                week_days: "Saturday",
                shift: [],
            },
            {
                id: 7,
                week_days: "Sunday",
                shift: [],
            }
        ];

        for (let i = 0; i < shiftEntries.length; i++) {
            let day = shiftEntries[i].week_days;
            let dayShifts = await selectDayShifts(shiftEntries[i].id)

            for (let j = 0; j < dayShifts.length; j++) {
                console.log(dayShifts);
                let dayData = await selectNameId(dayShifts[j].waiter_id);
                console.log(dayData);

                shiftEntries[i].shift.push(dayData[0].waiter_name)
            }
        }
        console.log(shiftEntries);

        return shiftEntries;
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
        insertWaiterShift,
        findShift,
        findEachDay
    }
}
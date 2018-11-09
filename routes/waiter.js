module.exports = function (services) {
    async function home(req, res) {
        try {
            let waiters = await services.checkWaiter();
            let days = await services.checkDays();
            // console.log(waiters);

            res.render('home', {
                waiters,
                days
            });
        } catch (err) {
            res.send(err.stack)
        }
    }

    async function selectDays(req, res) {
        try {
            let name = req.params.username;
            let days = await services.checkDays();
            res.render('home', {
                name,
                days
            });
        } catch (err) {
            res.send(err.stack)
        }
    }

    async function checkDays(req, res) {
        try {
            let name = req.params.username;
            let days = await services.checkDays();
            res.render('home', {
                days,
                name
            });
        } catch (err) {
            res.send(err, stack)
        }
    }

    async function insertShift(req, res) {
        try {
            let name = req.params.username;
            let shiftDays = req.body.day;
            let selected = await services.insertWaiterShift(name, shiftDays);
            let days = await services.checkDays();
            if (selected) {
                req.flash('added', 'Successfully added');
            } else {
                req.flash('notAdded', 'Please select dayyy');
            }

            res.render('home', {
                name,
                days
            });
        } catch (err) {
            res.send(err.stack)

        }
    }

    return {
        home,
        selectDays,
        checkDays,
        insertShift
    }
}
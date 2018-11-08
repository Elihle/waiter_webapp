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

    async function displayDays(req, res) {
        try {
            res.redirect('/', {

            });
        } catch (err) {
            res.send(err, stack)
        }
    }

    // async function checked () {
    //     try {
    //         res.redirect('/')
    //     } catch (err, stack){

    //     }
    // }

    return {
        home,
        selectDays,
        checkDays,
        displayDays
    }
}
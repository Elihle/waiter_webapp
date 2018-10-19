module.exports = function (services) {
    async function home(req, res) {
        try {
            let waiters = await services.checkWaiter();
            let days = await services.checkDays();
            console.log(waiters);
            
            res.render('home', {waiters, days});
        } catch (err) {
            res.send(err.stack)
        }
    }

    async function selectDays(req, res) {
        try {
    
            let name = req.params.name;
            let waiters = await services.checkWaiter();
            let days = await services.checkDays();

            if (checkbox.checked=true) {
                let selected = await services.insertInTable();
            }

            res.render('home', {
                waiters,
                days
            });
        } catch (err) {
            res.send(err.stack)
        }
    }


    async function checkDays(req, res) {
        try {
            res.redirect('/', {

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
    return {
        home,
        selectDays,
        checkDays,
        displayDays
    }
}
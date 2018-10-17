module.exports = function (services) {
    async function home(req, res) {
        try {
            res.render('home', {
            });
        } catch (err) {
            res.send(err.stack)
        }
    }
 return {
     home
 }
}
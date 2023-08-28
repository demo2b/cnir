/**
 * @author Jonas.Fournel
 * @fileOverview
 */
module.exports = function (app) {
    app.get(["/", "/acceuil"], (request, response) => { response.render('home'); });
    app.get(["/contact"], (request, response) => { response.render('contact'); });
    app.get(["/notre-equipe"], (request, response) => { response.render('our-team'); });
    app.get(["/nos-activites"], (request, response) => { response.render('activities'); });
    app.get(["/reservations"], (request, response) => { response.render('reservations'); });
}

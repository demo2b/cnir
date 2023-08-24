/**
 * @author Jonas.Fournel
 * @fileOverview
 */
const home = require('./home');
const contact = require('./contact');
const ourTeam = require('./our-team');
const activities = require('./activities');
const reservations = require('./reservations');

module.exports = function (app) {
    app.get(["/", "/acceuil"], home);
    app.get(["/contact"], contact);
    app.get(["/notre-equipe"], ourTeam);
    app.get(["/nos-activites"], activities);
    app.get(["/reservations"], reservations);
}

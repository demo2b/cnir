/**
 * @author Jonas.Fournel
 * @fileOverview
 */
const home = require('./home');
const contact = require('./contact');
const ourTeam = require('./our-team');
const otherActivities = require('./other-activities');
const news = require('./news');

module.exports = function (app) {
    app.get(["/", "/acceuil"], home);
    app.get(["/contact"], contact);
    app.get(["/notre-equipe"], ourTeam);
    app.get(["/nos-autres-activites"], otherActivities);
    app.get(["/news"], news);
}
